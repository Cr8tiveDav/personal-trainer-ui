export class UnauthorizedError extends Error {
  constructor(message = 'Session expired or invalid. Please log in again.') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class ApiError extends Error {
  status: number
  body: unknown

  constructor(message: string, status: number, body?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}
