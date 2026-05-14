'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
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
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { submitContactForm } from '@/lib/api/contact'

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please enter a valid email address.' }),
  subject: z
    .string({ message: 'Please select a subject.' })
    .min(1, { message: 'Please select a subject.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
})

const inputBase =
  'h-[48px] rounded-[10px] border border-[#E3E3E3] px-4 text-[14px] text-[#111111] ' +
  'placeholder:text-[#B0B0B0] placeholder:font-normal bg-white ' +
  'focus-visible:outline-none focus-visible:border-[#0B4D8D] focus-visible:ring-2 ' +
  'focus-visible:ring-[rgba(11,77,141,0.1)]'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: async (data) => {
      const result = await formSchema.safeParseAsync(data)
      if (result.success) {
        return { values: result.data, errors: {} }
      }
      return {
        values: {},
        errors: result.error.issues.reduce((allErrors, currentError) => {
          return {
            ...allErrors,
            [currentError.path[0]]: {
              type: currentError.code,
              message: currentError.message,
            },
          }
        }, {}),
      }
    },
    defaultValues: { fullName: '', email: '', subject: undefined, message: '' },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError(null)

    try {
      await submitContactForm(values)
      setSubmitSuccess(true)
      form.reset()
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'An unexpected error occurred.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full rounded-lg border border-[#ECECEC] bg-white p-4 md:p-6">
      {submitSuccess && (
        <div
          className="mb-5 flex items-start gap-3 rounded-[10px] bg-green-50 p-4 text-green-700"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
          <div>
            <p className="text-sm font-semibold">Message sent successfully!</p>
            <p className="mt-1 text-xs opacity-80">
              We&apos;ll get back to you shortly.
            </p>
          </div>
        </div>
      )}

      {submitError && (
        <div
          className="mb-5 flex items-start gap-3 rounded-[10px] bg-red-50 p-4 text-red-700"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
          <div>
            <p className="text-sm font-semibold">Submission Error</p>
            <p className="mt-1 text-xs opacity-80">{submitError}</p>
          </div>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 block text-[13px] font-medium text-[#222222]">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jane Doe"
                      {...field}
                      className={inputBase}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="mt-1 text-[12px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 block text-[13px] font-medium text-[#222222]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jane@example.com"
                      type="email"
                      {...field}
                      className={inputBase}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="mt-1 text-[12px]" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-[13px] font-medium text-[#222222]">
                  Subject
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 rounded-[10px] border border-[#E3E3E3] bg-white px-4 text-[14px] text-[#B0B0B0] focus:border-[#0B4D8D] focus:ring-2 focus:ring-[rgba(11,77,141,0.1)]"
                      <SelectValue placeholder="General question" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="general">General question</SelectItem>
                    <SelectItem value="training">Training plans</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="mt-1 text-[12px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-[13px] font-medium text-[#222222]">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little about what you're looking for..."
                    className="min-h-35 resize-none rounded-[10px] border border-[#E3E3E3] bg-white p-4 text-[14px] text-[#111111] placeholder:text-[#B0B0B0] focus-visible:border-[#0B4D8D] focus-visib
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="mt-1 text-[12px]" />
              </FormItem>
            )}
          />

          <div className="flex md:flex-row flex-col items-center justify-between gap-4 pt-1">
            <p className="text-[13px] leading-normal text-muted-foreground">
              By sending, you agree to our friendly{' '}
              <Link
                href="/legal/privacy-policy"
                className="font-semibold text-primary underline"
              >
                privacy terms
              </Link>
              .
            </p>
            <Button type="submit" disabled={isSubmitting} className='w-full lg:w-fit'>
              {isSubmitting ? 'Sending...' : 'Send message'}
              {!isSubmitting && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
