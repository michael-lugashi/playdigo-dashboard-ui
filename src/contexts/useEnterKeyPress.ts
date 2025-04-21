import { useEffect, useRef } from 'react';

const useEnterKeyPress = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        ref.current?.click();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return ref;
};

export default useEnterKeyPress;
