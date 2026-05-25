"use client";

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
          500 — Server Error
        </p>

        <h1 className="mb-6 text-4xl font-black leading-none text-muted-foreground md:text-5xl lg:text-6xl">
          Something went <br /> wrong.
        </h1>

        <p className="mb-10 text-base leading-relaxed text-muted">
          An unexpected error occurred. Please try again.
        </p>

        {error.digest ? (
          <p className="mb-6">
            <code className="text-muted-foreground bg-muted rounded-[4px] px-2 py-1 text-xs">
              ref: {error.digest}
            </code>
          </p>
        ) : null}

        <button
          type="button"
          onClick={() => unstable_retry()}
          className="inline-block rounded-[9999px] bg-primary px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
