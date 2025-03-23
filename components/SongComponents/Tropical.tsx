import React, { useEffect } from 'react';
import birdBoxTropical from '@/assets/audio/BirdBoxTropical.mp3';
import useEventSound from '@/hooks/useEventSound';

type Props = {
  onEventSoundFinish?: () => void;
};

export default function Tropical({ onEventSoundFinish }: Props) {
  const { playEventSound, soundLoaded } = useEventSound({
    soundSource: birdBoxTropical,
    onSoundFinish: onEventSoundFinish,
  });

  useEffect(() => {
    playEventSound();
  }, []);

  return <></>;
}
