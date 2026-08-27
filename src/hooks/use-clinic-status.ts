import { useEffect, useState } from "react";

import {
  SUNDAY_CLOSES_MINUTES,
  SUNDAY_OPENS_MINUTES,
  WEEKDAY_CLOSES_MINUTES,
  WEEKDAY_OPENS_MINUTES,
} from "@/lib/clinic";

export type ClinicStatus = {
  /** 0 = Sunday, matching Date#getDay and the HOURS table. */
  day: number;
  open: boolean;
  label: string;
};

const DAYS: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function readLagosClock() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const lookup: Record<string, string> = {};
  for (const part of parts) lookup[part.type] = part.value;

  return {
    day: DAYS[lookup.weekday] ?? 0,
    minutes: Number(lookup.hour) * 60 + Number(lookup.minute),
  };
}

/** Sunday keeps its own shorter, later window; every other day shares one. */
function windowFor(day: number) {
  return day === 0
    ? { opens: SUNDAY_OPENS_MINUTES, closes: SUNDAY_CLOSES_MINUTES }
    : { opens: WEEKDAY_OPENS_MINUTES, closes: WEEKDAY_CLOSES_MINUTES };
}

/** 510 -> "8:30am", 1200 -> "8pm" (on-the-hour times drop the ":00"). */
function formatMinutes(totalMinutes: number) {
  let hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const period = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12;
  return minute === 0 ? `${hour}${period}` : `${hour}:${String(minute).padStart(2, "0")}${period}`;
}

function describe(day: number, minutes: number): ClinicStatus {
  const { opens, closes } = windowFor(day);
  const open = minutes >= opens && minutes < closes;

  if (open) {
    return { day, open, label: `Open now - closes ${formatMinutes(closes)}` };
  }

  if (minutes < opens) {
    return { day, open, label: `Closed - opens ${formatMinutes(opens)}` };
  }

  // Already past today's window. The next one is tomorrow's, which may run
  // a different schedule -- this is what makes a Saturday-evening visitor
  // correctly see "opens 3pm" (Sunday's time) rather than a Monday time.
  const next = windowFor((day + 1) % 7);
  return { day, open, label: `Closed- opens ${formatMinutes(next.opens)} tomorrow` };
}

/**
 * Clock-dependent, so it stays null through SSR and the first paint to keep
 * server and client markup identical. Callers show a neutral placeholder.
 */
export function useClinicStatus(): ClinicStatus | null {
  const [status, setStatus] = useState<ClinicStatus | null>(null);

  useEffect(() => {
    const sync = () => {
      const { day, minutes } = readLagosClock();
      setStatus(describe(day, minutes));
    };

    sync();
    const timer = window.setInterval(sync, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return status;
}