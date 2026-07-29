import { WaitlistForm } from '@/components/squeeze/WaitListForm'

export function FormBlock() {
  return (
    <div className="w-full flex justify-center lg:justify-end">
      <WaitlistForm
        ctaLabel="Submit"
        defaultCountry="GB"
        locationPlaceholder="Location (e.g. London, UK)"
      />
    </div>
  )
}
