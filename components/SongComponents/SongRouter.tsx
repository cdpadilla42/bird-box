import React, { useEffect, useState } from 'react';
import BirdBoxTheme from './BirdBoxTheme';
import useSound from '@/hooks/useSound';
import ootFanfare from '@/assets/audio/OOT_PressStart_Mono.mp3';
import BirdBoxLofi from './BirdBoxLofi';
import DrumAndBirdTheme from './DrumAndBirdTheme';
import DrumAndBird from './DrumAndBird';
import Tropical from './Tropical';
import TropicalTheme from './TropicalTheme';

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
    playOnLoad: false,
  });

  useEffect(() => {
    if (songTitle) {
      onPlaySong();
      playJingle();
      setSelectedSong(songTitle);
      console.log(songTitle);
    } else {
      setSelectedSong('');
    }
  }, [songTitle]);

  if (selectedSong === 'epona') {
    console.log('epona');
    return (
      <BirdBoxTheme onEventSoundFinish={() => setSelectedSong('birdBoxLofi')} />
    );
  }
  if (selectedSong === 'drumAndBirdTheme') {
    return (
      <DrumAndBirdTheme
        onEventSoundFinish={() => setSelectedSong('drumAndBird')}
      />
    );
  }
  if (selectedSong === 'drumAndBird') {
    return <DrumAndBird onEventSoundFinish={onEventSoundFinish} />;
  }
  if (selectedSong === 'tropicalTheme') {
    return (
      <TropicalTheme onEventSoundFinish={() => setSelectedSong('tropical')} />
    );
  }
  if (selectedSong === 'tropical') {
    return <Tropical onEventSoundFinish={onEventSoundFinish} />;
  }
  if (selectedSong === 'birdBoxLofi') {
    return <BirdBoxLofi onEventSoundFinish={onEventSoundFinish} />;
  }

  return <></>;
}
