'use client';

import Image from 'next/image';
import React, { useState, useTransition } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { LoginSchema } from '~/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import FramerButton from '../ui/framer-button';
import Link from 'next/link';
import { Eye, EyeOff, Asterisk } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '~/utils';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

const Login = () => {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  // const { status } = useSession()

  // useEffect(() => {
  //   if (status === 'authenticated') {
  //     router.push('/')
  //   }
  // }, [status, router])

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    const { email, password } = values;

    startTransition(() => {
      // Perform login logic here, e.g., call an API to authenticate the user
      // For demonstration, we'll just log the values and redirect to a dashboard
      console.log('Login values:', values);
      // Simulate an API call with a timeout
      setTimeout(() => {
        toast.success('Login successful!');
        // After successful login, redirect to the dashboard or home page
        router.push('/dashboard/trainers');
      }, 2000); // Simulate a 2-second delay for the API call
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputBase =
    'h-[48px] rounded-[10px] border border-[#E3E3E3] px-4 text-[14px] text-[#111111] placeholder:text-[#B0B0B0] placeholder:font-normal bg-white focus-visible:outline-none focus-visible:border-[#0B4D8

  return (
    <section className='min-h-screen flex items-center'>
      <div className='container'>
        <div className='mx-auto grid max-w-[1201px] grid-cols-1 shadow-lg md:grid-cols-2 rounded-[20px] md:rounded-l-none md:rounded-r-[20px]'>
          <article className='relative hidden w-full md:block md:h-auto'>
            <Image
              src='/images/trainer/login-image.png'
              fill
              alt='Trainer Login Form'
              className='object-cover object-center'
            />
          </article>
          <article className='md:px-[80px] md:py-[75px] bg-white rounded-[20px] md:-ml-[20px] relative z-10 px-6 py-12 flex flex-col justify-center'>
            <Image
              src='/images/trainer/logo.svg'
              alt='Logo'
              width={173}
              height={32}
              className='mb-8 md:mb-24'
            />

            <h2 className='mb-11 text-2xl font-bold'>Login</h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-neutralColor-dark-2 flex items-center'>
                        Email
                        <Asterisk
                          strokeWidth={2}
                          className='relative -top-1 h-3 w-3 text-red-800'
                        />
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder='johndoe@example.com'
                          {...field}
                          className={cn(
                            inputBase,
                            form.formState.errors.email &&
                              'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/10'
                          )}
                        />
                      </FormControl>
                      <FormMessage data-testid='email-error' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-neutralColor-dark-2 flex items-center'>
                        Password{' '}
                        <Asterisk
                          strokeWidth={2}
                          className='relative -top-1 h-3 w-3 text-red-800'
                        />
                      </FormLabel>
                      <div className='relative'>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter Password'
                            {...field}
                            className={cn(
                              inputBase,
                              form.formState.errors.password &&
                                'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/10'
                            )}
                          />
                        </FormControl>
                        <button
                          type='button'
                          onClick={togglePasswordVisibility}
                          className='absolute inset-y-0 right-0 flex items-center pr-3'
                        >
                          {showPassword ? (
                            <Eye
                              className='h-5 w-5 text-gray-400'
                              data-testid='eye-icon'
                            />
                          ) : (
                            <EyeOff
                              className='h-5 w-5 text-gray-400'
                              data-testid='eye-off-icon'
                            />
                          )}
                        </button>
                      </div>
                      <FormMessage data-testid='password-error' />
                    </FormItem>
                  )}
                />
                <FramerButton
                  isLoading={isLoading}
                  disabled={isLoading}
                  text='Login'
                  className='mb-0 rounded-md'
                />
                <div className='!mt-2 flex justify-end text-sm'>
                  <Link
                    href='/forgot-password'
                    className='text-sm font-semibold text-red-800 cursor-pointer'
                  >
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </Form>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Login;
