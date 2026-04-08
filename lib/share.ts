import type { GameSession, GuessFeedback } from "@/lib/types";

const directionLabel: Record<GuessFeedback["direction"], string> = {
  earlier: "Down",
  later: "Up",
  exact: "Correct"
};

export function formatGuessForShare(guess: GuessFeedback) {
  if (guess.isCorrect) {
    return "Correct";
  }

  return `${directionLabel[guess.direction]} ${guess.closeness}`;
}

export function buildShareText(session: GameSession) {
  if (session.kind === "trivia") {
    const resultLine = session.result === "win" ? "Correct" : "Missed";
    return ["Yearsy Trivia", resultLine].join("\n");
  }

  const title =
    session.mode === "daily" && session.dailyDate
      ? `Yearsy Daily ${session.dailyDate}`
      : `Yearsy Unlimited - ${session.event.category}`;

  const lines = session.guesses.map(formatGuessForShare);
  const resultLine = session.result === "win" ? `${session.guesses.length}/6` : "X/6";
  return [title, ...lines, resultLine].join("\n");
}
