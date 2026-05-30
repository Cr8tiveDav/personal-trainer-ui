"use client";

import { useMemo, useState } from "react";
import { cn } from "@/utils";
import type { AvailabilitySlot } from "@/api/availability";
import { Time12HourSelect } from "@/components/availability/Time12HourSelect";
import { normalizeTime24, snapToTimeOption } from "@/lib/availability/time-12h";

import { WEEK_DAYS } from "@/lib/availability/week-days";

type DaySchedule = {
  enabled: boolean;
  startTime: string;
  endTime: string;
};

type DaySchedules = Record<number, DaySchedule>;

function getDefaultTimezone() {
  if (typeof window === "undefined") return "Africa/Lagos";
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "Africa/Lagos";
}

function formatTimezoneLabel(timezone: string) {
  if (!timezone) return "Not set";
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "long",
    }).formatToParts(new Date());
    const name = parts.find((p) => p.type === "timeZoneName")?.value;
    const city = timezone.split("/").pop()?.replace(/_/g, " ");
    if (name && city) return `${city} ${name}`;
    return timezone.replace(/_/g, " ");
  } catch {
    return timezone.replace(/_/g, " ");
  }
}

function createEmptyDaySchedules(): DaySchedules {
  return Object.fromEntries(
    WEEK_DAYS.map((d) => [
      d.value,
      { enabled: false, startTime: "", endTime: "" },
    ]),
  ) as DaySchedules;
}

function slotsToDaySchedules(slots: AvailabilitySlot[]): DaySchedules {
  const schedules = createEmptyDaySchedules();
  for (const slot of slots) {
    schedules[slot.day_of_week] = {
      enabled: true,
      startTime: snapToTimeOption(slot.start_time),
      endTime: snapToTimeOption(slot.end_time),
    };
  }
  return schedules;
}

function getInitialState(
  initialSlots: AvailabilitySlot[],
  existingSlots: AvailabilitySlot[],
) {
  const hasExisting = existingSlots.length > 0;
  const daySchedules = hasExisting
    ? createEmptyDaySchedules()
    : slotsToDaySchedules(initialSlots);
  const firstNew = WEEK_DAYS.find(
    (d) =>
      daySchedules[d.value].enabled &&
      !existingSlots.some((s) => s.day_of_week === d.value),
  );
  const firstEnabled = WEEK_DAYS.find((d) => daySchedules[d.value].enabled);

  return {
    daySchedules,
    selectedDay: (firstNew ?? firstEnabled)?.value ?? null,
    timezone:
      existingSlots[0]?.timezone ||
      initialSlots[0]?.timezone ||
      getDefaultTimezone(),
    isCurrentlyAvailable: hasExisting || initialSlots.length > 0,
  };
}

type AvailabilitySetupPanelProps = {
  /** Days already saved — disabled here; edit on the calendar instead. */
  existingSlots?: AvailabilitySlot[];
  /** Pre-fill the form when there is no saved schedule yet. */
  initialSlots?: AvailabilitySlot[];
  onSave: (availability: AvailabilitySlot[]) => void;
  isSaving?: boolean;
};

export function AvailabilitySetupPanel({
  existingSlots = [],
  initialSlots = [],
  onSave,
  isSaving = false,
}: AvailabilitySetupPanelProps) {
  const persistedDays = useMemo(
    () => new Set(existingSlots.map((s) => s.day_of_week)),
    [existingSlots],
  );
  const hasExisting = existingSlots.length > 0;

  const initial = getInitialState(initialSlots, existingSlots);
  const [daySchedules, setDaySchedules] = useState<DaySchedules>(
    initial.daySchedules,
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(
    initial.selectedDay,
  );
  const [timezone, setTimezone] = useState(initial.timezone);
  const [isCurrentlyAvailable, setIsCurrentlyAvailable] = useState(
    initial.isCurrentlyAvailable,
  );
  const [editingTimezone, setEditingTimezone] = useState(false);

  const selectedDayMeta = WEEK_DAYS.find((d) => d.value === selectedDay);
  const selectedSchedule =
    selectedDay !== null ? daySchedules[selectedDay] : null;
  const isSelectedPersisted =
    selectedDay !== null && persistedDays.has(selectedDay);

  function handleDayClick(dayValue: number) {
    if (persistedDays.has(dayValue)) return;

    const schedule = daySchedules[dayValue];

    if (schedule.enabled && selectedDay === dayValue) {
      setDaySchedules((prev) => ({
        ...prev,
        [dayValue]: { enabled: false, startTime: "", endTime: "" },
      }));
      setSelectedDay(null);
      return;
    }

    if (schedule.enabled) {
      setSelectedDay(dayValue);
      return;
    }

    setDaySchedules((prev) => ({
      ...prev,
      [dayValue]: { ...prev[dayValue], enabled: true },
    }));
    setSelectedDay(dayValue);
  }

  function updateSelectedDayTime(
    field: "startTime" | "endTime",
    value: string,
  ) {
    if (selectedDay === null || persistedDays.has(selectedDay)) return;
    setDaySchedules((prev) => ({
      ...prev,
      [selectedDay]: { ...prev[selectedDay], [field]: value },
    }));
  }

  function handleSave() {
    if (!timezone) return;

    const newDays: AvailabilitySlot[] = WEEK_DAYS.filter(
      (d) => daySchedules[d.value].enabled && !persistedDays.has(d.value),
    )
      .map((d) => ({
        day_of_week: d.value,
        start_time: normalizeTime24(daySchedules[d.value].startTime),
        end_time: normalizeTime24(daySchedules[d.value].endTime),
        timezone,
      }))
      .filter((slot) => slot.start_time && slot.end_time);

    if (newDays.length === 0) return;

    
      const availability = newDays


    onSave(availability);
  }

  const newDaysEnabled = WEEK_DAYS.filter(
    (d) => daySchedules[d.value].enabled && !persistedDays.has(d.value),
  );

  const allNewHaveTimes = newDaysEnabled.every((d) => {
    const s = daySchedules[d.value];
    return !!s.startTime && !!s.endTime;
  });

  const canSave =
    !isSaving && !!timezone && newDaysEnabled.length > 0 && allNewHaveTimes;

  return (
    <div className="flex flex-col lg:flex-row gap-0 bg-white rounded-[12px] border border-gray-100 overflow-hidden">
      <div className="flex-1 p-6 lg:border-r lg:border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">Working days</h3>
        <p className="text-xs text-gray-500 mt-1 mb-5">
          {hasExisting
            ? "Add new days here. Days already set are locked — edit those on the calendar below."
            : "Turn a day on, then set its hours. Each day can have different times."}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {WEEK_DAYS.map((day) => {
            const schedule = daySchedules[day.value];
            const isPersisted = persistedDays.has(day.value);
            const isActive = isPersisted || schedule.enabled;
            const isSelected = selectedDay === day.value && !isPersisted;

            return (
              <button
                key={day.value}
                type="button"
                disabled={isPersisted}
                title={
                  isPersisted
                    ? "Already set — edit on the calendar below"
                    : undefined
                }
                onClick={() => handleDayClick(day.value)}
                className={cn(
                  "flex min-w-[72px] flex-col items-center justify-center rounded-[8px] border px-3 py-3 transition-all",
                  isPersisted &&
                    "cursor-not-allowed border-[#0b4d8d]/30 bg-[#0b4d8d]/15 text-[#0b4d8d]",
                  !isPersisted &&
                    isActive &&
                    "bg-[#0b4d8d] border-[#0b4d8d] text-white shadow-sm",
                  !isPersisted &&
                    !isActive &&
                    "bg-[#f5f5f5] border-transparent text-gray-700 hover:bg-gray-100",
                  isSelected && "ring-2 ring-[#0b4d8d] ring-offset-2",
                )}
              >
                <span className="text-sm font-medium leading-none">
                  {day.label}
                </span>
                <span
                  className={cn(
                    "text-xs mt-1.5",
                    isPersisted
                      ? "text-[#0b4d8d]/80"
                      : isActive
                        ? "text-white/90"
                        : "text-gray-500",
                  )}
                >
                  {isPersisted ? "Set" : isActive ? "On" : "Off"}
                </span>
              </button>
            );
          })}
        </div>

        {selectedSchedule?.enabled &&
        selectedDayMeta &&
        !isSelectedPersisted ? (
          <div className="rounded-[8px] border border-gray-100 bg-gray-50/80 p-4 mb-6">
            <p className="text-xs font-semibold text-gray-700 mb-4">
              Hours for {selectedDayMeta.label}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl">
              <div>
                <label
                  htmlFor="availability-from"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Available from
                </label>
                <Time12HourSelect
                  id="availability-from"
                  value={selectedSchedule.startTime}
                  onChange={(v) => updateSelectedDayTime("startTime", v)}
                  maxTime={selectedSchedule.endTime || undefined}
                />
              </div>
              <div>
                <label
                  htmlFor="availability-until"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Available Until
                </label>
                <Time12HourSelect
                  id="availability-until"
                  value={selectedSchedule.endTime}
                  onChange={(v) => updateSelectedDayTime("endTime", v)}
                  minTime={selectedSchedule.startTime || undefined}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-500 mb-6">
            {hasExisting
              ? "Choose an open day above to add hours, or click a bar on the calendar to edit."
              : "Tap a day above to turn it on and set its hours."}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className="rounded-[8px] bg-[#0b4d8d] px-8 py-2.5 text-sm font-semibold text-white hover:bg-[#093e72] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving
              ? "Saving..."
              : hasExisting
                ? "Add days"
                : "Set Availability"}
          </button>
        </div>
      </div>

      <div className="w-full lg:w-[280px] shrink-0 p-6 bg-white flex flex-col gap-8 border-t lg:border-t-0 border-gray-100">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Currently available
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Toggle off to mark unavailable.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={isCurrentlyAvailable}
              onClick={() => setIsCurrentlyAvailable((v) => !v)}
              className={cn(
                "relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-[9999px] transition-colors focus:outline-none",
                isCurrentlyAvailable ? "bg-gray-900" : "bg-gray-200",
              )}
            >
              <span className="sr-only">Toggle availability</span>
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-[9999px] bg-white shadow transition-transform",
                  isCurrentlyAvailable ? "translate-x-6" : "translate-x-1",
                )}
              />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Time zone
          </h3>
          {editingTimezone ? (
            <div className="space-y-2">
              <input
                type="text"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full rounded-[8px] border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#0b4d8d]"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setEditingTimezone(false)}
                className="text-xs font-medium text-[#0b4d8d] hover:underline"
              >
                Done
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setEditingTimezone(true)}
              className="text-left text-sm text-gray-800 hover:text-[#0b4d8d] transition-colors"
            >
              {formatTimezoneLabel(timezone)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
