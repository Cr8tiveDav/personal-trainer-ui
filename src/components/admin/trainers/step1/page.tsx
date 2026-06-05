/* eslint-disable react-hooks/incompatible-library */
'use client';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';
import {
  TRAINER_SPECIALIZATIONS,
  type TrainerSpecialization,
} from "@/api/types/trainers";
import { PhoneInputField } from "@/components/ui/phone-input";
import {
  PHONE_NUMBER_ERROR,
  isStrongPhoneNumber,
  normalizePhoneNumber,
} from '@/lib/phone-number';

const GENDERS = ['Male', 'Female', 'Other'] as const;

const SPECIALIZATION_OPTIONS: {
  value: TrainerSpecialization;
  label: string;
}[] = [
  { value: 'yoga', label: 'Yoga' },
  { value: 'speed', label: 'Speed' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'endurance', label: 'Endurance' },
  { value: 'strength', label: 'Strength & Conditioning' },
];

const step1Schema = z.object({
  name: z.string().trim().min(2, "Full name is required"),
  email: z.string().trim().email("Valid email is required"),
  phone_number: z
    .string()
    .min(1, 'Phone number is required')
    .refine(
      (val) => isStrongPhoneNumber(val),
      PHONE_NUMBER_ERROR
    ),
  gender: z.enum(GENDERS, { message: "Gender is required" }),
  specialization: z.enum(TRAINER_SPECIALIZATIONS, {
    message: 'Specialty is required',
  }),
  years_of_experience: z
    .number({ message: 'Years of experience is required' })
    .min(0, 'Years of experience is required'),
  bio: z.string().max(400).optional(),
});

type Step1FormValues = z.infer<typeof step1Schema>;

export type BasicInfoValues = Omit<Step1FormValues, 'specialization'> & {
  specializations: TrainerSpecialization[];
};

function toBasicInfoValues(values: Step1FormValues): BasicInfoValues {
  const { specialization, ...rest } = values;
  return {
    ...rest,
    phone_number: normalizePhoneNumber(rest.phone_number) ?? rest.phone_number,
    specializations: [specialization],
  };
}

function toStep1DefaultValues(
  values?: Partial<BasicInfoValues>
): Partial<Step1FormValues> {
  if (!values) return {};
  const { specializations, ...rest } = values;
  return {
    ...rest,
    specialization: specializations?.[0],
  };
}

interface Step1Props {
  defaultValues?: Partial<BasicInfoValues>;
  onNext: (values: BasicInfoValues) => void;
}

export function Step1BasicInfo({ defaultValues, onNext }: Step1Props) {
  const form = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema) as Resolver<Step1FormValues>,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      years_of_experience: undefined,
      bio: '',
      ...toStep1DefaultValues(defaultValues),
    },
  });

  const values = form.watch();
  const canContinue = step1Schema.safeParse(values).success;
  const bio = values.bio ?? '';

  return (
    <div className='rounded-[8px] bg-white p-6'>
      <h2 className='text-base font-semibold text-gray-900'>
        Basic information
      </h2>
      <p className='mt-1 mb-6 text-sm text-muted-foreground'>
        This is what clients will see on the trainer&apos;s public profile.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            onNext(toBasicInfoValues(data))
          )}
          className='space-y-5'
        >
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Full name <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g. Amara Johnson'
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
              name='email'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='e.g joe@example.com'
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
              name='phone_number'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Phone number <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <PhoneInputField
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      hasError={!!fieldState.error}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='gender'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Gender <span className='text-red-500'>*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}
                      >
                        <SelectValue placeholder='Select gender' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GENDERS.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='specialization'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Specialty <span className='text-red-500'>*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}
                      >
                        <SelectValue placeholder='Select specialty' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SPECIALIZATION_OPTIONS.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='years_of_experience'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Years of Experience <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min={0}
                      placeholder='e.g 1'
                      className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}
                      value={field.value ?? ''}
                      onChange={(e) => {
                        const raw = e.target.value;
                        if (raw === '') {
                          field.onChange(undefined);
                        } else {
                          const n = Number(raw);
                          field.onChange(Number.isFinite(n) ? n : undefined);
                        }
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='bio'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className='flex items-center justify-between'>
                  Bio / About
                  <span className='text-xs text-muted-foreground'>
                    {bio.length}/400
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Short description & what the client should expect'
                    maxLength={400}
                    className={`login-input min-h-[120px] h-auto resize-none py-3 ${fieldState.error ? 'login-input--error' : ''}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end'>
            <Button
              type='submit'
              disabled={!canContinue}
              className='flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none'
            >
              Continue <ArrowRight className='h-4 w-4' />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
