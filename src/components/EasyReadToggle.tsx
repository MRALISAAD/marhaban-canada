'use client';

import { useEasyRead } from '@/components/EasyReadProvider';
import { FEATURE_FLAGS } from '@/lib/featureFlags';
import { Button } from '@/components/ui/Button'; // Assuming a Button component exists or using a generic HTML button
import { useLanguage } from '@/components/LanguageProvider'; // To get locale for translations

export function EasyReadToggle() {
  const { isEasyRead, toggleEasyRead } = useEasyRead();
  const { content } = useLanguage(); // Get content from useLanguage

  if (!FEATURE_FLAGS.ENABLE_EASY_READ) {
    return null;
  }

  const easyReadOn = content.shared?.easyReadOn ?? 'Easy Read Mode';
  const easyReadOff = content.shared?.easyReadOff ?? 'Normal Mode';

  return (
    <Button
      onClick={toggleEasyRead}
      variant="ghost" // Assuming a ghost variant or similar styling
      size="sm"
      className="text-sm"
      aria-pressed={isEasyRead}
    >
      {isEasyRead ? easyReadOff : easyReadOn}
    </Button>
  );
}
