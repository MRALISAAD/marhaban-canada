type DisclaimerProps = {
  text: string;
};

export function Disclaimer({ text }: DisclaimerProps) {
  return <p className="mt-8 text-xs text-slate-600">{text}</p>;
}
