const IntegrationsBar = () => {
  const tools = ['Zoom', 'WhatsApp', 'Google Meet', 'Twitter', 'Facebook']

  return (
    <section className="mb-10 border-y border-gray-100 py-8">
      <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
        <p className="shrink-0 text-sm font-medium text-muted">
          Works with the tools you already use
        </p>

        <div className="hide_scrollbar w-full overflow-x-auto md:w-auto">
          <div className="flex min-w-max items-center gap-8 pb-2 md:gap-10 md:pb-0">
            {tools.map((tool) => (
              <span
                key={tool}
                className="cursor-default whitespace-nowrap text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntegrationsBar
