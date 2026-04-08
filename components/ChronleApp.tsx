"use client";

import { useEffect, useMemo, useState } from "react";
import { allEvents } from "@/data/events";
import { GuessHistory } from "@/components/GuessHistory";
import { GuessInput } from "@/components/GuessInput";
import { HowToPlayModal } from "@/components/HowToPlayModal";
import { ResultModal } from "@/components/ResultModal";
import { StatsModal } from "@/components/StatsModal";
import { TriviaChoices } from "@/components/TriviaChoices";
import { getCustomDailyPuzzle, getDailyPuzzle, getNextCentralMidnightCountdown } from "@/lib/daily";
import { evaluateGuess, getEventPool, getUnlimitedPuzzle, getDailyDateKey, maxGuesses } from "@/lib/game";
import { parseYear } from "@/lib/parseYear";
import { buildShareText } from "@/lib/share";
import { getTriviaQuestion } from "@/lib/trivia";
import {
  defaultStats,
  loadDailyProgress,
  loadRecentTriviaIds,
  loadRecentUnlimitedIds,
  loadStats,
  saveDailyProgress,
  saveRecentTriviaIds,
  saveRecentUnlimitedIds,
  saveStats,
  updateStatsFromGame
} from "@/lib/storage";
import type { Category, DailyProgress, Difficulty, GameSession, HistoricalEvent, PuzzleFilters, TriviaGameSession } from "@/lib/types";

const initialFilters: PuzzleFilters = {
  category: "Mixed",
  difficulty: "Any"
};

const countdownFormatter = new Intl.NumberFormat("en-US", { minimumIntegerDigits: 2 });

function eventById(id: string) {
  return allEvents.find((event) => event.id === id) ?? allEvents[0];
}

function formatCountdown(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${countdownFormatter.format(hours)}:${countdownFormatter.format(minutes)}:${countdownFormatter.format(seconds)}`;
}

type ChronleAppProps = {
  initialDailyDate: string;
  initialDailyId: string;
};

export function ChronleApp({ initialDailyDate, initialDailyId }: ChronleAppProps) {
  const [filters, setFilters] = useState<PuzzleFilters>(initialFilters);
  const [session, setSession] = useState<GameSession | null>(null);
  const [stats, setStats] = useState(defaultStats());
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [dailyDate, setDailyDate] = useState(initialDailyDate);
  const [dailyEvent, setDailyEvent] = useState<HistoricalEvent>(() => eventById(initialDailyId));
  const [dailyProgress, setDailyProgress] = useState<DailyProgress | null>(null);
  const [resultOpen, setResultOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [countdownText, setCountdownText] = useState(formatCountdown(getNextCentralMidnightCountdown(new Date(), getDailyDateKey)));
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    setStats(loadStats());
    const savedProgress = loadDailyProgress(dailyDate);
    setDailyProgress(savedProgress && savedProgress.eventId === dailyEvent.id ? savedProgress : null);
  }, [dailyDate, dailyEvent.id]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdownText(formatCountdown(getNextCentralMidnightCountdown(new Date(), getDailyDateKey)));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const browserDateKey = getDailyDateKey();
    const browserOverride = getCustomDailyPuzzle(browserDateKey);

    if (browserOverride) {
      setDailyDate(browserDateKey);
      setDailyEvent(browserOverride);
      return;
    }

    fetch("/api/daily")
      .then((response) => response.json())
      .then((payload: { date: string; eventId: string }) => {
        setDailyDate(payload.date);
        setDailyEvent(eventById(payload.eventId));
      })
      .catch(() => {
        const fallbackDate = getDailyDateKey();
        setDailyDate(fallbackDate);
        setDailyEvent(getDailyPuzzle(fallbackDate));
      });
  }, []);

  const dailyCompleted =
    dailyProgress?.date === dailyDate &&
    dailyProgress.eventId === dailyEvent.id &&
    dailyProgress.completed;
  const todaysPoolCount = useMemo(() => getEventPool(filters).length, [filters]);

  function persistStats(nextStats: typeof stats) {
    setStats(nextStats);
    saveStats(nextStats);
  }

  function beginYearSession(mode: "daily" | "unlimited", event: HistoricalEvent, activeFilters: PuzzleFilters) {
    setInputValue("");
    setInputError("");
    setShareMessage("");
    setResultOpen(false);

    setSession({
      kind: "year",
      mode,
      dailyDate: mode === "daily" ? dailyDate : undefined,
      event,
      filters: activeFilters,
      guesses: [],
      completed: false,
      startedAt: Date.now()
    });
  }

  function beginTriviaSession() {
    const recentIds = loadRecentTriviaIds();
    const question = getTriviaQuestion(recentIds);
    saveRecentTriviaIds([...recentIds, question.id]);
    setInputValue("");
    setInputError("");
    setShareMessage("");
    setResultOpen(false);

    const triviaSession: TriviaGameSession = {
      kind: "trivia",
      mode: "trivia",
      question,
      filters: { category: question.category, difficulty: "Any" },
      guesses: [],
      completed: false,
      startedAt: Date.now()
    };

    setSession(triviaSession);
  }

  function startDailyGame() {
    if (dailyCompleted) {
      setResultOpen(true);
      return;
    }

    const restored = loadDailyProgress(dailyDate);
    if (restored && !restored.completed && restored.eventId === dailyEvent.id) {
      setInputValue("");
      setInputError("");
      setShareMessage("");
      setSession({
        kind: "year",
        mode: "daily",
        dailyDate,
        event: dailyEvent,
        filters: restored.filters,
        guesses: restored.guesses,
        completed: false,
        startedAt: Date.now()
      });
      return;
    }

    beginYearSession("daily", dailyEvent, { category: "Mixed", difficulty: "Any" });
  }

  function appendEraSuffix(suffix: " BC" | " AD") {
    setInputValue((current) => {
      const trimmed = current.trim();
      const withoutEra = trimmed.replace(/\s+(BC|BCE|AD|CE)$/i, "");
      return withoutEra ? `${withoutEra}${suffix}` : current;
    });
  }

  function startUnlimitedGame() {
    const recentIds = loadRecentUnlimitedIds();
    const event = getUnlimitedPuzzle(filters, recentIds);
    saveRecentUnlimitedIds([...recentIds, event.id]);
    beginYearSession("unlimited", event, filters);
  }

  function startTriviaGame() {
    beginTriviaSession();
  }

  function finishSession(nextSession: GameSession) {
    setSession(nextSession);
    setResultOpen(true);

    const nextStats = updateStatsFromGame(stats, {
      mode: nextSession.mode,
      category: nextSession.kind === "trivia" ? nextSession.question.category : nextSession.filters.category,
      won: nextSession.result === "win",
      guessesUsed: nextSession.guesses.length,
      date: nextSession.kind === "year" ? nextSession.dailyDate : undefined,
      eventId: nextSession.kind === "trivia" ? nextSession.question.id : nextSession.event.id
    });

    persistStats(nextStats);

    if (nextSession.kind === "year" && nextSession.mode === "daily" && nextSession.dailyDate) {
      const progress: DailyProgress = {
        date: nextSession.dailyDate,
        eventId: nextSession.event.id,
        completed: true,
        result: nextSession.result,
        guesses: nextSession.guesses,
        finishedAt: nextSession.finishedAt,
        filters: nextSession.filters
      };
      setDailyProgress(progress);
      saveDailyProgress(progress);
    }
  }

  function submitGuess() {
    if (!session || session.kind !== "year" || session.completed) {
      return;
    }

    const parsed = parseYear(inputValue);
    if (!parsed.valid) {
      setInputError(parsed.error);
      return;
    }

    if (session.guesses.some((guess) => guess.guess === parsed.year)) {
      setInputError("You already tried that year.");
      return;
    }

    const feedback = evaluateGuess(parsed.year, session.event, session.guesses.at(-1));
    const guesses = [...session.guesses, feedback];
    const won = feedback.isCorrect;
    const lost = guesses.length >= maxGuesses && !won;

    setInputError("");
    setInputValue("");

    const nextSession: GameSession = {
      ...session,
      guesses,
      completed: won || lost,
      result: won ? "win" : lost ? "loss" : undefined,
      finishedAt: won || lost ? Date.now() : undefined
    };

    setSession(nextSession);

    if (nextSession.mode === "daily" && nextSession.dailyDate) {
      const progress: DailyProgress = {
        date: nextSession.dailyDate,
        eventId: nextSession.event.id,
        completed: nextSession.completed,
        result: nextSession.result,
        guesses: nextSession.guesses,
        finishedAt: nextSession.finishedAt,
        filters: nextSession.filters
      };
      setDailyProgress(progress);
      saveDailyProgress(progress);
    }

    if (won || lost) {
      finishSession(nextSession);
    }
  }

  function submitTriviaAnswer(answer: string) {
    if (!session || session.kind !== "trivia" || session.completed) {
      return;
    }

    const isCorrect = answer === session.question.answer;
    const nextSession: TriviaGameSession = {
      ...session,
      guesses: [{ selectedAnswer: answer, isCorrect }],
      completed: true,
      result: isCorrect ? "win" : "loss",
      finishedAt: Date.now()
    };

    finishSession(nextSession);
  }

  async function handleShare() {
    const shareSession =
      session && session.completed
        ? session
        : dailyCompleted && dailyProgress
          ? {
              kind: "year" as const,
              mode: "daily" as const,
              dailyDate,
              event: dailyEvent,
              filters: dailyProgress.filters,
              guesses: dailyProgress.guesses,
              completed: true,
              result: dailyProgress.result,
              startedAt: dailyProgress.finishedAt ?? Date.now(),
              finishedAt: dailyProgress.finishedAt
            }
          : null;

    if (!shareSession) {
      return;
    }

    const text = buildShareText(shareSession);

    try {
      await navigator.clipboard.writeText(text);
      setShareMessage("Copied to clipboard.");
    } catch {
      setShareMessage(text);
    }
  }

  const displayResultSession =
    session && session.completed
      ? session
      : dailyCompleted && dailyProgress
        ? {
            kind: "year" as const,
            mode: "daily" as const,
            dailyDate,
            event: dailyEvent,
            filters: dailyProgress.filters,
            guesses: dailyProgress.guesses,
            completed: true,
            result: dailyProgress.result,
            startedAt: dailyProgress.finishedAt ?? Date.now(),
            finishedAt: dailyProgress.finishedAt
          }
        : null;

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
      <header className="rounded-[32px] border border-white/10 bg-[rgba(10,20,32,0.9)] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-200">Yearsy</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Guess history by the year.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
              One event. Six guesses. Higher or lower hints, simple closeness feedback, and a daily puzzle shared by everyone.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-100"
              onClick={() => setHelpOpen(true)}
            >
              How to Play
            </button>
            <button
              type="button"
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-100"
              onClick={() => setStatsOpen(true)}
            >
              Stats
            </button>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">Daily Puzzle</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Same puzzle for everyone</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Complete today's event once, keep the streak alive, then jump into unlimited play.
            </p>
            <div className="mt-4 rounded-[24px] border border-white/10 bg-slate-950/40 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Status</p>
              <p className="mt-2 text-lg font-semibold text-white">
                {dailyCompleted ? "Solved for today" : "Ready to play"}
              </p>
              <p className="mt-2 text-sm text-slate-300">Next daily in {countdownText}</p>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                className="flex-1 rounded-full bg-cyan-300 px-5 py-3 font-semibold text-slate-950"
                onClick={startDailyGame}
              >
                {dailyCompleted ? "View Today" : "Play Daily"}
              </button>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">Unlimited Mode</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Build your own run</h2>
            <div className="mt-4 space-y-4">
              <label className="block text-sm text-slate-300">
                Category
                <select
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white"
                  value={filters.category}
                  onChange={(event) =>
                    setFilters((current) => ({ ...current, category: event.target.value as Category }))
                  }
                >
                  {["Mixed", "World History", "U.S. History", "Science & Inventions", "Pop Culture", "Sports"].map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm text-slate-300">
                Difficulty
                <select
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white"
                  value={filters.difficulty}
                  onChange={(event) =>
                    setFilters((current) => ({
                      ...current,
                      difficulty: event.target.value as Difficulty | "Any"
                    }))
                  }
                >
                  {["Any", "Easy", "Medium", "Hard"].map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </label>
              <div className="rounded-[24px] border border-white/10 bg-slate-950/40 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Available events</p>
                <p className="mt-2 text-2xl font-semibold text-white">{todaysPoolCount}</p>
              </div>
              <button
                type="button"
                className="w-full rounded-full bg-amber-300 px-5 py-3 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
                disabled={todaysPoolCount === 0}
                onClick={startUnlimitedGame}
              >
                Start Unlimited
              </button>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">Trivia Mode</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">General multiple choice</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Switch out of dates for a quick four-option trivia round. One question, one pick, instant result.
            </p>
            <div className="mt-4 rounded-[24px] border border-white/10 bg-slate-950/40 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Format</p>
              <p className="mt-2 text-lg font-semibold text-white">4 answer choices</p>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                className="flex-1 rounded-full bg-emerald-300 px-5 py-3 font-semibold text-slate-950"
                onClick={startTriviaGame}
              >
                Start Trivia
              </button>
            </div>
          </div>
        </aside>

        <section className="rounded-[32px] border border-white/10 bg-[rgba(10,20,32,0.82)] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.3)]">
          {session ? (
            <div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-200">
                    {session.kind === "trivia" ? "Trivia" : session.mode === "daily" ? "Daily" : "Unlimited"}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-slate-200">
                    {session.kind === "trivia" ? session.question.category : session.event.category}
                  </span>
                  {session.kind === "year" ? (
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-slate-200">
                      {session.event.difficulty}
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white">
                  {session.kind === "trivia" ? session.question.prompt : session.event.title}
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-300">
                  {session.kind === "trivia"
                    ? "Choose one of the four answers below."
                    : session.event.description}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      {session.kind === "trivia" ? "Question type" : "Guesses left"}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {session.kind === "trivia" ? "Multiple choice" : maxGuesses - session.guesses.length}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Current streak</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{stats.currentStreak}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      {session.kind === "trivia" ? "Round format" : "Daily reset"}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {session.kind === "trivia" ? "1 question" : countdownText}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                {session.kind === "year" ? (
                  <GuessInput
                    value={inputValue}
                    onChange={setInputValue}
                    onSubmit={submitGuess}
                    onQuickFill={appendEraSuffix}
                    error={inputError}
                    disabled={session.completed}
                  />
                ) : (
                  <TriviaChoices
                    choices={session.question.choices}
                    selectedAnswer={session.guesses[0]?.selectedAnswer}
                    correctAnswer={session.question.answer}
                    completed={session.completed}
                    onSelect={submitTriviaAnswer}
                  />
                )}
              </div>

              <div className="mt-6">
                {session.kind === "year" ? (
                  session.guesses.length === 0 ? (
                    <div className="rounded-[28px] border border-dashed border-white/10 bg-white/5 p-8 text-center text-slate-400">
                      Start with your best guess. Yearsy will tell you whether to go earlier or later.
                    </div>
                  ) : (
                    <GuessHistory guesses={session.guesses} />
                  )
                ) : session.guesses.length === 0 ? (
                  <div className="rounded-[28px] border border-dashed border-white/10 bg-white/5 p-8 text-center text-slate-400">
                    Pick the answer you think is right. Trivia mode resolves after one choice.
                  </div>
                ) : (
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Your answer</p>
                    <p className="mt-2 text-xl font-semibold text-white">{session.guesses[0].selectedAnswer}</p>
                    <p className="mt-3 text-sm text-slate-300">
                      {session.guesses[0].isCorrect ? "Correct choice." : "Not quite. Open the result for the full explanation."}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-full border border-white/10 px-5 py-3 font-semibold text-slate-100"
                  onClick={() => setSession(null)}
                >
                  Home
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/10 px-5 py-3 font-semibold text-slate-100"
                  onClick={session.kind === "trivia" ? startTriviaGame : startUnlimitedGame}
                >
                  {session.kind === "trivia" ? "New Trivia" : "New Unlimited"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[560px] flex-col justify-between rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">Ready</p>
                <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                  Pick a mode, then jump into either timeline guessing or fast trivia.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                  Yearsy now has two ways to play: the core year-guessing game and a quick multiple-choice trivia mode.
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  ["Later", "Your guess was too early."],
                  ["Earlier", "Your guess was too late."],
                  ["Trivia", "Or switch to a four-choice question when you want a faster, broader trivia round."]
                ].map(([title, text]) => (
                  <div key={title} className="rounded-[24px] border border-white/10 bg-slate-950/40 p-5">
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-950/40 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Today&apos;s daily</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{dailyEvent.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {dailyCompleted
                    ? "You already wrapped today's daily. Open the summary or jump into unlimited mode."
                    : "Today's event is waiting. Everyone gets the same puzzle on the same day."}
                </p>
              </div>
            </div>
          )}
        </section>
      </section>

      <ResultModal
        open={resultOpen}
        session={displayResultSession}
        countdown={countdownText}
        shareMessage={shareMessage}
        onClose={() => setResultOpen(false)}
        onShare={handleShare}
        onPlayUnlimited={() => {
          setResultOpen(false);
          if (displayResultSession?.kind === "trivia") {
            startTriviaGame();
          } else {
            startUnlimitedGame();
          }
        }}
      />
      <StatsModal open={statsOpen} stats={stats} onClose={() => setStatsOpen(false)} />
      <HowToPlayModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </main>
  );
}
