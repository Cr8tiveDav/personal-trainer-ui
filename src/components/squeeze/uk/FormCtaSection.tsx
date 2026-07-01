import { FormBlock } from './FormBlock'

export function FormCtaSection({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <section className="px-4 py-12 md:px-8 lg:py-14">
      <div className="mx-auto flex flex-col lg:flex-row justify-center lg:justify-start w-full max-w-7xl items-center gap-8">
        <div className="max-w-2xl text-center lg:text-left">
          <h2 className="text-4xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted lg:text-lg">
            {description}
          </p>
        </div>
        <FormBlock />
      </div>
    </section>
  )
}
