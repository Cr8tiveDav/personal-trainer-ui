/**
 * FitCall API paths (relative to API_URL, which includes /api/v1).
 * Example full URL: https://api.staging.fitcall.me/api/v1/trainers
 */
export const API_ENDPOINTS = {
  AUTH: {
    ADMIN_LOGIN: "/auth/admin/log-in",
    TRAINER_LOGIN: "/trainers/login",
    REFRESH: "/auth/refresh",
  },

  TRAINERS: {
    LIST: "/trainers",
    CREATE: "/trainers",
    DETAIL: (id: string) => `/trainers/${id}`,
    RANKINGS: "/trainers/rankings",
    SET_PASSWORD: "/trainers/set-password",
    ME_SESSIONS: "/trainers/me/sessions",
    ME_AVAILABILITY: "/trainers/me/availability",
  },

  WAITLIST: {
    JOIN: "/waitlist",
  },

  CONTACT: {
    SUBMIT: "/contact-us",
  },

  DASHBOARD: {
    STATS: "/dashboard/stats",
  },

  SESSIONS: {
    LIST: "/sessions",
    STATS: "/sessions/stats",
    RECENT: "/sessions/recent",
  },

  ANALYTICS: {
    SUMMARY: "/analytics/summary",
    SUBSCRIPTIONS: "/analytics/subscriptions",
    CONVERSION: "/analytics/conversion",
    PERFORMANCE: (period: string) => `/analytics/performance?period=${period}`,
  },

  FINANCE: {
    SUMMARY: "/finance/summary",
  },

  PAYMENTS: {
    LATEST: "/payments/latest",
  },
} as const;
