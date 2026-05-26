import Image from 'next/image'

const BuildUpFinalCta = () => {
  return (
    <section className="bg-white pt-0 pb-0">
      <div className="sr-only">
        <h2>Find your trainer today</h2>
        <p>
          Sign up for consistent training with our expert FitCall trainers in
          your corner.
        </p>
      </div>

      <div className="relative aspect-[1376/768] w-full overflow-hidden min-[480px]:hidden">
        <Image
          src="/images/ads/footer_mob.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white">
          <h2 className="text-[30px] leading-[1.02] font-extrabold">
            Find your trainer today
          </h2>
          <p className="mt-3 max-w-[260px] text-[11px] leading-[1.45]">
            Sign up for consistent training with our expert FitCall trainers in
            your corner.
          </p>
        </div>
      </div>

      <div className="relative hidden aspect-[1376/342] w-full overflow-hidden min-[480px]:block">
        <Image
          src="/images/ads/footer_desk.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center text-white">
          <h2 className="text-[34px] leading-tight font-extrabold md:text-[44px]">
            Find your trainer today
          </h2>
          <p className="mt-3 max-w-[560px] text-[12px] leading-[1.5] md:text-[14px]">
            Sign up for consistent training with our expert FitCall trainers in
            your corner.
          </p>
        </div>
      </div>
    </section>
  )
}

export default BuildUpFinalCta
