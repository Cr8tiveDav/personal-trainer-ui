"use client";

import { useQuery } from "@tanstack/react-query";
import { getRequest } from "~/lib/http";
import { displayError } from "~/lib/utils";
import { API_ENDPOINTS } from "./api-endpoints";
import type { ApiEnvelope } from "./types";
import type { RevenueApiResponse } from "./types/payment";

export async function fetchRevenue() {
  const response = await getRequest<
    ApiEnvelope<RevenueApiResponse["data"]>
  >({
    url: API_ENDPOINTS.PAYMENTS.LIST,
  });

  return response.data;
}
export function useRevenue() {
  const query = useQuery({
    queryKey: ["revenue"],
    queryFn: fetchRevenue,
  });

  if (query.isError) {
    displayError(query.error, "Failed to fetch revenue data");
  }
  return query;
}