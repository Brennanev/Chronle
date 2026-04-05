import { allEvents } from "@/data/events";
import type { Category, Closeness, GuessFeedback, HistoricalEvent, PuzzleFilters, Temperature } from "@/lib/types";
import { formatYear } from "@/lib/parseYear";

export const maxGuesses = 6;

export function getUtcDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function acceptedRangeForEvent(event: HistoricalEvent) {
  return event.acceptedYearRange ?? [event.year, event.year];
}

export function isCorrectGuess(guess: number, event: HistoricalEvent) {
  const [min, max] = acceptedRangeForEvent(event);
  return guess >= min && guess <= max;
}

export function distanceToAnswer(guess: number, event: HistoricalEvent) {
  const [min, max] = acceptedRangeForEvent(event);

  if (guess < min) {
    return min - guess;
  }

  if (guess > max) {
    return guess - max;
  }

  return 0;
}

export function getDirection(guess: number, event: HistoricalEvent) {
  const [min, max] = acceptedRangeForEvent(event);

  if (guess < min) {
    return "later" as const;
  }

  if (guess > max) {
    return "earlier" as const;
  }

  return "exact" as const;
}

export function getCloseness(distance: number): Closeness {
  if (distance === 0) {
    return "Exact";
  }

  if (distance <= 5) {
    return "Very close";
  }

  if (distance <= 20) {
    return "Close";
  }

  return "Not close";
}

export function getTemperature(
  previousDistance: number | undefined,
  currentDistance: number
): Temperature | undefined {
  if (previousDistance === undefined) {
    return undefined;
  }

  if (currentDistance < previousDistance) {
    return "warmer";
  }

  if (currentDistance > previousDistance) {
    return "colder";
  }

  return "same";
}

export function evaluateGuess(
  guess: number,
  event: HistoricalEvent,
  previousGuess?: GuessFeedback
): GuessFeedback {
  const distance = distanceToAnswer(guess, event);
  const direction = getDirection(guess, event);

  return {
    guess,
    formattedGuess: formatYear(guess),
    direction,
    distance,
    closeness: getCloseness(distance),
    temperature: getTemperature(previousGuess?.distance, distance),
    isCorrect: isCorrectGuess(guess, event)
  };
}

export function getEventPool(filters: PuzzleFilters) {
  return allEvents.filter((event) => {
    const matchesCategory =
      filters.category === "Mixed" ? true : event.category === filters.category;
    const matchesDifficulty =
      filters.difficulty === "Any" ? true : event.difficulty === filters.difficulty;

    return matchesCategory && matchesDifficulty;
  });
}

export function getUnlimitedPuzzle(filters: PuzzleFilters, recentIds: string[]) {
  const pool = getEventPool(filters);
  const filteredPool = pool.filter((event) => !recentIds.includes(event.id));

  const source = filteredPool.length > 0 ? filteredPool : pool;
  const selected = source[Math.floor(Math.random() * source.length)] ?? allEvents[0];

  return selected;
}

export function difficultyLabel(event: HistoricalEvent) {
  return event.difficulty;
}

export function categoryBadge(category: Category) {
  return category === "Mixed" ? "Mixed timeline" : category;
}
