import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import SectionHeader from '../ui/SectionHeader'

const faqs = [
  {
    value: 'item-1',
    question: 'What is FitCall and how does it work?',
    answer:
      'FitCall.me is an accountability-driven fitness platform that connects users with real fitness trainers who help them stay consistent through scheduled sessions, reminders, and real human follow
  },
  {
    value: 'item-2',
    question: 'What types of training sessions does FitCall offer?',
    answer:
      'We offer diverse sessions ranging from HIIT and strength training to specialized wellness coaching, all conducted via scheduled accountability calls.',
  },
  {
    value: 'item-3',
    question: 'How do I book a session with a FitCall trainer?',
    answer:
      'You can book directly through our platform by selecting a trainer and a time slot that fits your schedule. Your trainer will then call you at the appointed time.',
  },
]

const FAQSection = () => {
  return (
    <section className="mt-12 pb-14 md:mt-24">
      <div className="container">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          align="center"
        />
        <div className="mt-12 px-2">
          <Accordion
            type="single"
            collapsible
            className="mx-auto w-full max-w-[800px]"
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.value}
                value={faq.value}
                className="border-b border-gray-100 py-2"
              >
                <AccordionTrigger className="group py-6 text-left font-medium text-[#1D2939] hover:no-underline lg:text-lg [&>svg]:hidden">
                  <div className="flex w-full items-center justify-between">
                    <span>{faq.question}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="faq-icon h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-gray-500 lg:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
