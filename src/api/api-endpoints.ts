/**
 * FitCall API paths (relative to API_URL, which includes /api/v1).
 * Example full URL: https://api.staging.fitcall.me/api/v1/trainers
 */
export const API_ENDPOINTS = {
  AUTH: {
    ADMIN_LOGIN: '/auth/admin/log-in',
    TRAINER_LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  TRAINERS: {
    LIST: '/trainers',
    CREATE: '/trainers',
    RESEND_SETUP: '/trainers/resend-setup',
    DETAIL: (id: string) => `/trainers/${id}`,
    RANKINGS: '/trainers/rankings',
    SET_PASSWORD: '/trainers/set-password',
    /** GET /trainers/sessions?trainer_id=&page=&limit= */
    TRAINER_SESSIONS: '/trainers/sessions',
    REVIEWS: (id: string) => `/trainers/${id}/reviews`,
    AVAILABILITY: (id: string) => `/trainers/${id}/availability`,
    /** DELETE /trainers/{id}/availability/{slot_id} */
    AVAILABILITY_SLOT: (id: string, slotId: string) => `/trainers/${id}/availability/${slotId}`,
    /** PATCH /trainers/{id}/availability/toggle */
    AVAILABILITY_TOGGLE: (id: string) => `/trainers/${id}/availability/toggle`,
    IMAGES: (id: string) => `/trainers/${id}/images`,
    IMAGE: (id: string, imageId: string) => `/trainers/${id}/images/${imageId}`,
    INTRO_VIDEO: (id: string) => `/trainers/${id}/intro-video`,
    INTRO_VIDEO_STREAM: (id: string) => `/trainers/${id}/intro-video/stream`,
    /** GET /trainers/me/clients?page=&limit= */
    ME_CLIENTS: '/trainers/me/clients',
    /** GET|POST /trainers/me/availability */
    ME_AVAILABILITY: '/trainers/me/availability',
    /** DELETE /trainers/me/availability/{slot_id} */
    ME_AVAILABILITY_SLOT: (slotId: string) => `/trainers/me/availability/${slotId}`,
    /** PATCH /trainers/me/availability/toggle */
    ME_AVAILABILITY_TOGGLE: '/trainers/me/availability/toggle',
    /** GET authenticated trainer profile */
    ME: '/trainers/me',
    /** PATCH authenticated trainer profile */
    ME_EDIT_PROFILE: '/trainers/me/edit-profile',
  },
  MEDIA: {
    LIST: '/media',
    UPLOAD_IMAGE: '/media/images',
    UPLOAD_VIDEO: '/media/videos',
    DELETE_MEDIA: (id: string) => `/media/${id}`,
  },
  CLIENTS: {
    LIST: '/clients',
    SESSIONS: (id: string) => `/clients/${id}/sessions`,
    DETAIL: (id: string) => `/clients/${id}`,
    STATS: (id: string) => `/clients/${id}/stats`,
  },
  TRAINER_CLIENTS: {
    SESSIONS: (id: string) => `/trainers/me/clients/${id}/sessions`,
  },
  WAITLIST: {
    GET_WAITLIST: '/waitlists',
    JOIN: '/waitlists',
    DELETE: (id: string) => `/waitlists/${id}`,
  },
  PAYMENTS: {
    HISTORY: '/payments/history',
  },
  SESSIONS: {
    /** GET /sessions?page=&limit= */
    LIST: '/sessions',
    /** GET /sessions/{id} */
    DETAIL: (id: string) => `/sessions/${id}`,
    /** GET /sessions/{id}/events */
    EVENTS: (id: string) => `/sessions/${id}/events`,
    /** GET /sessions/{id}/stream */
    STREAM: (id: string) => `/sessions/${id}/stream`,
    
    // Trainer-facing session paths:
    ME_LIST: '/sessions/me',
    ME_DETAIL: (id: string) => `/sessions/me/${id}`,
    ME_EVENTS: (id: string) => `/sessions/me/${id}/events`,
    ME_STREAM: (id: string) => `/sessions/me/${id}/stream`,
  },
  REVIEWS: {
    /** GET /reviews?page=&limit= */
    LIST: '/reviews',
    /** DELETE /reviews/{id} */
    DELETE: (id: string) => `/reviews/${id}`,
    /** GET /trainers/me/reviews?page=&limit= */
    ME_LIST: '/trainers/me/reviews',
  },

  ROLES_PERMISSIONS: {
    ROLES: '/roles',
    PERMISSIONS: '/permissions',
  },
  DISCOVERY: {
    /** POST /discovery/slots */
    CREATE_SLOT: '/discovery/slots',
    /** GET /discovery/slots */
    LIST_SLOTS: '/discovery/slots',
    /** GET /discovery/slots/:id */
    GET_SLOT: (id: string) => `/discovery/slots/${id}`,
    /** PUT /discovery/slots/:id */
    UPDATE_SLOT: (id: string) => `/discovery/slots/${id}`,
    /** DELETE /discovery/slots/:id */
    DELETE_SLOT: (id: string) => `/discovery/slots/${id}`,
  },
} as const;
