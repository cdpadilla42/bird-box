import { useState } from 'react';
import isEqual from 'lodash.isequal';

type UseSoundMemoryProps = (patternMatched: string) => void;

const PATTERNS = {
  epona: ['D', 'B', 'G', 'A', 'B', 'G'],
};

function patternMatches(soundMemory: string[], patterns: typeof PATTERNS) {
  for (const [patternName, pattern] of Object.entries(patterns)) {
    const currentSoundMemory = soundMemory.slice(-pattern.length);
    const isPatternMatch = isEqual(currentSoundMemory, pattern);
    if (isPatternMatch) {
      return patternName;
    }
  }
  return false;
}

export function useSoundMemory(onPatternMatch: UseSoundMemoryProps) {
  const [soundMemory, setSoundMemory] = useState<string[]>([]);

  const addSound = (sound: string) => {
    const newSoundMemory = [...soundMemory, sound];
    setSoundMemory(newSoundMemory);
    const patternMatched = patternMatches(newSoundMemory, PATTERNS);
    if (patternMatched) {
      onPatternMatch(patternMatched);
    }
  };

  return { soundMemory, addSound };
}
