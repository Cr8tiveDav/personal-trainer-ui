import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from "@/components/ui/EmptyState";

type SubscriptionsEmptyStateProps = {
  title: string;
  description: string;
};

export function SubscriptionsEmptyState({
  title,
  description,
}: SubscriptionsEmptyStateProps) {
  return (
    <EmptyState
      imageSrc={EMPTY_STATE_IMAGE_PATHS.allTransactions}
      imageAlt="No subscriptions"
      title={title}
      description={description}
      className="min-h-[280px] py-16"
    />
  );
}

