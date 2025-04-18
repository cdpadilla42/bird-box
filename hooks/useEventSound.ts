import useSound from './useSound';
import { useRef, useState } from 'react';
type UseSoundProps = {
  soundSource: any;
  onSoundFinish?: () => void;
};

export default function useEventSound({
  soundSource,
  onSoundFinish = () => {},
}: UseSoundProps) {
  const intervalId = useRef<NodeJS.Timeout>(null);
  const { playSound: playEponaSound, sound: eponaSound } = useSound({
    soundSource,
    playOnLoad: false,
  });

  async function handleIntervalCheck() {
    const soundStatus = await eponaSound.current?.getStatusAsync();
    console.log('check');
    // @ts-expect-error property does in fact exist
    if (soundStatus && !soundStatus?.isPlaying) {
      onSoundFinish();
      if (intervalId?.current) {
        clearInterval(intervalId?.current);
        // @ts-expect-error Mutating ref
        intervalId.current = null;
      }
    }
  }

  function playEventSound() {
    setTimeout(async () => {
      await playEponaSound();
      console.log('played...');
      // @ts-expect-error Mutating ref
      intervalId.current = setInterval(() => handleIntervalCheck(), 500);
    }, 1000);
  }

  return { playEventSound, soundLoaded: !!eponaSound.current };
}
