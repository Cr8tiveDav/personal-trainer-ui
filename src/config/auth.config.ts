/* eslint-disable prettier/prettier */
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { nextLogin, googleAuth } from "~/actions/nextauth";
import { inDevEnvironment } from "~/utils";
import { LoginSchema } from "~/schemas";
import { CustomJWT } from "~/types";

const authConfig: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      checks: ["none"],
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
        rememberMe: {},
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        const { email, password, rememberMe } = validatedFields.data;
        const response = await nextLogin({ email, password, rememberMe });

        if (!response) {
          return null;
        }

        if (!response || !("data" in response)) {
          return null;
        }

        const user = response.data as CustomJWT;
        user.access_token = response.access_token;
        return user as any;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  debug: inDevEnvironment,
  callbacks: {
    async signIn({ account, profile, user }: any) {
      if (account?.provider === "google" && profile?.email) {
        return true;
      }
      return !!user;
    },
    async jwt({ token, user, account }: any) {
      if (account?.provider === "google") {
        if (!account?.id_token) {
          return token;
        }
        const response = await googleAuth(account?.id_token);
        if (!response || !("data" in response)) {
          return token;
        }
        token = response.data as CustomJWT;
        token.access_token = response.access_token;
        return token;
      }

      return {
        ...token,
        ...user,
      } as CustomJWT;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const customToken = token as CustomJWT;
      if (!customToken || !customToken.id) {
        return {
          ...session,
          user: {
            id: "",
            first_name: "",
            last_name: "",
            email: "",
            image: "",
          },
          access_token: undefined,
          userOrg: undefined,
          currentOrgId: undefined,
          expires: new Date(0).toISOString(),
        };
      }

      (session.user as any) = {
        id: customToken.id as string,
        first_name: customToken.first_name,
        last_name: customToken.last_name,
        image: customToken.avatar_url || "",
        email: customToken.email as string,
      };
      (session as any).access_token = customToken.access_token;
      (session as any).userOrg = customToken.organisations;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },

  secret: process.env.AUTH_SECRET,

} satisfies NextAuthOptions;

export default authConfig;
