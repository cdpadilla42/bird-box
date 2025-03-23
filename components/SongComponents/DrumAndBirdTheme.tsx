import React, { useEffect } from 'react';
import drumAndBirdTheme from '@/assets/audio/DrumAndBirdTheme.mp3';
import useEventSound from '@/hooks/useEventSound';

type Props = {
  onEventSoundFinish?: () => void;
};

export default function DrumAndBirdTheme({ onEventSoundFinish }: Props) {
  const { playEventSound, soundLoaded } = useEventSound({
    soundSource: drumAndBirdTheme,
    onSoundFinish: onEventSoundFinish,
  });

  useEffect(() => {
    console.log(soundLoaded);
    playEventSound();
  }, []);

  return <></>;
}
