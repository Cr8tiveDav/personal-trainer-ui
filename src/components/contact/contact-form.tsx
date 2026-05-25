'use client'

import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import Link from 'next/link'
import { ArrowRight,} from 'lucide-react'
import { toast } from 'sonner'
import { contactAction } from '@/actions/contact' 

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
  const [isSubmitting, startTransition] = useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: '', email: '', subject: 'general', message: '' },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append('fullName', values.fullName)
    formData.append('email', values.email)
    formData.append('subject', values.subject)
    formData.append('message', values.message)

    startTransition(async () => {
      const result = await contactAction(null, formData)

      if (result?.success) {
        toast.success('Message sent successfully!')
        form.reset()
      } else {
        toast.error(result?.error || 'Something went wrong. Please try again.')
      }
    })
  }

  return (
    <div className="w-full rounded-[8px] border border-[#ECECEC] bg-white p-4 md:p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="grid grid-cols-2 gap-5">
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
                    <SelectTrigger className="h-12 rounded-[10px] border border-[#E3E3E3] bg-white px-4 text-[14px] text-[#111111] [&>span[data-placeholder]]:text-[#B0B0B0] focus:border-[#0B4D8D] focus:ring-2 focus:ring-[rgba(11,77,141,0.1)]">
                      <SelectValue placeholder="General question" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
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
                    className="min-h-35 resize-none rounded-[10px] border border-[#E3E3E3] bg-white p-4 text-[14px] text-[#111111] placeholder:text-[#B0B0B0] focus-visible:border-[#0B4D8D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(11,77,141,0.1)]"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="mt-1 text-[12px]" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-4 pt-1">
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
            <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
              {isSubmitting ? 'Sending...' : 'Send message'}
              {!isSubmitting && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}