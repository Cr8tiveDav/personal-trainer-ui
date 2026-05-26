import AdsFormCtaSection from './AdsFormCtaSection'
import AdsStorySection from './AdsStorySection'

const storyParagraphs = [
  "I wasn't unfit. I was just inconsistent. Gym membership, long forms, guilt, repeat. I had the intention every single Sunday. By Wednesday it was gone. I used to save workout routines at 1am like that was the same as doing them. Downloaded apps, bought a resistance band I used twice. I was really good at starting.",
  'Then my trainer called. Not a push notification. An actual video call at 6:30am. He was already moving, no waiting for me to feel ready.',
  "I've done that 20 times now. I haven't cancelled once.",
  "By session twelve I stopped checking how many calories I burned. By session twenty I realised it became about being someone who doesn't quit.",
]

const GetFitStory = () => {
  return (
    <>
      <AdsStorySection
        title="How FitCall changed my life"
        storyLabel="Frank's Story"
        quote="I stopped quitting the day my trainer called"
        paragraphs={storyParagraphs}
        className="md:pb-0"
        image={{
          src: '/images/ads/get-fit-story.png',
          alt: 'Person training at home during a FitCall session',
          width: 540,
          height: 526,
        }}
      />
      <AdsFormCtaSection
        title="Book a trainer today."
        description='Stop restarting. Stop promising yourself "next week." Kindly fill the form and download FitCall today.'
        formId="story-lead"
        className="pt-12 md:pt-24"
      />
    </>
  )
}

export default GetFitStory
