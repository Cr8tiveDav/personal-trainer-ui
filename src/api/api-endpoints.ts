/**
 * FitCall API paths (relative to API_URL, which includes /api/v1).
 * Example full URL: https://api.staging.fitcall.me/api/v1/trainers
 */
export const API_ENDPOINTS = {
  AUTH: {
    ADMIN_LOGIN: "/auth/admin/log-in",
    TRAINER_LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },

  TRAINERS: {
    LIST: "/trainers",
    CREATE: "/trainers",
    RESEND_SETUP: "/trainers/resend-setup",
    DETAIL: (id: string) => `/trainers/${id}`,
    RANKINGS: "/trainers/rankings",
    SET_PASSWORD: "/trainers/set-password",
    /** GET /trainers/sessions?trainer_id=&page=&limit= */
    TRAINER_SESSIONS: "/trainers/sessions",
    REVIEWS: (id: string) => `/trainers/${id}/reviews`,
    AVAILABILITY: (id: string) => `/trainers/${id}/availability`,
    IMAGES: (id: string) => `/trainers/${id}/images`,
    IMAGE: (id: string, imageId: string) => `/trainers/${id}/images/${imageId}`,
    INTRO_VIDEO: (id: string) => `/trainers/${id}/intro-video`,
    INTRO_VIDEO_STREAM: (id: string) => `/trainers/${id}/intro-video/stream`,
    /** GET /trainers/me/clients?page=&limit= */
    ME_CLIENTS: "/trainers/me/clients",
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

  DISCOVERY_SLOTS: {
    LIST: "/discovery-slots",
    DETAIL: (id: string) => `/discovery-slots/${id}`,
  },

  ADMIN: {
    USER_TRAINER_COUNT: "/admin/user/trainer/count",
    CLIENTS: "/admin/clients",
    CLIENT_DETAIL: (id: string) => `/admin/clients/${id}`,
    SESSIONS: "/admin/sessions",
    SESSIONS_STATS: "/admin/sessions/stats",
  },
} as const;
