import { clsx, type ClassValue } from "clsx"
import { isAxiosError } from "axios"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function displayError(error: unknown) {
  let message = "Something went wrong"

  if (isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined
    message = data?.message || error.message || message
  } else if (error instanceof Error) {
    message = error.message
  }

  toast.error(message)
}

export function showSuccessToast(message: string) {
  toast.success(message)
}
