import React from 'react';
import { View } from 'react-native';
import birdBoxTheme from '@/assets/audio/BirdBoxLofiTheme.mp3';
import tropcialTheme from '@/assets/audio/BirdBoxTropicalTheme.mp3';
import drumAndBirdTheme from '@/assets/audio/DrumAndBirdTheme.mp3';
import SongBookButton from './SongBookButton';

type SongBookProps = {
  onEventSoundFinish?: () => void;
  onPlaySong?: () => void;
  birdSingingBack?: boolean;
};

export default function SongBook({
  onEventSoundFinish = () => {},
  onPlaySong = () => {},
  birdSingingBack = false,
}: SongBookProps) {
  return (
    <View>
      <SongBookButton
        name="Lofi Birds"
        onPress={onPlaySong}
        disabled={birdSingingBack}
        soundSource={birdBoxTheme}
        onSoundFinish={onEventSoundFinish}
      />
      <SongBookButton
        name="Bird Bossa"
        onPress={onPlaySong}
        disabled={birdSingingBack}
        soundSource={tropcialTheme}
        onSoundFinish={onEventSoundFinish}
      />
      <SongBookButton
        name="Drum and Bird"
        onPress={onPlaySong}
        disabled={birdSingingBack}
        soundSource={drumAndBirdTheme}
        onSoundFinish={onEventSoundFinish}
      />
    </View>
  );
}
