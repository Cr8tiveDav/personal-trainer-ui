"use client";

import { useQuery } from "@tanstack/react-query";
import { getRequest } from "~/lib/http";
import { API_ENDPOINTS } from "./api-endpoints";
import type { EarningsResponse } from "./types/finance";

export function useTrainerEarnings(trainerId: string) {
  return useQuery({
    queryKey: ["trainer-earnings", trainerId],
    queryFn: async () => {
      // Use query params to fetch finance summary for this specific trainer
      const response = await getRequest<EarningsResponse>({
        url: `${API_ENDPOINTS.FINANCE.SUMMARY}?trainer_id=${trainerId}`,
      });
      return response.data;
    },
    enabled: !!trainerId,
    retry: false,
  });
}
