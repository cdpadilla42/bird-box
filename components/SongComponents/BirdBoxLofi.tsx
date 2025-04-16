import React, { useEffect } from 'react';
import birdBoxTheme from '@/assets/audio/BirdBoxLofi.mp3';
import useEventSound from '@/hooks/useEventSound';

type Props = {
  onEventSoundFinish?: () => void;
};

export default function BirdBoxLofi({ onEventSoundFinish }: Props) {
  const { playEventSound, soundLoaded } = useEventSound({
    soundSource: birdBoxTheme,
    onSoundFinish: onEventSoundFinish,
  });

  useEffect(() => {
    playEventSound();
  }, []);

  return <></>;
}
