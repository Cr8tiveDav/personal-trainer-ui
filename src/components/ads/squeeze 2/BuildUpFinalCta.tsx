import { getImageProps } from 'next/image'

const BuildUpFinalCta = () => {
  const commonImageProps = {
    alt: '',
    sizes: '100vw',
    className: 'absolute inset-0 h-full w-full object-cover object-center',
  }
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonImageProps,
    src: '/images/ads/footer_desk.png',
    width: 1376,
    height: 768,
  })
  const { props: mobileImageProps } = getImageProps({
    ...commonImageProps,
    src: '/images/ads/footer_desk.png',
    width: 1376,
    height: 768,
  })

  return (
    <section className="bg-white pt-0 pb-0">
      <div className="sr-only">
        <h2>Find your trainer today</h2>
        <p>
          Sign up for consistent training with our expert FitCall trainers in
          your corner.
        </p>
      </div>

      <div className="relative aspect-[1376/768] w-full overflow-hidden min-[480px]:aspect-[1376/342]">
        <picture>
          <source media="(min-width: 480px)" srcSet={desktopSrcSet} />
          <img {...mobileImageProps} alt="" />
        </picture>
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white min-[480px]:px-8">
          <h2 className="text-[30px] leading-[1.02] font-extrabold min-[480px]:text-[34px] min-[480px]:leading-tight md:text-[44px]">
            Find your trainer today
          </h2>
          <p className="mt-3 max-w-[260px] text-[11px] leading-[1.45] min-[480px]:max-w-[560px] min-[480px]:text-[12px] min-[480px]:leading-[1.5] md:text-[14px]">
            Sign up for consistent training with our expert FitCall trainers in
            your corner.
          </p>
        </div>
      </div>
    </section>
  )
}

export default BuildUpFinalCta
