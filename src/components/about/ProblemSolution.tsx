import React from 'react'

const problemSolution = [
  {
    title: 'The problem',
    content:
      "Most fitness apps hand you a plan and walk away. Videos play, streaks break, and within weeks you're back to scrolling instead of training. Motivation is unreliable. Showing up is hard when no one's waiting.",
  },
  {
    title: 'Our solution',
    content:
      "A real human on the other end of a call. Your trainer schedules with you, calls when it's time, and guides you through every rep. No pre-recorded videos. No guessing. Just structured sessions, week after week.",
  },
]

const ProblemSolution = () => {
  return (
    <section className="mt-16 pb-14 md:mt-24">
      <div className="container">
        <div className="flex flex-col gap-12 md:flex-row md:gap-24 lg:gap-48">
          {problemSolution.map((item, index) => (
            <div key={index} className="flex-1">
              <h3 className="mb-4 text-2xl font-bold tracking-tight text-muted-foreground md:mb-6 md:text-3xl">
                {item.title}
              </h3>
              <p className="text-base leading-relaxed text-muted md:text-lg md:leading-8">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProblemSolution
