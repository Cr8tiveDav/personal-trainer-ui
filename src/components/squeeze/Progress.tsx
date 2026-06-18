import { WaitlistForm } from './WaitListForm'

type ProgressSectionProps = {
  showForm?: boolean
}

const ProgressSection = ({ showForm = true }: ProgressSectionProps) => {
  return (
    <section className="w-full py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={
            showForm
              ? 'flex flex-col gap-8 md:flex-row md:items-center md:justify-between'
              : 'mx-auto flex max-w-2xl flex-col items-center text-center'
          }
        >
          <div className={showForm ? 'max-w-sm' : 'max-w-2xl'}>
            <h2 className="text-xl font-bold text-muted-foreground md:text-2xl lg:text-4xl">
              Progress you can see
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted lg:text-lg">
              Weekly recaps, habit streaks, and session notes from your trainer
              — so you know exactly how far you&apos;ve come. Kindly fill the
              form and download FitCall today.
            </p>
          </div>

          {showForm && <WaitlistForm />}
        </div>
      </div>
    </section>
  )
}

export default ProgressSection
