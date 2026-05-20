import { Suspense } from 'react'

export default function TrainerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="">
      <div className="px-4 py-8">
        <Suspense>{children}</Suspense>
      </div>
    </main>
  )
}
