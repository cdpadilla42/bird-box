import React, { useEffect } from 'react';
import birdBoxTheme from '@/assets/audio/BirdBoxLofiTheme.mp3';
import useEventSound from '@/hooks/useEventSound';

type Props = {
  onEventSoundFinish?: () => void;
};

export default function BirdBoxTheme({ onEventSoundFinish }: Props) {
  const { playEventSound, soundLoaded } = useEventSound({
    soundSource: birdBoxTheme,
    onSoundFinish: onEventSoundFinish,
  });

  useEffect(() => {
    if (soundLoaded) {
      playEventSound();
    }
  }, [soundLoaded]);

  return <></>;
}
