import { clsx, type ClassValue } from 'clsx';
import { isAxiosError } from 'axios';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function extractApiErrorMessage(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') return undefined;

  const record = data as Record<string, unknown>;

  if (typeof record.message === 'string' && record.message.trim()) {
    return record.message.trim();
  }

  return undefined;
}

export function getErrorMessage(error: unknown, fallback = 'Something went wrong') {
  if (isAxiosError(error)) {
    const fromBody = extractApiErrorMessage(error.response?.data);
    if (fromBody) return fromBody;

    if (error.response?.status === 401) {
      return 'Invalid email or password';
    }

    if (error.message && !error.message.startsWith('Request failed')) {
      return error.message;
    }
  } else if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export function displayError(error: unknown, fallback?: string) {
  toast.error(getErrorMessage(error, fallback));
}

export function showSuccessToast(message: string) {
  toast.success(message);
}

/** Short display name: first name + last initial (matches trainer table). */
export function formatDisplayName(name: string) {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const firstName = parts[0];
  const lastName = parts[parts.length - 1];
  if (lastName.length <= 2 && lastName.endsWith('.')) {
    return `${firstName} ${lastName}`;
  }
  return `${firstName} ${lastName.charAt(0).toUpperCase()}.`;
}

export const TruncateEmail = (
  email: string,
  options: { maxUsernameChars?: number; minUsernameChars?: number } = {},
): string => {
  const { maxUsernameChars = 6, minUsernameChars = 3 } = options;

  if (!email || !email?.includes('@')) {
    return email || '';
  }

  const [username, domain] = email.split('@');

  if (username.length <= maxUsernameChars) {
    return email;
  }

  const visibleUsername = Math.max(
    minUsernameChars,
    Math.min(maxUsernameChars, username.length),
  );
  const truncate = username.slice(0, visibleUsername) + '...';

  return `${truncate}@${domain}`;
};
