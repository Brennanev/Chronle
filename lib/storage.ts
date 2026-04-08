import { categories, type Category, type DailyProgress, type GameMode, type GameResult, type PlayerStats } from "@/lib/types";

const STATS_KEY = "yearsy-stats";
const DAILY_PROGRESS_KEY = "yearsy-daily-progress";
const RECENT_UNLIMITED_KEY = "yearsy-recent-unlimited";
const RECENT_TRIVIA_KEY = "yearsy-recent-trivia";

function storageAvailable() {
  try {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  } catch {
    return false;
  }
}

function defaultCategoryBreakdown() {
  return categories.reduce((accumulator, category) => {
    accumulator[category] = { played: 0, wins: 0 };
    return accumulator;
  }, {} as Record<Category, { played: number; wins: number }>);
}

export function defaultStats(): PlayerStats {
  return {
    gamesPlayed: 0,
    wins: 0,
    currentStreak: 0,
    bestStreak: 0,
    triviaCurrentStreak: 0,
    triviaBestStreak: 0,
    averageGuesses: 0,
    averageStars: 0,
    dailyWins: 0,
    unlimitedWins: 0,
    triviaWins: 0,
    categoryBreakdown: defaultCategoryBreakdown(),
    dailyHistory: []
  };
}

export function loadStats() {
  if (!storageAvailable()) {
    return defaultStats();
  }

  try {
    const raw = window.localStorage.getItem(STATS_KEY);
    if (!raw) {
      return defaultStats();
    }

    return {
      ...defaultStats(),
      ...JSON.parse(raw)
    } as PlayerStats;
  } catch {
    return defaultStats();
  }
}

export function saveStats(stats: PlayerStats) {
  if (!storageAvailable()) {
    return;
  }

  window.localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function loadDailyProgress(date: string) {
  if (!storageAvailable()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(`${DAILY_PROGRESS_KEY}-${date}`);
    return raw ? (JSON.parse(raw) as DailyProgress) : null;
  } catch {
    return null;
  }
}

export function saveDailyProgress(progress: DailyProgress) {
  if (!storageAvailable()) {
    return;
  }

  window.localStorage.setItem(`${DAILY_PROGRESS_KEY}-${progress.date}`, JSON.stringify(progress));
}

export function loadRecentUnlimitedIds() {
  if (!storageAvailable()) {
    return [] as string[];
  }

  try {
    const raw = window.localStorage.getItem(RECENT_UNLIMITED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveRecentUnlimitedIds(ids: string[]) {
  if (!storageAvailable()) {
    return;
  }

  window.localStorage.setItem(RECENT_UNLIMITED_KEY, JSON.stringify(ids.slice(-10)));
}

export function loadRecentTriviaIds() {
  if (!storageAvailable()) {
    return [] as string[];
  }

  try {
    const raw = window.localStorage.getItem(RECENT_TRIVIA_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveRecentTriviaIds(ids: string[]) {
  if (!storageAvailable()) {
    return;
  }

  window.localStorage.setItem(RECENT_TRIVIA_KEY, JSON.stringify(ids.slice(-10)));
}

export function updateStatsFromGame(
  stats: PlayerStats,
  params: {
    mode: GameMode;
    category: Category;
    won: boolean;
    guessesUsed: number;
    starsEarned?: number;
    date?: string;
    eventId: string;
  }
) {
  const next = structuredClone(stats);
  next.gamesPlayed += 1;
  next.categoryBreakdown[params.category].played += 1;

  if (params.won) {
    next.wins += 1;
    next.currentStreak += 1;
    next.bestStreak = Math.max(next.bestStreak, next.currentStreak);
    next.categoryBreakdown[params.category].wins += 1;
    if (params.mode === "daily") {
      next.dailyWins += 1;
      next.triviaCurrentStreak = 0;
    } else if (params.mode === "unlimited") {
      next.unlimitedWins += 1;
      next.triviaCurrentStreak = 0;
    } else {
      next.triviaWins += 1;
      next.triviaCurrentStreak += 1;
      next.triviaBestStreak = Math.max(next.triviaBestStreak, next.triviaCurrentStreak);
    }
  } else {
    next.currentStreak = 0;
    if (params.mode === "trivia") {
      next.triviaCurrentStreak = 0;
    }
  }

  next.averageGuesses =
    next.wins === 0
      ? 0
      : Number((((stats.averageGuesses * stats.wins) + (params.won ? params.guessesUsed : 0)) / next.wins).toFixed(2));

  const yearModeWin = params.won && (params.mode === "daily" || params.mode === "unlimited");
  const yearWinsBefore = stats.dailyWins + stats.unlimitedWins;
  const yearWinsAfter = yearWinsBefore + (yearModeWin ? 1 : 0);
  next.averageStars =
    yearWinsAfter === 0
      ? 0
      : Number(
          (
            ((stats.averageStars || 0) * yearWinsBefore + (yearModeWin ? (params.starsEarned ?? 0) : 0)) /
            yearWinsAfter
          ).toFixed(2)
        );

  if (params.mode === "daily" && params.date) {
    const result: GameResult = params.won ? "win" : "loss";
    next.dailyHistory = [
      { date: params.date, eventId: params.eventId, result, guesses: params.guessesUsed },
      ...next.dailyHistory.filter((entry) => entry.date !== params.date)
    ].slice(0, 90);
  }

  return next;
}
