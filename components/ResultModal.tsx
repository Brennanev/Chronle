"use client";

import { formatYear } from "@/lib/parseYear";
import type { GameSession } from "@/lib/types";

type ResultModalProps = {
  open: boolean;
  session: GameSession | null;
  countdown: string;
  shareMessage: string;
  onClose: () => void;
  onShare: () => void;
  onPlayUnlimited: () => void;
};

export function ResultModal({
  open,
  session,
  countdown,
  shareMessage,
  onClose,
  onShare,
  onPlayUnlimited
}: ResultModalProps) {
  if (!open || !session) {
    return null;
  }

  const won = session.result === "win";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-slate-950/95 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">
              {session.mode === "daily" ? "Daily Result" : "Unlimited Result"}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              {won ? "Locked it in." : "Out of guesses."}
            </h2>
          </div>
          <button
            type="button"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-5">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Correct year</p>
          <p className="mt-2 text-4xl font-semibold text-cyan-200">{formatYear(session.event.year)}</p>
          <p className="mt-4 text-base leading-7 text-slate-200">{session.event.explanation}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-full bg-cyan-300 px-5 py-3 font-semibold text-slate-950"
            onClick={onShare}
          >
            Share Result
          </button>
          <button
            type="button"
            className="rounded-full border border-white/10 px-5 py-3 font-semibold text-slate-100"
            onClick={onPlayUnlimited}
          >
            Play Unlimited
          </button>
        </div>

        <div className="mt-4 text-sm text-slate-300">
          {shareMessage ? <p>{shareMessage}</p> : null}
          {session.mode === "daily" ? <p>Next daily in {countdown}</p> : null}
        </div>
      </div>
    </div>
  );
}
