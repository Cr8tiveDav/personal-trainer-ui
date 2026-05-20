import { ListFilter, Search } from "lucide-react";

type PaymentsControlsProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusValue: string;
  onStatusChange: (value: string) => void;
};

const statusOptions = [
  { label: "All statuses", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "On Hold", value: "on_hold" },
  { label: "Declined", value: "declined" },
];

const PaymentsControls = ({
  searchValue,
  onSearchChange,
  statusValue,
  onStatusChange,
}: PaymentsControlsProps) => {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <label className="relative flex-1">
        <span className="sr-only">Search payments</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search"
          className="h-12 w-full rounded-lg border border-border bg-card pl-12 pr-4 text-sm text-foreground outline-none transition-shadow placeholder:text-muted focus:ring-2 focus:ring-primary/10"
        />
      </label>

      <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
        <label className="relative">
          <span className="sr-only">Filter by status</span>
          <select
            value={statusValue}
            onChange={(event) => onStatusChange(event.target.value)}
            className="h-12 w-full appearance-none rounded-lg border border-border bg-card px-4 pr-10 text-sm font-medium text-muted outline-none transition-shadow focus:ring-2 focus:ring-primary/10 sm:w-36"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ListFilter className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
        </label>

        <button
          type="button"
          disabled
          title="Additional filters will be added when more payment filters are available."
          className="inline-flex h-12 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-muted opacity-70"
        >
          Add filter
          <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-semibold uppercase text-muted">
            Soon
          </span>
          <ListFilter className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default PaymentsControls;
