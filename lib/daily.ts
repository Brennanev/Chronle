import { allEvents } from "@/data/events";
import type { HistoricalEvent } from "@/lib/types";

const customDailyPuzzles: Record<string, HistoricalEvent> = {
  "2026-04-05": {
    id: "yearsy-custom-2026-04-05",
    title: "The year your favorite son was born.",
    description: "A special daily challenge with a personal answer.",
    year: 2000,
    category: "U.S. History",
    difficulty: "Easy",
    explanation: "Brennan Van Wey was born November 12, 2000."
  },
  "2026-04-06": {
    id: "yearsy-custom-2026-04-05",
    title: "The year your favorite son was born.",
    description: "A special daily challenge with a personal answer.",
    year: 2000,
    category: "U.S. History",
    difficulty: "Easy",
    explanation: "Brennan Van Wey was born November 12, 2000."
  }
};

function hashString(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

export function getDailyPool() {
  return allEvents.filter((event) => event.difficulty !== "Hard");
}

function getUtcDayIndex(dateKey: string) {
  const utc = new Date(`${dateKey}T00:00:00.000Z`);
  return Math.floor(utc.getTime() / 86400000);
}

export function getDailyPuzzle(dateKey: string): HistoricalEvent {
  const override = customDailyPuzzles[dateKey];

  if (override) {
    return override;
  }

  const pool = getDailyPool();
  const orderedPool = [...pool].sort((left, right) => {
    return hashString(`yearsy-sequence-${left.id}`) - hashString(`yearsy-sequence-${right.id}`);
  });
  const dailyIndex = getUtcDayIndex(dateKey) % orderedPool.length;
  return orderedPool[dailyIndex];
}

export function getNextUtcMidnightCountdown(now = new Date()) {
  const next = new Date(now);
  next.setUTCHours(24, 0, 0, 0);
  return next.getTime() - now.getTime();
}
