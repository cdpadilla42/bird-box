import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useEventSound from '@/hooks/useEventSound';
import MusicNoteButton from '../Button';
import { textStyles } from '@/app/modal';

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
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.items}>
          <MusicNoteButton
            title="Play Sound"
            onPress={handlePress}
            disabled={disabled}
          />
          <Text style={textStyles}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#e7f8ea',
    fontSize: 24,
    marginVertical: 8,
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 200,
  },
});
