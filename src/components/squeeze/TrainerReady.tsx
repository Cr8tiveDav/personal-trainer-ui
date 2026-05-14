import { Button } from '../ui/button'

const TrainerReady = () => {
  return (
    <section className="w-full py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-sm">
            <h2 className="text-xl font-bold text-muted-foreground md:text-2xl lg:text-4xl">
              Your Trainer is Ready. Are you?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted lg:text-lg">
              Stop restarting. Stop promising yourself &apo;next week.&apo;
              Kindly Fill the form and download FitCall today.
            </p>
          </div>
          <div className="flex w-full max-w-lg flex-col gap-3">
            <input
              type="text"
              placeholder="Full name"
              className="min-h-12 w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-muted outline-none focus:border-primary"
            />
            <input
              type="email"
              placeholder="johndoe@example.com"
              className="min-h-12 w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-muted outline-none focus:border-primary"
            />
            <Button type="submit"> Submit</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrainerReady
