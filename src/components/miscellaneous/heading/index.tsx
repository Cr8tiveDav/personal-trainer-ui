interface Properties {
  tag: string
  title: string
  content: string
}

const renderTitle = (title: string) => {
  const parts = title.split(/({{[^}]+}})/).filter(Boolean)

  return parts.map((part, index) => {
    if (part.startsWith('{{') && part.endsWith('}}')) {
      const styledText = part.slice(2, -2)
      return (
        <span key={index} className="text-orange-500">
          {styledText}
        </span>
      )
    }
    return <span key={index}>{part}</span>
  })
}

const Heading = (properties: Properties) => {
  return (
    <div
      className="mx-auto mb-6 flex max-w-7xl flex-col items-center px-4 text-center md:mb-16"
      data-testid="about-header"
    >
      <p
        className="mb-6 inline-block rounded-full bg-[#EDF4FD] px-4 py-1.5 text-sm font-medium text-[#063660] md:text-base"
        data-testid="about-tag"
      >
        {properties?.tag}
      </p>

      <h2
        className="font-inter mx-auto mb-4 max-w-5xl whitespace-pre-line text-center text-3xl font-bold leading-[1.2] tracking-tight text-gray-900 md:text-5xl md:leading-[1.1] lg:text-[64px]"
        data-testid="about-title"
      >
        {renderTitle(properties.title)}
      </h2>

      <p
        className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg lg:text-xl"
        data-testid="about-description"
      >
        {properties?.content}
      </p>
    </div>
  )
}

export default Heading
