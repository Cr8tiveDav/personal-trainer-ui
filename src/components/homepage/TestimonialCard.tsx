import Image from 'next/image'

interface Properties {
  image: string
  content: string
  name: string
  location: string
}

const TestimonialCard = (properties: Properties) => {
  return (
    <div className="shadow-xs flex h-full min-h-70.75 flex-col justify-between rounded-[24px] border border-gray-100 bg-white p-4 lg:w-82.5">
      <div>
        <div className="mb-6 flex justify-start">
          <Image src="/quote.svg" alt='quote' width={40} height={40}  />
        </div>

        <p className="font-inter text-left text-sm font-medium leading-relaxed text-muted-foreground">
          {properties?.content}
        </p>
      </div>

      <div className="mt-8 flex items-center space-x-4">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[9999px]">
          <Image
            src={properties?.image}
            alt={properties?.name}
            width={48}
            height={48}
            sizes="true"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-left">
          <h4 className="font-inter text-lg font-bold text-muted-foreground">
            {properties?.name}
          </h4>
          <small className="font-inter text-sm font-medium text-muted">
            {properties?.location}
          </small>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard