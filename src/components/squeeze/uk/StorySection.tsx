import Image from 'next/image'

const storyParagraphs = [
  'At 48, I was constantly tired, overweight, and struggling to make time for myself. Between work, family responsibilities, and everyday stress, my health had become an afterthought. I had tried gyms, workout videos, and countless fitness challenges, but nothing ever lasted.',
  'Everything changed when I joined FitCall. Instead of another generic fitness app, I was matched with a trainer who took the time to understand my lifestyle, goals, and challenges.',
  'The workouts were realistic, the guidance was personal, and the accountability was exactly what I needed.',
  'On the days I wanted to quit, my trainer checked in. When life got busy, my plan was adjusted instead of abandoned. For the first time, I felt supported rather than judged.',
  "Within a year, I lost 55 pounds, improved my energy levels, and regained my confidence. But the biggest transformation wasn't physical it was believing in myself again.",
  'Today, I can keep up with my family, enjoy activities I once avoided, and feel stronger than I have in years.',
  "FitCall didn't just help me lose weight it helped me take control of my life again.",
]

export function StorySection() {
  return (
    <section className="px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="mb-6 text-center">
          <p className="text-base leading-relaxed text-muted lg:text-lg">
            Angela&apos;s Personal Story
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
            How FitCall Helped Me
          </h2>
        </div>

        <article className="grid overflow-hidden rounded-[8px] border border-gray-100 bg-white shadow-xs xl:grid-cols-[minmax(0,668px)_1fr]">
          <div className="relative min-h-[360px] border-gray-100 xl:min-h-full xl:border-r">
            <Image
              src="/images/ads/uk/angela.jpg"
              alt="Woman training at home during an online session"
              fill
              sizes="(max-width: 1023px) 100vw, 668px"
              className="object-cover"
            />
          </div>
          <div className="px-5 py-8 md:px-10 lg:px-12 lg:py-9">
            <h3 className="mx-auto max-w-[557px] text-center text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
              &quot;How FitCall Helped Me Take My Life Back&quot;
            </h3>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted lg:text-lg">
              <p className="font-medium text-muted-foreground">
                Angela Brooks, 50 London, United Kingdom
              </p>
              {storyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
