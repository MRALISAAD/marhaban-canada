'use client';

import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

type QuizItem = {
  question: string;
  answers: { label: string; isScam: boolean }[];
  explanation: string;
};

const quizByLocale: Record<string, QuizItem[]> = {
  fr: [
    {
      question: 'On te demande un dépôt avant la visite du logement.',
      answers: [
        { label: 'Arnaque probable', isScam: true },
        { label: "C’est normal", isScam: false },
      ],
      explanation: 'Sans visite et bail signé, aucun paiement ne doit être fait.',
    },
    {
      question: 'Un recruteur demande 50 $ pour traiter ton dossier.',
      answers: [
        { label: 'Arnaque probable', isScam: true },
        { label: "C’est normal", isScam: false },
      ],
      explanation: 'Un vrai employeur ne demande jamais de frais.',
    },
    {
      question: "La banque t’appelle et demande ton PIN.",
      answers: [
        { label: 'Arnaque probable', isScam: true },
        { label: "C’est normal", isScam: false },
      ],
      explanation: 'Une banque ne demande jamais ton PIN ou tes codes.',
    },
  ],
  en: [
    {
      question: 'You are asked to pay a deposit before visiting the housing.',
      answers: [
        { label: 'Likely a scam', isScam: true },
        { label: 'It’s normal', isScam: false },
      ],
      explanation: 'Without a visit and a signed lease, no payment should be made.',
    },
    {
      question: 'A recruiter asks for $50 to process your application.',
      answers: [
        { label: 'Likely a scam', isScam: true },
        { label: 'It’s normal', isScam: false },
      ],
      explanation: 'A real employer never charges fees.',
    },
    {
      question: 'Your bank calls and asks for your PIN.',
      answers: [
        { label: 'Likely a scam', isScam: true },
        { label: 'It’s normal', isScam: false },
      ],
      explanation: 'A bank never asks for your PIN or verification codes.',
    },
  ],
  ar: [
    {
      question: 'يُطلب منك دفع عربون قبل زيارة السكن.',
      answers: [
        { label: 'احتيال محتمل', isScam: true },
        { label: 'هذا طبيعي', isScam: false },
      ],
      explanation: 'من دون زيارة وعقد إيجار موقَّع، لا يجب دفع أي مبلغ.',
    },
    {
      question: 'يطلب منك مُجَنِّد 50 دولارًا لمعالجة ملفك.',
      answers: [
        { label: 'احتيال محتمل', isScam: true },
        { label: 'هذا طبيعي', isScam: false },
      ],
      explanation: 'صاحب العمل الجاد لا يطلب رسومًا لمعالجة الطلب.',
    },
    {
      question: 'يتصل بك البنك ويطلب منك رقم الـPIN.',
      answers: [
        { label: 'احتيال محتمل', isScam: true },
        { label: 'هذا طبيعي', isScam: false },
      ],
      explanation: 'البنك الحقيقي لا يطلب رقم الـPIN أو رموز التحقق.',
    },
  ],
};

export function ScamQuiz() {
  const { locale } = useLanguage();
  const quiz = quizByLocale[locale] ?? quizByLocale.fr;
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});

  const score = quiz.reduce((acc, item, index) => {
    if (answers[index] == null) return acc;
    return acc + (answers[index] === item.answers[0].isScam ? 1 : 0);
  }, 0);

  const title =
    locale === 'fr'
      ? 'Mini quiz : est-ce une arnaque ?'
      : locale === 'en'
        ? 'Mini quiz: is this a scam?'
        : 'اختبار قصير: هل هذه عملية احتيال؟';

  const scoreLabel =
    locale === 'fr' ? 'Score' : locale === 'en' ? 'Score' : 'النتيجة';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
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
        {scoreLabel}: {score}/{quiz.length}
      </p>
    </div>
  );
}
