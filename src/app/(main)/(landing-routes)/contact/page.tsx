import { ContactForm } from '~/components/contact/contact-form'
import { Metadata } from 'next'
import CTASection from '~/components/homepage/Cta'
import FAQSection from '~/components/homepage/Faq'

export const metadata: Metadata = {
  title: 'Contact Us - FitCall',
  description: "Get in touch with us. We're online & happy to help.",
}

const contactFaqs = [
  {
    value: 'contact-item-1',
    question: 'How do FitCall sessions work?',
    answer:
      'FitCall.me is an accountability-driven fitness platform that connects users with real fitness trainers who help them stay consistent through scheduled sessions, reminders, and real human follow-up.',
  },
  {
    value: 'contact-item-2',
    question: 'Can I cancel anytime?',
    answer:
      'Yes. You can cancel before your next billing cycle, and your access will remain active until the end of the period you already paid for.',
  },
  {
    value: 'contact-item-3',
    question: 'Do I need any equipment?',
    answer:
      'No equipment is required to get started. Your trainer can tailor sessions around bodyweight movements and whatever space or equipment you already have.',
  },
]

export default function ContactPage() {
  return (
    <main className="w-full bg-secondary pt-28 md:pt-48">
      <section className="w-full pb-10 md:pb-22.5">
        <div className="container">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col justify-start">
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-[9999px] border border-[#D1E9FF] bg-primarybadge px-3 py-1">
                <span className="h-2 w-2 rounded-[9999px] bg-primary" />
                <span className="text-sm font-medium text-primary">
                  We&apos;re online & happy to help
                </span>
              </div>

              <h1 className="mb-6 text-3xl font-bold tracking-tight text-[#101828] md:text-5xl lg:text-6xl">
                Get in touch <br />
                <span className="text-primary">with us</span>
              </h1>

              <p className="max-w-120 text-base leading-relaxed text-muted md:text-lg">
                Have questions about FitCall, trainers, or getting started?
                We&apos;re here to help &mdash; no scripts, just real humans.
              </p>
            </div>

            <div className="w-full">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <FAQSection
        badge="Quick answers"
        title="Before you reach out..."
        description="You might find your answer here in seconds."
        faqs={contactFaqs}
        listClassName="mt-5 md:mt-6"
      />
      <CTASection />
    </main>
  )
}
