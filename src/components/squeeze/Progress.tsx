import { WaitlistForm } from './WaitListForm'

const ProgressSection = () => {
  return (
    <section className="w-full py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-sm">
            <h2 className="text-xl font-bold text-muted-foreground md:text-2xl lg:text-4xl">
              Progress you can see
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted lg:text-lg">
              Weekly recaps, habit streaks, and session notes from your trainer
              — so you know exactly how far you&apos;ve come. Kindly fill the
              form and download FitCall today.
            </p>
          </div>

          <WaitlistForm />
        </div>
      </div>
    </section>
  )
}

export default ProgressSection
