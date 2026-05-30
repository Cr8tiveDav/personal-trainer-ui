import { Session } from "@/components/adminSessions/session";

type SessionLike = Record<string, unknown>;

const readString = (value: unknown, fallback = "N/A") =>
  typeof value === "string" && value.trim() ? value : fallback;

const readNumber = (value: unknown, fallback = 0) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (
    typeof value === "string" &&
    value.trim() &&
    Number.isFinite(Number(value))
  )
    return Number(value);
  return fallback;
};

const readObject = (value: unknown): SessionLike =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as SessionLike)
    : {};

const formatTimezoneRegion = (value: string) => {
  const region = value.split("/")[0]?.toLowerCase();

  const regionLabels: Record<string, string> = {
    africa: "AFR",
    america: "US",
    antarctica: "ANT",
    arctic: "ARC",
    asia: "AS",
    atlantic: "ATL",
    australia: "AUS",
    europe: "EU",
    indian: "IND",
    pacific: "PAC",
  };

  return regionLabels[region] ?? value;
};

const readFirstValue = (session: SessionLike, keys: string[]) => {
  for (const key of keys) {
    if (
      session[key] !== undefined &&
      session[key] !== null &&
      session[key] !== ""
    )
      return session[key];
  }

  return undefined;
};

const readNestedFirstValue = (session: SessionLike, keys: string[]) => {
  const nestedSources = [
    session,
    readObject(session.session),
    readObject(session.booking),
    readObject(session.appointment),
  ];

  for (const source of nestedSources) {
    const value = readFirstValue(source, keys);
    if (value !== undefined) return value;
  }

  return undefined;
};

const readPerson = (session: SessionLike, key: "client" | "trainer") => {
  const person = readObject(session[key]);
  const timezone = readString(
    readNestedFirstValue(session, ["timezone", "time_zone", "timeZone"]),
    "",
  );
  const timezoneRegion = timezone ? formatTimezoneRegion(timezone) : "";
  const name =
    readString(person.name, "") ||
    readString(person.full_name, "") ||
    readString(
      session[`${key}_name`],
      key === "client" ? "Unknown Client" : "Unknown Trainer",
    );

  const email =
    readString(person.email, "") ||
    readString(session[`${key}_email`], "") ||
    undefined;

  return {
    name,
    avatar:
      readString(person.avatar, "") ||
      readString(person.avatar_url, "") ||
      readString(person.display_picture, "") ||
      undefined,
    country: readString(
      person.country,
      readString(session[`${key}_country`], timezoneRegion || "N/A"),
    ),
    ...(email ? { email } : {}),
  };
};

const formatDateTime = (value: unknown) => {
  if (typeof value !== "string" || !value.trim()) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const getTimeValue = (value: unknown) => {
  if (typeof value !== "string" && typeof value !== "number") return 0;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
};

const getSessionSortTimestamp = (session: SessionLike) => {
  const created = readNestedFirstValue(session, [
    "created_at",
    "createdAt",
    "booked_at",
    "bookedAt",
    "inserted_at",
    "insertedAt",
    "updated_at",
    "updatedAt",
  ]);
  const createdTime = getTimeValue(created);
  if (createdTime) return createdTime;

  return getTimeValue(
    readNestedFirstValue(session, [
      "scheduled_at",
      "scheduledAt",
      "scheduled",
      "scheduled_time",
      "scheduledTime",
      "scheduled_for",
      "scheduledFor",
      "starts_at",
      "startsAt",
      "start_at",
      "startAt",
      "scheduled_start",
      "scheduledStart",
      "start_time",
      "startTime",
      "actual_start",
      "actualStart",
      "created_at",
      "createdAt",
    ]),
  );
};

const formatScheduled = (session: SessionLike) => {
  const scheduled = readNestedFirstValue(session, [
    "scheduled_at",
    "scheduledAt",
    "scheduled",
    "scheduled_time",
    "scheduledTime",
    "scheduled_for",
    "scheduledFor",
    "starts_at",
    "startsAt",
    "start_at",
    "startAt",
    "scheduled_start",
    "scheduledStart",
    "start_time",
    "startTime",
    "actual_start",
    "actualStart",
  ]);

  if (scheduled !== undefined) return formatDateTime(scheduled);

  const date = readNestedFirstValue(session, [
    "scheduled_date",
    "scheduledDate",
    "session_date",
    "sessionDate",
    "date",
  ]);
  const time = readNestedFirstValue(session, [
    "scheduled_time",
    "scheduledTime",
    "session_time",
    "sessionTime",
    "time",
  ]);

  if (
    typeof date === "string" &&
    date.trim() &&
    typeof time === "string" &&
    time.trim()
  ) {
    return formatDateTime(`${date}T${time}`);
  }

  return formatDateTime(
    readNestedFirstValue(session, ["created_at", "createdAt"]),
  );
};

const formatDuration = (session: SessionLike) => {
  const duration = readNestedFirstValue(session, [
    "duration",
    "duration_minutes",
    "durationMinutes",
    "duration_in_minutes",
    "durationInMinutes",
    "duration_mins",
    "durationMins",
    "duration_min",
    "durationMin",
    "length_minutes",
    "lengthMinutes",
    "session_duration",
    "sessionDuration",
  ]);

  if (typeof duration === "string" && duration.trim()) {
    const numericDuration = Number(duration);
    if (Number.isFinite(numericDuration)) {
      if (numericDuration % 60 === 0) return `${numericDuration / 60}hr`;
      return `${numericDuration}mins`;
    }

    return duration;
  }
  if (typeof duration === "number" && Number.isFinite(duration)) {
    if (duration % 60 === 0) return `${duration / 60}hr`;
    return `${duration}mins`;
  }

  const startValue = readNestedFirstValue(session, [
    "actual_start",
    "actualStart",
    "scheduled_start",
    "scheduledStart",
    "starts_at",
    "startsAt",
    "start_at",
    "startAt",
    "start_time",
    "startTime",
  ]);
  const endValue = readNestedFirstValue(session, [
    "actual_end",
    "actualEnd",
    "scheduled_end",
    "scheduledEnd",
    "ends_at",
    "endsAt",
    "end_at",
    "endAt",
    "end_time",
    "endTime",
  ]);
  const start = typeof startValue === "string" ? new Date(startValue) : null;
  const end = typeof endValue === "string" ? new Date(endValue) : null;
  if (
    start &&
    end &&
    !Number.isNaN(start.getTime()) &&
    !Number.isNaN(end.getTime())
  ) {
    const minutes = Math.max(
      0,
      Math.round((end.getTime() - start.getTime()) / 60000),
    );
    if (minutes === 0) return "-";
    if (minutes % 60 === 0) return `${minutes / 60}hr`;
    return `${minutes}mins`;
  }

  return "-";
};

const mapConfirmation = (value: unknown): Session["clientConf"] => {
  if (value === true) return "Yes";
  if (value === false) return "Pending";
  if (typeof value === "string") {
    const normalized = value.toLowerCase();
    if (["yes", "confirmed", "true"].includes(normalized)) return "Yes";
    if (["n/a", "na", "not_applicable"].includes(normalized)) return "N/A";
  }

  return "Pending";
};

const mapState = (value: unknown): Session["state"] => {
  const normalized = typeof value === "string" ? value.toLowerCase() : "";
  if (normalized === "completed") return "Completed";
  if (normalized === "settled") return "Settled";
  if (normalized === "disputed") return "Disputed";
  if (normalized === "missed") return "Missed";
  if (["unconfirmed", "pending_confirmation"].includes(normalized))
    return "Unconfirmed";
  return "Scheduled";
};

const mapType = (value: unknown): Session["type"] => {
  const normalized = typeof value === "string" ? value.toLowerCase() : "";
  if (normalized.includes("free")) return "Free Trial";
  if (normalized.includes("one")) return "One Time";
  return "Monthly";
};

export const mapBackendSessionToSession = (
  backendSession: unknown,
): Session => {
  const session = readObject(backendSession);

  return {
    id: readString(session.id, readString(session.session_id, "")),
    clientId: readString(session.client_id, ""),
    client: readPerson(session, "client"),
    trainer: readPerson(session, "trainer"),
    type: mapType(
      session.type ?? session.session_type ?? session.subscription_type,
    ),
    scheduled: formatScheduled(session),
    duration: formatDuration(session),
    amount: readNumber(session.amount),
    clientConf: mapConfirmation(
      session.clientConf ??
        session.client_confirmed ??
        session.client_confirmation ??
        session.client_joined,
    ),
    trainerConf: mapConfirmation(
      session.trainerConf ??
        session.trainer_confirmed ??
        session.trainer_confirmation ??
        session.trainer_joined,
    ),
    state: mapState(session.status ?? session.state),
    sortTimestamp: getSessionSortTimestamp(session),
  };
};

export const mapBackendSessionsResponse = (payload: unknown): Session[] => {
  const response = readObject(payload);
  const data = response.data ?? payload;
  const dataObject = readObject(data);
  const possibleList = Array.isArray(data)
    ? data
    : Array.isArray(dataObject.sessions)
      ? dataObject.sessions
      : Array.isArray(dataObject.bookings)
        ? dataObject.bookings
        : Array.isArray(dataObject.items)
          ? dataObject.items
          : Array.isArray(dataObject.results)
            ? dataObject.results
            : [];

  return possibleList
    .map(mapBackendSessionToSession)
    .filter((session) => session.id)
    .sort((a, b) => (b.sortTimestamp ?? 0) - (a.sortTimestamp ?? 0));
};
