import { clsx, type ClassValue } from "clsx"
import { isAxiosError } from "axios"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function extractApiErrorMessage(data: unknown): string | undefined {
  if (!data || typeof data !== "object") return undefined

  const record = data as Record<string, unknown>

  if (typeof record.message === "string" && record.message.trim()) {
    return record.message.trim()
  }

  if (typeof record.error === "string" && record.error.trim()) {
    return record.error.trim()
  }

  if (typeof record.detail === "string" && record.detail.trim()) {
    return record.detail.trim()
  }

  return undefined
}

export function getErrorMessage(error: unknown, fallback = "Something went wrong") {
  if (isAxiosError(error)) {
    const fromBody = extractApiErrorMessage(error.response?.data)
    if (fromBody) return fromBody

    if (error.response?.status === 401) {
      return "Invalid email or password"
    }

    if (error.message && !error.message.startsWith("Request failed")) {
      return error.message
    }
  } else if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}

export function displayError(error: unknown, fallback?: string) {
  toast.error(getErrorMessage(error, fallback))
}

export function showSuccessToast(message: string) {
  toast.success(message)
}
