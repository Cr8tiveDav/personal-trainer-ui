import Image from 'next/image'
import React from 'react'

const SqueezeFooter = () => {
  return (
    <section className="relative h-[458px] w-full">
      <Image
        src="/images/squeeze-footer.png"
        alt="Squeeze Footer"
        fill
        priority
        className="object-cover object-[65%_center] md:object-center"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 px-6 text-center">
        <h2 className="mb-4 max-w-[300px] text-4xl font-bold text-white md:max-w-none md:text-5xl">
          Find your trainer today
        </h2>
        <p className="max-w-[320px] text-lg leading-relaxed text-white md:max-w-2xl">
          Sign up for consistent training with our expert FitCall trainers in
          your corner.
        </p>
      </div>
    </section>
  )
}

export default SqueezeFooter
