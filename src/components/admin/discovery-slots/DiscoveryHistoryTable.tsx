'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useDiscoveryBookings, type DiscoveryBooking } from '@/api/discovery-slots'
import { cn } from '@/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { EMPTY_STATE_IMAGE_PATHS, EmptyState } from '@/components/ui/EmptyState'
import { TruncateEmail } from '@/lib/utils'

const PER_PAGE = 10

function getVisiblePages(current: number, total: number) {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  if (current <= 3) {
    return [1, 2, 3, 4, 5, '...'] as const
  }
  if (current >= total - 2) {
    return ['...', total - 4, total - 3, total - 2, total - 1, total] as const
  }
  return ['...', current - 1, current, current + 1, '...'] as const
}

function getClientName(booking: DiscoveryBooking): string {
  if (booking.name) return booking.name
  if (booking.client_name) return booking.client_name
  if (booking.clientName) return booking.clientName
  if (booking.client) {
    const c = booking.client
    if (c.name) return c.name
    const first = c.first_name || c.firstName || ''
    const last = c.last_name || c.lastName || ''
    const combined = `${first} ${last}`.trim()
    if (combined) return combined
  }
  return '—'
}

function getClientEmail(booking: DiscoveryBooking): string {
  if (booking.email) return booking.email
  if (booking.client_email) return booking.client_email
  if (booking.clientEmail) return booking.clientEmail
  if (booking.client?.email) return booking.client.email
  return ''
}

function getDateStr(booking: DiscoveryBooking): string {
  return (
    booking.selected_datetime ||
    booking.selectedDatetime ||
    booking.scheduled_at ||
    booking.booking_time ||
    booking.bookingTime ||
    booking.date ||
    ''
  )
}

function DiscoveryHistoryTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.tr
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="border-b border-[#EBEBEB] last:border-none"
        >
          <td className="py-4 px-6 whitespace-nowrap">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-36" />
            </div>
          </td>
          {Array.from({ length: 6 }).map((_, colIndex) => (
            <td key={colIndex} className="py-4 px-6 whitespace-nowrap">
              <Skeleton className="h-4 w-20" />
            </td>
          ))}
        </motion.tr>
      ))}
    </>
  )
}

export function DiscoveryHistoryTable() {
  const [displayPage, setDisplayPage] = useState(1)
  const { data, isLoading, isError } = useDiscoveryBookings(displayPage, PER_PAGE)

  const rawBookings = data?.bookings || []
  const meta = data?.meta
  const isServerSide = !!meta

  const listTotalCount = isServerSide ? (meta?.total_count ?? rawBookings.length) : rawBookings.length
  const totalPages = isServerSide ? (meta?.total_pages ?? 1) : Math.ceil(rawBookings.length / PER_PAGE)

  const bookings = isServerSide
    ? rawBookings
    : rawBookings.slice((displayPage - 1) * PER_PAGE, displayPage * PER_PAGE)

  const rangeStart = listTotalCount === 0 ? 0 : (displayPage - 1) * PER_PAGE + 1
  const rangeEnd = listTotalCount === 0 ? 0 : Math.min(displayPage * PER_PAGE, listTotalCount)

  const resultsLabel =
    listTotalCount === 0
      ? 'Showing 0 results'
      : `Showing ${rangeStart}–${rangeEnd} of ${listTotalCount} results`

  const visiblePages = getVisiblePages(displayPage, totalPages)
  const showPagination = listTotalCount > PER_PAGE

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className='w-full rounded-[12px] border border-[#EBEBEB] bg-white overflow-hidden'
    >
      <div className='px-6 py-4 border-b border-[#EBEBEB]'>
        <h2 className='text-sm font-semibold text-gray-900'>Discovery Call History</h2>
        <p className='text-xs text-gray-500 mt-0.5'>
          {listTotalCount === 0
            ? 'No discovery call history found.'
            : `${listTotalCount} call${listTotalCount === 1 ? '' : 's'} recorded`}
        </p>
      </div>

      <div className='overflow-x-auto min-h-100'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr className='bg-[#F5F5F5] h-15 border-b border-[#EBEBEB]'>
              <th className='py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider whitespace-nowrap'>Client</th>
              <th className='py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider whitespace-nowrap'>Phone Number</th>
              <th className='py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider whitespace-nowrap text-center'>Reschedule Count</th>
              <th className='py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider whitespace-nowrap'>Meeting ID</th>
              <th className='py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider whitespace-nowrap'>Client Timezone</th>
              <th className='py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider whitespace-nowrap'>Contact Mode</th>
              <th className='py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider whitespace-nowrap'>Selected Datetime</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <DiscoveryHistoryTableSkeleton />
            ) : (
              <AnimatePresence initial mode='sync'>
                {isError ? (
                  <motion.tr
                    key='error'
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td colSpan={7} className='py-12 text-center text-sm text-red-500'>
                      Error loading discovery call history. Please try again.
                    </td>
                  </motion.tr>
                ) : bookings.length === 0 ? (
                  <motion.tr
                    key='empty'
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <td colSpan={7} className='p-0'>
                      <EmptyState
                        imageSrc={EMPTY_STATE_IMAGE_PATHS.trainer}
                        imageAlt='No history'
                        title='No history found'
                        description='Discovery call history will appear here once recordings/bookings are created.'
                        className='min-h-[280px] py-12'
                      />
                    </td>
                  </motion.tr>
                ) : (
                  bookings.map((booking: DiscoveryBooking) => {
                    const clientName = getClientName(booking)
                    const clientEmail = getClientEmail(booking)

                    const dateStr = getDateStr(booking)
                    let formattedDate = '—'
                    if (dateStr) {
                      try {
                        formattedDate = new Date(dateStr).toLocaleString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })
                      } catch {
                        formattedDate = dateStr
                      }
                    }

                    const meetingId = booking.meeting_id || booking.zoom_meeting_id || '—'
                    const phoneNumber = booking.phone_number || '—'
                    const rescheduleCount = booking.reschedule_count !== undefined ? booking.reschedule_count : 0
                    const clientTimezone = booking.client_timezone || '—'
                    const contactMode = booking.contact_mode
                      ? booking.contact_mode.replace(/_/g, ' ')
                      : '—'

                    return (
                      <tr key={booking.id} className='border-b border-[#EBEBEB] last:border-none hover:bg-gray-50/50 text-sm'>
                        {/* Client (Name & Email) */}
                        <td className='py-4 px-6 whitespace-nowrap'>
                          <div>
                            <p className='font-semibold text-gray-900'>{clientName}</p>
                            {clientEmail && <p className='text-xs text-gray-400 mt-0.5'>{TruncateEmail(clientEmail)}</p>}
                          </div>
                        </td>

                        {/* Phone Number */}
                        <td className='py-4 px-6 whitespace-nowrap text-gray-600 font-medium'>
                          {phoneNumber}
                        </td>

                        {/* Reschedule Count */}
                        <td className='py-4 px-6 whitespace-nowrap text-gray-600 text-center font-medium'>
                          {rescheduleCount}
                        </td>

                        {/* Meeting ID */}
                        <td className='py-4 px-6 whitespace-nowrap text-gray-600 font-mono text-xs'>
                          {meetingId}
                        </td>

                        {/* Client Timezone */}
                        <td className='py-4 px-6 whitespace-nowrap text-gray-600'>
                          {clientTimezone}
                        </td>

                        {/* Contact Mode */}
                        <td className='py-4 px-6 whitespace-nowrap capitalize text-gray-600 font-medium'>
                          {contactMode}
                        </td>

                        {/* Selected Datetime */}
                        <td className='py-4 px-6 whitespace-nowrap text-gray-700 font-medium'>
                          {formattedDate}
                        </td>
                      </tr>
                    )
                  })
                )}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-center border-t border-[#EBEBEB] py-6 px-4 sm:flex-row sm:justify-between sm:px-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={resultsLabel}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-gray-500"
          >
            {isLoading ? "Loading history…" : resultsLabel}
          </motion.p>
        </AnimatePresence>

        {showPagination && (
          <div className="mt-4 flex items-center gap-1 md:mt-0 md:gap-3">
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => setDisplayPage(displayPage - 1)}
              disabled={displayPage <= 1 || isLoading}
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[6px] border border-[#EBEBEB] text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.button>

            {visiblePages.map((item, index) => {
              if (item === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center text-gray-500"
                  >
                    ...
                  </span>
                )
              }
              const isSelected = item === displayPage
              return (
                <motion.button
                  key={item}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDisplayPage(item)}
                  className={cn(
                    "flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[6px] text-sm font-semibold transition-colors disabled:cursor-not-allowed",
                    isSelected
                      ? "bg-[#0b4d8d] text-white shadow-sm"
                      : "border border-[#EBEBEB] text-gray-700 hover:bg-gray-50"
                  )}
                  disabled={isLoading}
                >
                  {item}
                </motion.button>
              )
            })}

            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => setDisplayPage(displayPage + 1)}
              disabled={displayPage >= totalPages || isLoading}
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[6px] border border-[#EBEBEB] text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
