export interface ApiEnvelope<T> {
  status: string;
  code: string;
  message: string;
  data: T;
}
