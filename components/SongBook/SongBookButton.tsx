import React from 'react';
import { Text, View } from 'react-native';
import useEventSound from '@/hooks/useEventSound';
import MusicNoteButton from '../Button';

type SongBookButtonProps = {
  onSoundFinish?: () => void;
  onPress?: () => void;
  disabled?: boolean;
  soundSource: string;
  name: string;
};

export default function SongBookButton({
  onSoundFinish = () => {},
  onPress = () => {},
  disabled = false,
  soundSource = '',
  name = '',
}: SongBookButtonProps) {
  const { playEventSound, soundLoaded } = useEventSound({
    soundSource: soundSource,
    onSoundFinish: onSoundFinish,
  });

  const handlePress = () => {
    console.log('Playing theme');
    onPress();
    playEventSound();
  };
  return (
    <View>
      <MusicNoteButton
        title="Play Sound"
        onPress={handlePress}
        disabled={disabled}
      />
      <Text>{name}</Text>
    </View>
  );
}
