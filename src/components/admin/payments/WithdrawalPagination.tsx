import { ChevronLeft, ChevronRight } from "lucide-react";

type WithdrawalPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const WithdrawalPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: WithdrawalPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const pageItems = getPaginationItems(currentPage, totalPages);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-sm sm:justify-end">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="inline-flex h-10 items-center gap-1 rounded-md px-2 text-muted transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:px-3"
      >
        <ChevronLeft className="size-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {pageItems.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="grid size-9 place-items-center text-foreground"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            className="size-9 rounded-md text-foreground transition-colors hover:bg-secondary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
            data-active={currentPage === item}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="inline-flex h-10 items-center gap-1 rounded-md px-2 text-primary transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:px-3"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
};

const getPaginationItems = (
  currentPage: number,
  totalPages: number,
): Array<number | "ellipsis"> => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "ellipsis", currentPage, "ellipsis", totalPages];
};

export default WithdrawalPagination;
