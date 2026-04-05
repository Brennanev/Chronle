"use client";

type GuessInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onQuickFill?: (suffix: " BC" | " AD") => void;
  disabled?: boolean;
  error?: string;
};

export function GuessInput({ value, onChange, onSubmit, onQuickFill, disabled, error }: GuessInputProps) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.2)]">
      <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="guess-year">
        Enter a year
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="guess-year"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="1989 or 44 BC"
          className="min-h-14 flex-1 rounded-2xl border border-white/10 bg-slate-950/50 px-4 text-lg text-white outline-none transition focus:border-cyan-300"
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onSubmit();
            }
          }}
        />
        <button
          type="button"
          disabled={disabled}
          className="min-h-14 rounded-2xl bg-cyan-300 px-5 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
          onClick={onSubmit}
        >
          Lock Guess
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={disabled}
          className="rounded-full border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200 disabled:cursor-not-allowed disabled:text-slate-500"
          onClick={() => onQuickFill?.(" BC")}
        >
          Add BC
        </button>
        <button
          type="button"
          disabled={disabled}
          className="rounded-full border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200 disabled:cursor-not-allowed disabled:text-slate-500"
          onClick={() => onQuickFill?.(" AD")}
        >
          Add AD
        </button>
      </div>
      <p className="mt-3 min-h-5 text-sm text-rose-300">{error ?? ""}</p>
    </div>
  );
}
