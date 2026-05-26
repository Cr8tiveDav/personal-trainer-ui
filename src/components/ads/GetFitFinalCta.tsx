import Image from 'next/image'

const GetFitFinalCta = () => {
  return (
    <section className="bg-white pt-10 md:pt-14">
      <div className="sr-only">
        <h2>Find your trainer today</h2>
        <p>
          Sign up for consistent training with our expert FitCall trainers in
          your corner.
        </p>
      </div>

      <div className="w-full">
        <div className="relative aspect-[215/251] w-full overflow-hidden min-[480px]:hidden">
          <Image
            src="/images/ads/get-fit-final-cta-mobile.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative hidden aspect-[792/252] w-full overflow-hidden min-[480px]:block">
          <Image
            src="/images/ads/get-fit-final-cta-desktop.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default GetFitFinalCta
