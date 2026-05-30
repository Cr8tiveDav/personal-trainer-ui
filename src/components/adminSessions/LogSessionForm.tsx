'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useForm, type Resolver } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Session } from './session'

const SESSION_TYPES = ['Monthly', 'Free Trial', 'One Time'] as const
const CONFIRMATION_OPTIONS = ['Yes', 'Pending', 'N/A'] as const
const SESSION_STATES = ['Completed', 'Unconfirmed', 'Scheduled', 'Settled', 'Disputed', 'Missed'] as const
const DURATIONS = ['-', '1hr', '1.5hrs', '2hrs'] as const

const schema = z.object({
  clientName: z.string().min(1, 'Client is required'),
  trainerName: z.string().min(1, 'Trainer is required'),
  type: z.enum(SESSION_TYPES),
  scheduledDate: z.string().min(1, 'Date is required'),
  scheduledTime: z.string().min(1, 'Time is required'),
  duration: z.enum(DURATIONS),
  amount: z.coerce.number().min(0, 'Amount cannot be negative'),
  clientConf: z.enum(CONFIRMATION_OPTIONS),
  trainerConf: z.enum(CONFIRMATION_OPTIONS),
  state: z.enum(SESSION_STATES),
})

export type LogSessionValues = z.infer<typeof schema>

interface LogSessionFormProps {
  onCancel: () => void
  onSubmit: (session: Session) => void
}

const findClient = (name: string) =>
  ({ name, country: 'N/A' })

const findTrainer = (name: string) =>
  ({ name, country: 'N/A' })

const formatScheduled = (dateValue: string, timeValue: string) => {
  const date = new Date(`${dateValue}T00:00:00`)
  const dateLabel = Number.isNaN(date.getTime())
    ? dateValue
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const [hourValue = '0', minuteValue = '00'] = timeValue.split(':')
  const hour = Number(hourValue)
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  const timeLabel = `${displayHour}:${minuteValue}${period}`

  return `${dateLabel}, ${timeLabel}`
}

const createSessionMeta = () => {
  const sortTimestamp = Date.now()

  return {
    id: `S-MAN-${String(sortTimestamp).slice(-6)}`,
    sortTimestamp,
  }
}

export function LogSessionForm({ onCancel, onSubmit }: LogSessionFormProps) {
  const form = useForm<LogSessionValues>({
    resolver: zodResolver(schema) as Resolver<LogSessionValues>,
    mode: 'onChange',
    defaultValues: {
      clientName: '',
      trainerName: '',
      type: 'Monthly',
      scheduledDate: '',
      scheduledTime: '',
      duration: '1hr',
      amount: 20,
      clientConf: 'Pending',
      trainerConf: 'Pending',
      state: 'Scheduled',
    },
  })

  const { isValid } = form.formState

  const handleSubmit = (values: LogSessionValues) => {
    const sessionMeta = createSessionMeta()

    onSubmit({
      id: sessionMeta.id,
      client: findClient(values.clientName),
      trainer: findTrainer(values.trainerName),
      type: values.type,
      scheduled: formatScheduled(values.scheduledDate, values.scheduledTime),
      duration: values.duration,
      amount: values.amount,
      clientConf: values.clientConf,
      trainerConf: values.trainerConf,
      state: values.state,
      sortTimestamp: sessionMeta.sortTimestamp,
    })
  }

  return (
    <div className='rounded-[8px] bg-white p-6'>
      <h2 className='text-base font-semibold text-gray-900'>Session information</h2>
      <p className='mt-1 mb-6 text-sm text-muted-foreground'>Record the client, trainer, schedule, confirmations, and current session state.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-5'>
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='clientName'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Client <span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter client name'
                      className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='trainerName'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Trainer <span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter trainer name'
                      className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='type'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Type <span className='text-red-500'>*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}>
                        <SelectValue placeholder='Select type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SESSION_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='duration'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Duration <span className='text-red-500'>*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}>
                        <SelectValue placeholder='Select duration' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DURATIONS.map((duration) => (
                        <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='scheduledDate'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Scheduled Date <span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input type='date' className={`login-input ${fieldState.error ? 'login-input--error' : ''}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='scheduledTime'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Scheduled Time <span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input type='time' className={`login-input ${fieldState.error ? 'login-input--error' : ''}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='amount'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Amount <span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input type='number' min={0} className={`login-input ${fieldState.error ? 'login-input--error' : ''}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='state'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>State <span className='text-red-500'>*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}>
                        <SelectValue placeholder='Select state' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SESSION_STATES.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='clientConf'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Client Confirmation <span className='text-red-500'>*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}>
                        <SelectValue placeholder='Select confirmation' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CONFIRMATION_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='trainerConf'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Trainer Confirmation <span className='text-red-500'>*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}>
                        <SelectValue placeholder='Select confirmation' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CONFIRMATION_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex justify-end gap-3'>
            <Button type='button' variant='outline' onClick={onCancel}>
              Cancel
            </Button>
            <Button type='submit' disabled={!isValid} className='flex items-center gap-2'>
              Save Session <ArrowRight className='h-4 w-4' />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
