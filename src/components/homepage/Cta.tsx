import Link from 'next/dist/client/link'
import { Button } from '../ui/button'

const CTASection = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary via-[#063660] to-[#0C6FC6] px-6 py-16 text-center text-white md:py-24">
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold leading-[1.1] tracking-tight md:text-4xl">
              Stop skipping workouts. Start showing up.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base text-blue-100 md:text-lg">
              Your trainer will show up. So should you. Book your free session
              and feel the difference one phone call makes.
            </p>

            <Button className="mt-10 min-w-[300px] bg-white font-bold text-primary transition-transform hover:scale-105 hover:bg-blue-50 hover:text-blue-900 active:scale-95">
              <Link href="/pricing">Download FitCall</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
