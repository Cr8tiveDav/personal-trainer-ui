import { clsx, type ClassValue } from 'clsx';
import { isAxiosError } from 'axios';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function displayError(error: unknown) {
  let message = 'Something went wrong';

  if (isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    message = data?.message || error.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  toast.error(message);
}

export function showSuccessToast(message: string) {
  toast.success(message);
}

export const TruncateEmail = (
  email: string,
  options: { maxUsernameChars?: number; minUsernameChars?: number } = {}
): string => {
  const { maxUsernameChars = 6, minUsernameChars = 3 } = options;

  if (!email || !email?.includes('@')) {
    return email || '';
  }

  const [username, domain] = email.split('@');

  // Username is short - show full
  if (username.length <= maxUsernameChars) {
    return email;
  }

  // Truncate username smartly between the given min and max username
  const visibleUsername = Math.max(
    minUsernameChars,
    Math.min(maxUsernameChars, username.length)
  );
  const truncate = username.slice(0, visibleUsername) + '...';

  const truncated = `${truncate}@${domain}`;

  return truncated;
};
