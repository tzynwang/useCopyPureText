import { useState, useEffect } from 'react';

function useCopyPureText() {
  /* States */
  const [copyDone, setCopyDone] = useState<boolean | null>(null);

  /* Functions */
  const handleCopy = async (toCopy: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(toCopy);
      setCopyDone(true);
    } catch (error) {
      setCopyDone(false);
    }
  };

  /* Hooks */
  useEffect(() => {
    if (copyDone === null) return;

    const timeoutId = setTimeout(() => {
      setCopyDone(null);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [copyDone]);

  /* Main */
  return [copyDone, handleCopy] as const;
}

export default useCopyPureText;
