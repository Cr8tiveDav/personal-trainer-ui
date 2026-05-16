import Image from 'next/image';

const checkPoints = [
  {
    content: 'A coach who knows your name and your goals',
  },
  {
    content: 'Honest check-ins, gentle nudges, real encouragement',
  },
  {
    content: "Sessions that adapt to how you're feeling that day",
  },
];

const HumanSide = () => {
  return (
    <section className='w-full bg-secondary py-16 lg:py-24'>
      <div className='container mx-auto max-w-5xl px-4 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch'>
        <div className='w-full rounded-lg overflow-hidden h-81 md:h-140.5'>
          <Image
            src='/images/features/man-running.png'
            alt='Man Running'
            width={615}
            height={562}
            className='w-full h-full object-cover'
          />
        </div>

        <div className='w-full flex flex-col justify-center h-full bg-white p-8 rounded-lg'>
          <h3 className='text-lg font-semibold text-primary mb-2'>
            The human side
          </h3>
          <h2 className='text-2xl lg:text-3xl font-bold tracking-tight text-muted-foreground mb-4'>
            Feel supported every step of the way.
          </h2>
          <p className='text-muted text-xl leading-tight mb-6 opacity-90'>
            Fitness becomes easier to stick to when someone is guiding you,
            checking in on you, and helping you stay accountable.
          </p>

          <ul className='space-y-4'>
            {checkPoints.map((item, index) => (
              <li
                key={index}
                className='flex items-start text-muted text-sm md:text-base'
              >
                <Image
                  src='/images/features/check.svg'
                  alt={`check ${index + 1}`}
                  width={20}
                  height={20}
                  className='mr-3 mt-0.5 shrink-0'
                />
                <span className='leading-relaxed opacity-90'>
                  {item.content}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HumanSide;
