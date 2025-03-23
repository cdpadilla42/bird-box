import React, { useEffect } from 'react';
import drumAndBird from '@/assets/audio/DrumAndBird.mp3';
import useEventSound from '@/hooks/useEventSound';

type Props = {
  onEventSoundFinish?: () => void;
};

export default function DrumAndBird({ onEventSoundFinish }: Props) {
  const { playEventSound, soundLoaded } = useEventSound({
    soundSource: drumAndBird,
    onSoundFinish: onEventSoundFinish,
  });

  useEffect(() => {
    playEventSound();
  }, []);

  return <></>;
}
