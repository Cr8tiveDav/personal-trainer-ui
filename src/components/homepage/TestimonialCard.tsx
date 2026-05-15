import Image from 'next/image'
import { Rating } from './svgs'

interface Properties {
  image: string
  content: string
  name: string
  location: string
}

const TestimonialCard = (properties: Properties) => {
  return (
    <div className="shadow-xs flex h-full min-h-[283px] flex-col justify-between rounded-[24px] border border-gray-100 bg-background p-4 lg:w-[330px]">
      <div>
        <div data-testid="rating" className="mb-6 flex justify-start">
          <Rating />
        </div>

        <p className="font-inter text-left text-sm font-medium leading-relaxed text-muted-foreground">
          {properties?.content}
        </p>
      </div>

      <div className="mt-8 flex items-center space-x-4">
        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src={properties?.image}
            alt={properties?.name}
            width={48}
            height={48}
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
