import { NextResponse } from "next/server";
import { getDailyPuzzle } from "@/lib/daily";
import { getDailyDateKey } from "@/lib/game";

export const dynamic = "force-dynamic";

export function GET() {
  const dateKey = getDailyDateKey();
  const puzzle = getDailyPuzzle(dateKey);

  return NextResponse.json(
    {
      date: dateKey,
      eventId: puzzle.id
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
      }
    }
  );
}
