import { EmptyState } from '@/components/ui/EmptyState'

type EmptyPaymentStateProps = {
  imageSrc: string
  imageAlt: string
  title: string
  description?: string
}

const EmptyPaymentState = ({
  imageSrc,
  imageAlt,
  title,
  description = 'Payment records for this tab will appear here when available.',
}: EmptyPaymentStateProps) => {
  return (
    <div className='flex min-h-80 items-center justify-center rounded-[8px] border border-dashed border-border bg-card p-8'>
      <EmptyState
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        title={title}
        description={description}
        className='min-h-0 py-0'
      />
    </div>
  )
}

export default EmptyPaymentState
