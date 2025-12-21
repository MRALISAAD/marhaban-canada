'use client';

type ActionStepsProps = {
  title: string;
  steps: string[];
};

export function ActionSteps({ title, steps }: ActionStepsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <ol className="mt-3 list-decimal space-y-2 ps-4 text-sm text-slate-700">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
