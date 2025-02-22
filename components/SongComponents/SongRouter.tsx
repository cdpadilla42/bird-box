import React, { useEffect, useState } from 'react';
import BirdBoxTheme from './BirdBoxTheme';
import useSound from '@/hooks/useSound';
import ootFanfare from '@/assets/audio/OOT_PressStart_Mono.mp3';
import BirdBoxLofi from './BirdBoxLofi';

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
    return (
      <BirdBoxTheme onEventSoundFinish={() => setSelectedSong('birdBoxLofi')} />
    );
  }
  if (selectedSong === 'birdBoxLofi') {
    return <BirdBoxLofi onEventSoundFinish={onEventSoundFinish} />;
  }

  return <></>;
}
