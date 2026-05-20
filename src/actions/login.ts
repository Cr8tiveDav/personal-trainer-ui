'use server';

import * as z from 'zod';
import { LoginSchema } from '~/schemas';

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  // 1. Re-validate the inputs on the server
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields! Please check your input.' };
  }



  try {
    // Perform actual login logic here (e.g., connect to database, check credentials)
    // For now, we simulate an API call with a 2-second delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // After successful logic, you can return a success message
    return { success: 'Login successful!' };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Something went wrong. Please try again.' };
  }
};
