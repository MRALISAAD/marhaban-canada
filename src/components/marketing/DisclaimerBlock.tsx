export function DisclaimerBlock({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-marhaban-leaf/15 bg-marhaban-mint/50 p-5 text-sm leading-relaxed text-marhaban-ink/80">
      {text}
    </div>
  );
}
