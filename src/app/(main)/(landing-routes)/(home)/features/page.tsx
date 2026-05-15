import CTASection from '@/components/homepage/Cta';
import Features from '@/components/homepage/Features';

const FeaturesPage = () => {
  return (
    <main className="w-full bg-secondary pt-28 md:pt-48">
      <Features />
      <CTASection/>
    </main>
  );
};

export default FeaturesPage;
