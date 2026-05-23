import Link from 'next/link'

const NotFound = () => {
  return (
    <main className='flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 px-4'>
      <div className='max-w-md text-center'>
        <p className='mb-4 text-sm font-semibold uppercase tracking-widest text-primary'>
          404 - Page not found
        </p>

        <h1 className='mb-6 text-4xl font-black leading-none text-muted-foreground md:text-5xl lg:text-6xl'>
          You missed <br /> the call.
        </h1>

        <p className='mb-10 text-base leading-relaxed text-muted'>
          This page doesn&apos;t exist, but your trainer does. Head back home
          and get moving.
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

export default NotFound
