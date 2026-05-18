import { format } from 'date-fns'

export function DashboardGreeting() {
    const today = format(new Date(), 'EEEE, MMMM d')

    return (
        <div className='mb-6 bg-white border border-[#EBEBEB] rounded-sm'>
            <div className='p-5 flex flex-col gap-2'>
                <p className='text-sm text-muted-foreground bg-secondary p-1.5 w-fit rounded-sm'>{today}</p>
                <h1 className='text-xl font-semibold text-gray-900'>Your platform is up & running smoothly</h1>
                <p className='text-base text-[#1C1C1C'>
                    12 sessions today · 3 awaiting your action · payouts process in 2 days.
                </p>
            </div>
        </div>
    )
}