import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from '@/components/ui/EmptyState'

type ClientsEmptyStateProps = {
  title: string
  description?: string
}

export function ClientsEmptyState({
  title,
  description = 'Clients will appear here once they register on the platform.',
}: ClientsEmptyStateProps) {
  return (
    <EmptyState
      imageSrc={EMPTY_STATE_IMAGE_PATHS.client}
      imageAlt='No clients'
      title={title}
      description={description}
      className='min-h-[280px] py-16'
    />
  )
}
