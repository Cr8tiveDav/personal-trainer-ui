import SectionHeader from '../ui/SectionHeader';

const WhyFitCall = () => {
  return (
    <section className='w-full bg-secondary py-16 lg:py-24'>
      <div className='container mx-auto max-w-4xl px-4 flex items-center justify-center'>
        <SectionHeader
          className='mb-0!'
          badge='Why FitCall'
          title={
            <>
              More than workouts. <br className='hidden md:block' /> A system
              that keeps you going.
            </>
          }
          align='center'
          description={
            <>
              FitCall combines real coaching, flexible scheduling, and
              accountability to help you <br className='hidden md:block' /> stay
              committed long enough to see real results.
            </>
          }
        />
      </div>
    </section>
  );
};

export default WhyFitCall;
