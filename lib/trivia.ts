import { triviaQuestions } from "@/data/trivia";

export function getTriviaQuestion(recentIds: string[]) {
  const filteredPool = triviaQuestions.filter((question) => !recentIds.includes(question.id));
  const source = filteredPool.length > 0 ? filteredPool : triviaQuestions;
  return source[Math.floor(Math.random() * source.length)] ?? triviaQuestions[0];
}
