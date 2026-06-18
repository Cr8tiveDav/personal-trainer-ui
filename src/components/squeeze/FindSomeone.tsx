import { WaitlistForm } from './WaitListForm';

type FindSomeoneSectionProps = {
  showForm?: boolean
}

const FindSomeoneSection = ({ showForm = true }: FindSomeoneSectionProps) => {
  return (
    <section className='w-full py-14'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div
          className={
            showForm
              ? 'flex flex-col gap-8 md:flex-row md:items-center md:justify-between'
              : 'mx-auto flex max-w-2xl flex-col items-center text-center'
          }
        >
          <div className={showForm ? 'max-w-sm' : 'max-w-2xl'}>
            <h2 className='text-xl font-bold text-muted-foreground md:text-2xl lg:text-4xl'>
              We find someone who fits how you move.
            </h2>
            <p className='mt-3 text-base leading-relaxed text-muted lg:text-lg'>
              Every FitCall trainer is matched to you based on your goals, your
              schedule, and the kind of energy that actually keeps you going. We
              figure that out before the first call. Kindly fill the form and
              download Fitcall today.
            </p>
          </div>

          {showForm && <WaitlistForm />}
        </div>
      </div>
    </section>
  );
};

export default FindSomeoneSection;
