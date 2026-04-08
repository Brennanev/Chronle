"use client";

type HowToPlayModalProps = {
  open: boolean;
  onClose: () => void;
};

export function HowToPlayModal({ open, onClose }: HowToPlayModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-slate-950/95 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">How to Play</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Guess the year in six tries</h2>
          </div>
          <button
            type="button"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="mt-6 space-y-4 text-base leading-7 text-slate-200">
          <p>Each round gives you one historical event. Your job is to name the year it happened.</p>
          <p>After every guess, Yearsy tells you whether the answer is earlier or later, whether you are very close, close, or not close, and whether the guess was warmer or colder than your previous try.</p>
          <p>Type years like <span className="font-semibold text-cyan-200">1989</span>, <span className="font-semibold text-cyan-200">44 BC</span>, or <span className="font-semibold text-cyan-200">476 AD</span>.</p>
          <p>Daily mode gives the same puzzle to everyone each day. Unlimited mode lets you keep going with category and difficulty filters.</p>
          <p>Trivia mode is separate from the date game: each round gives you one general knowledge question with four answer choices.</p>
        </div>
      </div>
    </div>
  );
}
