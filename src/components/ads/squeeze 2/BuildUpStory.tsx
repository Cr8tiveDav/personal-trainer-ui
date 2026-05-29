import AdsStorySection from '../AdsStorySection'

const storyParagraphs = [
  "I had 47 saved workout videos on TikTok. Pilates for beginners. 20-minute home HIIT. 'Do this every morning and your life will change.' I watched none of them.",
  'My friend sent me FitCall on a Tuesday night. I signed up mostly to stop her from sending me things. Wednesday morning, 7am - my phone rang. Not a notification. An actual call.',
  'It was my trainer. I was half-asleep but she was already warmed up. I had no excuses. We trained for 35 minutes. I was out of breath by minute eight and laughing by minute twenty.',
]

const BuildUpStory = () => {
  return (
    <AdsStorySection
      title="How FitCall changed my life"
      storyLabel="Susan's Story"
      quote="I stopped watching other people workout"
      paragraphs={storyParagraphs}
      className="pt-12 md:pt-18"
      gridClassName="md:mt-7 lg:grid-cols-[470px_minmax(0,500px)] lg:gap-10"
      articleClassName="md:border-transparent md:px-0 md:py-0 lg:min-h-0"
      paragraphsClassName="md:space-y-8 lg:space-y-10"
      quoteClassName="max-w-[300px]"
      image={{
        src: '/images/ads/get-fit-story.png',
        alt: 'Woman training at home during a FitCall session',
        width: 540,
        height: 526,
      }}
    />
  )
}

export default BuildUpStory
