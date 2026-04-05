import type { GameSession, GuessFeedback } from "@/lib/types";

const directionEmoji: Record<GuessFeedback["direction"], string> = {
  earlier: "⬇️",
  later: "⬆️",
  exact: "✅"
};

export function formatGuessForShare(guess: GuessFeedback) {
  if (guess.isCorrect) {
    return "✅";
  }

  return `${directionEmoji[guess.direction]} ${guess.closeness}`;
}

export function buildShareText(session: GameSession) {
  const title =
    session.mode === "daily" && session.dailyDate
      ? `Chronle Daily ${session.dailyDate}`
      : `Chronle Unlimited • ${session.event.category}`;

  const lines = session.guesses.map(formatGuessForShare);
  const resultLine = session.result === "win" ? `${session.guesses.length}/6` : "X/6";
  return [title, ...lines, resultLine].join("\n");
}
