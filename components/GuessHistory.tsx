import type { GuessFeedback } from "@/lib/types";

const arrowByDirection = {
  earlier: "Down",
  later: "Up",
  exact: "Correct"
} as const;

const badgeByCloseness = {
  Exact: "bg-emerald-400/20 text-emerald-200 border-emerald-300/20",
  "Very close": "bg-lime-400/20 text-lime-200 border-lime-300/20",
  Close: "bg-sky-400/20 text-sky-200 border-sky-300/20",
  "Not close": "bg-rose-400/20 text-rose-100 border-rose-300/20"
};

const tempLabel = {
  warmer: "Warmer",
  colder: "Colder",
  same: "Same"
} as const;

type GuessHistoryProps = {
  guesses: GuessFeedback[];
};

export function GuessHistory({ guesses }: GuessHistoryProps) {
  return (
    <div className="space-y-3">
      {guesses.map((guess, index) => (
        <div
          key={`${guess.guess}-${index}`}
          className="grid grid-cols-[minmax(0,1fr)_72px] gap-3 rounded-[24px] border border-white/10 bg-white/5 p-4 sm:grid-cols-[140px_90px_150px_120px]"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Guess</p>
            <p className="mt-1 text-lg font-semibold text-white">{guess.formattedGuess}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Hint</p>
            <p className="mt-1 text-lg font-semibold text-cyan-200">{arrowByDirection[guess.direction]}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Closeness</p>
            <span
              className={`mt-2 inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${badgeByCloseness[guess.closeness]}`}
            >
              {guess.closeness}
            </span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Temp</p>
            <p className="mt-1 text-lg font-semibold text-slate-100">
              {guess.temperature ? tempLabel[guess.temperature] : "-"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
