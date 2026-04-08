"use client";

import type { PlayerStats } from "@/lib/types";

type StatsModalProps = {
  open: boolean;
  stats: PlayerStats;
  onClose: () => void;
};

export function StatsModal({ open, stats, onClose }: StatsModalProps) {
  if (!open) {
    return null;
  }

  const winRate = stats.gamesPlayed === 0 ? 0 : Math.round((stats.wins / stats.gamesPlayed) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-[32px] border border-white/10 bg-slate-950/95 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">Stats</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Your Yearsy record</h2>
          </div>
          <button
            type="button"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["Games", stats.gamesPlayed],
            ["Wins", stats.wins],
            ["Win rate", `${winRate}%`],
            ["Current streak", stats.currentStreak],
            ["Best streak", stats.bestStreak],
            ["Avg guesses", stats.averageGuesses || "-"],
            ["Daily wins", stats.dailyWins],
            ["Unlimited wins", stats.unlimitedWins],
            ["Trivia wins", stats.triviaWins],
            ["Daily entries", stats.dailyHistory.length]
          ].map(([label, value]) => (
            <div key={label} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-5">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Category breakdown</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {Object.entries(stats.categoryBreakdown).map(([category, record]) => (
              <div key={category} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <p className="font-semibold text-white">{category}</p>
                <p className="mt-2 text-sm text-slate-300">
                  {record.wins} wins out of {record.played} played
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
