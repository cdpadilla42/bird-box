import React, { useEffect } from 'react';
import tropcialTheme from '@/assets/audio/BirdBoxTropicalTheme.mp3';
import useEventSound from '@/hooks/useEventSound';

type Props = {
  onEventSoundFinish?: () => void;
};

export default function TropicalTheme({ onEventSoundFinish }: Props) {
  const { playEventSound, soundLoaded } = useEventSound({
    soundSource: tropcialTheme,
    onSoundFinish: onEventSoundFinish,
  });

  useEffect(() => {
    console.log(soundLoaded);
    playEventSound();
  }, []);

  return <></>;
}
