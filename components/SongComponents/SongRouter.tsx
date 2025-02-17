import React, { useEffect, useState } from 'react';
import EponaSong from './EponaSong';
import useSound from '@/hooks/useSound';
import ootFanfare from '@/assets/audio/OOT_PressStart_Mono.mp3';

type SongRouterProps = {
  songTitle?: string;
  onEventSoundFinish?: () => void;
  onPlaySong?: () => void;
};

export default function SongRouter({
  songTitle,
  onEventSoundFinish = () => {},
  onPlaySong = () => {},
}: SongRouterProps) {
  const [selectedSong, setSelectedSong] = useState<string>();
  const { playSound: playJingle } = useSound({
    soundSource: ootFanfare,
  });

  useEffect(() => {
    if (songTitle) {
      onPlaySong();
      playJingle();
      setSelectedSong(songTitle);
    } else {
      setSelectedSong('');
    }
  }, [songTitle]);

  if (selectedSong === 'epona') {
    return <EponaSong onEventSoundFinish={onEventSoundFinish} />;
  }

  return <></>;
}
