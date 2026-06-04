import AdsHeroSection from '../AdsHeroSection';

const socialLinks = ['Zoom', 'WhatsApp', 'Google Meet', 'Twitter', 'Facebook'];

const BuildUpHero = () => {
  return (
    <AdsHeroSection
      badge='Live trainer accountability'
      title='Never miss a workout session'
      description='Find a vetted fitness trainer who calls you at your scheduled time - live, on video. Kindly fill the form and download FitCall today.'
      formId='build-up-hero-lead'
      socialLinks={socialLinks}
      containerClassName='gap-7 pb-8 md:grid-cols-[minmax(0,590px)_minmax(280px,380px)] md:pb-18'
      contentClassName='max-w-[410px]'
      titleClassName='max-w-[430px] text-[33px] leading-[1.02] md:max-w-[560px]'
      imageWrapperClassName='md:max-w-[380px]'
      image={{
        src: '/images/ads/athlete_desk.jpg',
        alt: 'Runner training outdoors',
        width: 760,
        height: 760,
        sizes: '(max-width: 767px) 88vw, 380px',
        className: 'object-[50%_42%]',
      }}
    />
  );
};

export default BuildUpHero;
