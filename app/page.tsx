import { ChronleApp } from "@/components/ChronleApp";
import { getDailyPuzzle } from "@/lib/daily";
import { getDailyDateKey } from "@/lib/game";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const dateKey = getDailyDateKey();
  const dailyPuzzle = getDailyPuzzle(dateKey);

  return <ChronleApp initialDailyDate={dateKey} initialDailyId={dailyPuzzle.id} />;
}
