"use client";

type TriviaChoicesProps = {
  choices: string[];
  selectedAnswer?: string;
  correctAnswer: string;
  completed: boolean;
  onSelect: (answer: string) => void;
};

export function TriviaChoices({
  choices,
  selectedAnswer,
  correctAnswer,
  completed,
  onSelect
}: TriviaChoicesProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {choices.map((choice) => {
        const isSelected = selectedAnswer === choice;
        const isCorrect = correctAnswer === choice;
        const classes = completed
          ? isCorrect
            ? "border-emerald-300/30 bg-emerald-400/20 text-emerald-100"
            : isSelected
              ? "border-rose-300/30 bg-rose-400/20 text-rose-100"
              : "border-white/10 bg-white/5 text-slate-200"
          : "border-white/10 bg-white/5 text-slate-100 hover:border-cyan-300/30 hover:bg-cyan-300/10";

        return (
          <button
            key={choice}
            type="button"
            className={`rounded-[24px] border p-4 text-left transition ${classes}`}
            disabled={completed}
            onClick={() => onSelect(choice)}
          >
            <p className="text-sm leading-7">{choice}</p>
          </button>
        );
      })}
    </div>
  );
}
