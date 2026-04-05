import { ChronleApp } from "@/components/ChronleApp";
import { getDailyPuzzle } from "@/lib/daily";
import { getUtcDateKey } from "@/lib/game";

export default function HomePage() {
  const dateKey = getUtcDateKey();
  const dailyPuzzle = getDailyPuzzle(dateKey);

  return <ChronleApp initialDailyDate={dateKey} initialDailyId={dailyPuzzle.id} />;
}
