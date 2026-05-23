import Image from 'next/image'
import Link from 'next/link'

const ComingSoon = () => {
  return (
    <main className='flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 px-4 py-12 text-center'>
      <div className='flex w-full max-w-2xl flex-col items-center'>
        <Image
          src='/images/coming-soon/CS.png'
          alt='Coming soon'
          width={420}
          height={300}
          className='mb-8 h-auto w-full max-w-48 object-contain sm:max-w-56 md:max-w-72'
        />

        <Link
          href='/waitlist'
          className='mb-4 text-sm font-semibold uppercase tracking-widest text-primary transition-opacity hover:opacity-80'
        >
          Join the waitlist
        </Link>

        <h1 className='mb-6 text-4xl font-black leading-none text-muted-foreground md:text-5xl lg:text-6xl'>
          Coming Soon...
        </h1>

        <p className='mb-10 max-w-md text-base leading-relaxed text-muted'>
          We remain dedicated to giving you the ultimate online gym experience
        </p>

        <Link
          href='/'
          className='inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90'
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}

export default ComingSoon
