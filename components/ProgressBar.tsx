import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  value: number; // 0-100
}

const LOCAL_STORAGE_KEY = 'marhaban_progress';

export const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const [progress, setProgress] = useState<number>(value);

  useEffect(() => {
    setProgress(value);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, value.toString());
  }, [value]);

  return (
    <div aria-label="Progression globale" className="w-full h-2 bg-gray-200 rounded-full mt-2 mb-4" style={{position: 'sticky', top: 0, zIndex: 30}}>
      <div
        className="h-2 rounded-full transition-all duration-300"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #22c55e 0%, #2563eb 100%)',
        }}
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        role="progressbar"
      />
    </div>
  );
};

export default ProgressBar;
