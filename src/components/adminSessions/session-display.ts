import type { Session } from './session'

export const formatSessionId = (id: string) => {
  if (id.length <= 12) return id
  return `${id.slice(0, 8)}...${id.slice(-4)}`
}

export const getStateBadgeStyles = (state: Session['state']) => {
  switch (state) {
    case 'Completed':
    case 'Settled':
      return 'bg-[#ECFDF5] text-[#14561C]'
    case 'Scheduled':
    case 'Unconfirmed':
      return 'bg-[#edf6ff] text-[#2272ad]'
    case 'Cancelled':
    case 'Missed':
      return 'bg-[#FEF0EF] text-[#9C1E1C]'
    case 'Disputed':
      return 'bg-[#FEF6E1] text-[#A86908]'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}
