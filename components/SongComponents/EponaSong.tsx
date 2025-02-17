import React, { useEffect } from 'react';
import eponaSong from '@/assets/audio/eponasung.mp3';
import useEventSound from '@/hooks/useEventSound';

type Props = {
  onEventSoundFinish?: () => void;
};

export default function EponaSong({ onEventSoundFinish }: Props) {
  const { playEventSound, soundLoaded } = useEventSound({
    soundSource: eponaSong,
    onSoundFinish: onEventSoundFinish,
  });

  useEffect(() => {
    if (soundLoaded) {
      playEventSound();
    }
  }, [soundLoaded]);

  return <></>;
}
