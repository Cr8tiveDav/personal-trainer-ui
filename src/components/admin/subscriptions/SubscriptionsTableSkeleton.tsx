export function SubscriptionsTableSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <tr key={index} className="border-b border-gray-100 last:border-b-0">
          {Array.from({ length: 8 }).map((__, cellIndex) => (
            <td key={cellIndex} className="px-5 py-4">
              <div className="h-4 w-full max-w-36 animate-pulse rounded-[6px] bg-gray-100" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

