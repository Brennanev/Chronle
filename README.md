# Chronle

Chronle is a daily historical guessing game inspired by games like Wordle. Each round shows a historical event, and the player has 6 guesses to identify the correct year. After each guess, Chronle gives directional and distance feedback so the player can zero in on the answer.

## Stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Local storage for stats and daily progress
- Deterministic server route for the daily puzzle

## Getting Started

1. Open a terminal in `C:\Users\Brennan\OneDrive\Documentos\New project\Chronle`
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open `http://localhost:3000`

## Project Structure

```text
app/
  api/daily/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  ChronleApp.tsx
  GuessHistory.tsx
  GuessInput.tsx
  HowToPlayModal.tsx
  ResultModal.tsx
  StatsModal.tsx
data/
  events.ts
lib/
  daily.ts
  game.ts
  parseYear.ts
  share.ts
  storage.ts
  types.ts
```

## Game Modes

- Daily Mode
  Same puzzle for every player on the same UTC date. Stored locally so the same browser cannot replay it after completion.
- Unlimited Mode
  Random events with category and difficulty filters. The last 10 unlimited events are excluded from immediate repeat when possible.

## Daily Puzzle Selection

Chronle uses a deterministic UTC-based daily system:

1. Build a daily-eligible pool from the event dataset
2. Sort that pool into a stable order using a hash of each event id
3. Convert the UTC date into a day index since the Unix epoch
4. Use `dayIndex % pool.length` to select the puzzle

That gives:

- the same daily puzzle for all players on the same UTC day
- a stable schedule
- no short-term repeats until the sequence loops

## Event Dataset

- The dataset lives in [data/events.ts](C:\Users\Brennan\OneDrive\Documentos\New%20project\Chronle\data\events.ts)
- It currently includes 300+ events across:
  - World History
  - U.S. History
  - Science & Inventions
  - Pop Culture
  - Sports
- Difficulty tags:
  - Easy
  - Medium
  - Hard

## Adding More Events

Add more events in [data/events.ts](C:\Users\Brennan\OneDrive\Documentos\New%20project\Chronle\data\events.ts) using the same tuple format inside the category arrays:

```ts
["event-id", "Event title", "Short prompt description.", 1989, "Easy"]
```

Chronle automatically builds the event explanation text and includes new events in unlimited play. Daily mode will also pick them up if they are not marked `Hard`.

## Key Logic Modules

- [lib/parseYear.ts](C:\Users\Brennan\OneDrive\Documentos\New%20project\Chronle\lib\parseYear.ts)
  Parses values like `1989`, `44 BC`, and `476 AD`
- [lib/game.ts](C:\Users\Brennan\OneDrive\Documentos\New%20project\Chronle\lib\game.ts)
  Guess evaluation, closeness tiers, and unlimited puzzle selection
- [lib/daily.ts](C:\Users\Brennan\OneDrive\Documentos\New%20project\Chronle\lib\daily.ts)
  Deterministic daily selection and countdown support
- [lib/storage.ts](C:\Users\Brennan\OneDrive\Documentos\New%20project\Chronle\lib\storage.ts)
  Local persistence for stats, daily progress, and recent unlimited events
- [lib/share.ts](C:\Users\Brennan\OneDrive\Documentos\New%20project\Chronle\lib\share.ts)
  Spoiler-free share text formatting

## Deploying

Chronle is structured to deploy cleanly on Vercel:

1. Push the project to a Git repository
2. Import it into Vercel
3. Use the default Next.js build settings
4. No database setup is required for the current version

## Notes

- Daily progress and stats are browser-local
- No account system is required
- The current build is designed so hints, timelines, leaderboards, or accounts can be added later without rewriting the core game loop
