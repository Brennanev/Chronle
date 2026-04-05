export const categories = [
  "World History",
  "U.S. History",
  "Science & Inventions",
  "Pop Culture",
  "Sports",
  "Mixed"
] as const;

export const eventCategories = [
  "World History",
  "U.S. History",
  "Science & Inventions",
  "Pop Culture",
  "Sports"
] as const;

export const difficulties = ["Easy", "Medium", "Hard"] as const;

export type Category = (typeof categories)[number];
export type EventCategory = (typeof eventCategories)[number];
export type Difficulty = (typeof difficulties)[number];
export type GameMode = "daily" | "unlimited";
export type Closeness = "Exact" | "Very close" | "Close" | "Not close";
export type Direction = "earlier" | "later" | "exact";
export type Temperature = "warmer" | "colder" | "same";

export type HistoricalEvent = {
  id: string;
  title: string;
  description: string;
  year: number;
  category: EventCategory;
  difficulty: Difficulty;
  region?: string;
  sourceNote?: string;
  explanation: string;
  acceptedYearRange?: [number, number];
  imageUrl?: string;
};

export type PublicPuzzle = Pick<
  HistoricalEvent,
  "id" | "title" | "description" | "category" | "difficulty" | "explanation" | "acceptedYearRange"
>;

export type PuzzleFilters = {
  category: Category;
  difficulty: Difficulty | "Any";
};

export type GuessFeedback = {
  guess: number;
  formattedGuess: string;
  direction: Direction;
  distance: number;
  closeness: Closeness;
  temperature?: Temperature;
  isCorrect: boolean;
};

export type GameResult = "win" | "loss";

export type GameSession = {
  mode: GameMode;
  dailyDate?: string;
  event: HistoricalEvent;
  filters: PuzzleFilters;
  guesses: GuessFeedback[];
  completed: boolean;
  result?: GameResult;
  startedAt: number;
  finishedAt?: number;
};

export type DailyProgress = {
  date: string;
  eventId: string;
  completed: boolean;
  result?: GameResult;
  guesses: GuessFeedback[];
  sharedAt?: number;
  finishedAt?: number;
  filters: PuzzleFilters;
};

export type PlayerStats = {
  gamesPlayed: number;
  wins: number;
  currentStreak: number;
  bestStreak: number;
  averageGuesses: number;
  dailyWins: number;
  unlimitedWins: number;
  categoryBreakdown: Record<Category, { played: number; wins: number }>;
  dailyHistory: Array<{
    date: string;
    eventId: string;
    result: GameResult;
    guesses: number;
  }>;
};
