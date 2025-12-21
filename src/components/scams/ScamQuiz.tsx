'use client';

import { useState } from 'react';

type QuizItem = {
  question: string;
  answers: { label: string; isScam: boolean }[];
  explanation: string;
};

const quiz: QuizItem[] = [
  {
    question: 'On te demande un depot avant la visite du logement.',
    answers: [
      { label: 'Arnaque probable', isScam: true },
      { label: 'Cest normal', isScam: false },
    ],
    explanation: 'Sans visite et bail signe, aucun paiement ne doit etre fait.',
  },
  {
    question: 'Un recruteur demande 50 $ pour traiter ton dossier.',
    answers: [
      { label: 'Arnaque probable', isScam: true },
      { label: 'Cest normal', isScam: false },
    ],
    explanation: 'Un vrai employeur ne demande jamais de frais.',
  },
  {
    question: 'La banque t appelle et demande ton PIN.',
    answers: [
      { label: 'Arnaque probable', isScam: true },
      { label: 'Cest normal', isScam: false },
    ],
    explanation: 'Une banque ne demande jamais ton PIN ou tes codes.',
  },
];

export function ScamQuiz() {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});

  const score = quiz.reduce((acc, item, index) => {
    if (answers[index] == null) return acc;
    return acc + (answers[index] === item.answers[0].isScam ? 1 : 0);
  }, 0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900">Mini quiz : est-ce une arnaque ?</h3>
      <div className="mt-4 space-y-4">
        {quiz.map((item, index) => (
          <div key={item.question} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-900">{item.question}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.answers.map((answer) => (
                <button
                  key={answer.label}
                  type="button"
                  onClick={() => setAnswers((prev) => ({ ...prev, [index]: answer.isScam }))}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 hover:border-slate-300"
                >
                  {answer.label}
                </button>
              ))}
            </div>
            {answers[index] != null ? (
              <p className="mt-2 text-xs text-slate-600">{item.explanation}</p>
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-600">
        Score: {score}/{quiz.length}
      </p>
    </div>
  );
}
