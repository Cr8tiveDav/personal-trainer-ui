import type { ApiEnvelope } from "./index";

export interface AvailabilitySlot {
  id?: string;
  slot_id?: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  timezone: string;
}

export interface SetAvailabilityPayload {
  availability: AvailabilitySlot[];
}

export type TrainerAvailabilityResponse = ApiEnvelope<AvailabilitySlot[]>;
