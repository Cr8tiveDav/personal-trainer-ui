"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useLogin, type LoginType } from "@/api/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { LoginSchema } from "~/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FramerButton from "../ui/framer-button";
import Link from "next/link";
import { Eye, EyeOff, Asterisk } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "~/utils";
interface LoginProps {
  type: LoginType;
}

const Login = ({ type }: LoginProps) => {
  const login = useLogin({ type });
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    login.mutate({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <section className="min-h-screen bg-secondary flex items-center py-6 sm:py-8">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto grid max-w-[1201px] md:grid-cols-2">
          <article className="relative hidden w-full min-h-[678px]  md:block">
            <Image
              src="/images/trainer/login-image.png"
              fill
              alt="Trainer Login Form"
              className="object-cover object-center rounded-[4px]"
            />
          </article>

          <article className="relative z-30 right-[20px] bg-white flex flex-col justify-center px-5 py-8 rounded-[16px] sm:px-8 sm:py-10 md:px-10 lg:px-12">
            <Image
              src="/images/trainer/logo.svg"
              alt="Logo"
              width={173}
              height={32}
              className="mb-8 w-[130px] sm:w-[150px] md:mb-16 lg:mb-20"
            />

            <h2 className="mb-8 text-xl font-medium">
              {type === "admin" ? "Login as an Admin" : "Login as a Trainer"}
            </h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm text-neutralColor-dark-2 sm:text-base">
                        Email
                        <Asterisk
                          strokeWidth={2}
                          className="relative -top-1 h-2.5 w-2.5 text-red-800 sm:h-3 sm:w-3"
                        />
                      </FormLabel>

                      <FormControl>
                        <Input
                          disabled={login.isPending}
                          placeholder="johndoe@example.com"
                          {...field}
                          className={cn(
                            "login-input text-sm h-[44px] sm:text-base",
                            form.formState.errors.email && "login-input--error",
                          )}
                        />
                      </FormControl>

                      <FormMessage data-testid="email-error" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm text-neutralColor-dark-2 sm:text-base">
                        Password
                        <Asterisk
                          strokeWidth={2}
                          className="relative -top-1 h-2.5 w-2.5 text-red-800 sm:h-3 sm:w-3"
                        />
                      </FormLabel>

                      <div className="relative">
                        <FormControl>
                          <Input
                            disabled={login.isPending}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            {...field}
                            className={cn(
                              "login-input pr-10 h-[44px] text-sm sm:text-base",
                              form.formState.errors.password &&
                                "login-input--error",
                            )}
                          />
                        </FormControl>

                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {showPassword ? (
                            <Eye
                              className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5"
                              data-testid="eye-off-icon"
                            />
                          ) : (
                            <EyeOff
                              className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5"
                              data-testid="eye-icon"
                            />
                          )}
                        </button>
                      </div>

                      <FormMessage data-testid="password-error" />
                    </FormItem>
                  )}
                />

                <FramerButton
                  isLoading={login.isPending}
                  disabled={login.isPending}
                  text="Login"
                  className="bg-primary text-sm sm:text-base"
                />

                <div className="!mt-2 flex justify-end">
                  <Link
                    href="/admin/forgot-password"
                    className="cursor-pointer text-xs font-semibold text-red-800 sm:text-sm"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </Form>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Login;
