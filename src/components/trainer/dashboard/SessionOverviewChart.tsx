"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Session } from "@/components/adminSessions/session";
import { buildMonthlySessionChart } from "@/lib/trainer-dashboard/chart-data";
import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from "@/components/ui/EmptyState";
import { cn } from "@/utils";

type ChartTab = "completed" | "upcoming";

export function SessionOverviewChart({
  sessions,
  className,
}: {
  sessions: Session[];
  className?: string;
}) {
  const [tab, setTab] = useState<ChartTab>("completed");

  const chartData = useMemo(
    () => buildMonthlySessionChart(sessions, tab),
    [sessions, tab],
  );

  const hasData = chartData.some((d) => d.value > 0);

  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col rounded-[12px] border border-gray-100 bg-white shadow-sm",
        className,
      )}
    >
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
        <h3 className="text-sm font-semibold text-gray-900">
          Session Overview
        </h3>
        <div className="flex rounded-[8px] bg-gray-100 p-0.5">
          {(["completed", "upcoming"] as ChartTab[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                "rounded-[6px] px-3 py-1 text-xs font-medium capitalize transition-colors",
                tab === key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {!hasData ? (
          <EmptyState
            imageSrc={EMPTY_STATE_IMAGE_PATHS.sessions}
            imageAlt="No session data"
            title="No session activity yet"
            description="Your monthly session chart will populate once you complete or book sessions."
            className="flex-1 py-6"
          />
        ) : (
          <div className="flex min-h-0 flex-1 px-2 pb-4 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="sessionFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0b4d8d" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#0b4d8d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #f3f4f6",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0b4d8d"
                  strokeWidth={2}
                  fill="url(#sessionFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
