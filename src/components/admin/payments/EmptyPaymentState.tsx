type EmptyPaymentStateProps = {
  title: string;
  description?: string;
};

const EmptyPaymentState = ({
  title,
  description = "Payment records for this tab will appear here when available.",
}: EmptyPaymentStateProps) => {
  return (
    <div className="flex min-h-80 items-center justify-center rounded-lg border border-dashed border-border bg-card p-8 text-center">
      <div className="max-w-sm">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-muted">{description}</p>
      </div>
    </div>
  );
};

export default EmptyPaymentState;
