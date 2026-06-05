import { WaitlistForm } from './WaitListForm';

const TrainerReady = () => {
  return (
    <section className='w-full py-14'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
          <div className='max-w-sm'>
            <h2 className='text-xl font-bold text-muted-foreground md:text-2xl lg:text-4xl'>
              Your Trainer is Ready. Are you?
            </h2>
            <p className='mt-3 text-base leading-relaxed text-muted lg:text-lg'>
              Stop restarting. Stop promising yourself &apo;next week.&apo;
              Kindly Fill the form and download FitCall today.
            </p>
          </div>
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
};

export default TrainerReady;
