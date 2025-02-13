import { useState } from 'react';

export function useSoundMemory() {
  const [soundMemory, setSoundMemory] = useState<string[]>([]);

  const addSound = (sound: string) => {
    setSoundMemory([...soundMemory, sound]);
  };

  return { soundMemory, addSound };
}
