const Facebook = ({ strokeWidth = 1 }: { strokeWidth?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
)

const Instagram = ({ strokeWidth = 1 }: { strokeWidth?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
)

const Twitter = ({ strokeWidth = 1 }: { strokeWidth?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
)
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '~/components/ui/card'

interface TeamCardProperties {
  name: string
  imageSrc: string
  imageAlt: string
  role: string
  description: string
  facebookURL?: string
  instagramURL?: string
  twitterURL?: string
}

const TeamCard: React.FC<TeamCardProperties> = ({
  name,
  imageSrc,
  imageAlt,
  role,
  description,
  facebookURL,
  instagramURL,
  twitterURL,
}) => {
  return (
    <Card className="bg-subtle flex h-[400px] w-[277px] cursor-pointer flex-col gap-4 border-none shadow-none">
      <div className="relative h-[205px] overflow-hidden bg-neutral-300">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill={true}
          className="transform-gpu object-cover transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>

      <CardContent className="flex flex-col justify-between gap-5 px-[14.31px] pb-3.5">
        <div>
          <h3 className="pb-1 text-lg font-bold leading-[21.78px] text-neutral-600 md:font-semibold">
            {name}
          </h3>
          <p className="pb-[7.16px] text-[12.53px] leading-[15.16px] text-neutral-600">
            {role}
          </p>
          <p className="md:text-normal line-clamp-3 text-sm font-medium leading-[19.36px] text-neutral-600 md:font-normal">
            {description}
          </p>
        </div>

        <CardFooter className="flex h-8 gap-3.5 p-0">
          {facebookURL && (
            <Link
              href={facebookURL}
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Facebook strokeWidth={1} />
            </Link>
          )}

          {instagramURL && (
            <Link
              href={instagramURL}
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Instagram strokeWidth={1} />
            </Link>
          )}
          {twitterURL && (
            <Link
              href={twitterURL}
              target="_blank"
              aria-label="Twitter"
              rel="noreferrer noopener"
            >
              <Twitter strokeWidth={1} />
            </Link>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  )
}

export default TeamCard
