import { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MusicNoteButton from './Button';

type SoundComponentProps = {
  playSound: () => void;
  disabled?: boolean;
};

export default function SoundComponent({
  playSound,
  disabled = false,
}: SoundComponentProps) {
  const [internalDisabled, setInternalDisabled] = useState(false);
  const onPlaySound = async () => {
    await playSound();
    setInternalDisabled(true);
    setTimeout(() => {
      setInternalDisabled(false);
    }, 1000);
  };
  return (
    <View style={styles.container}>
      <MusicNoteButton
        title="Play Sound"
        onPress={onPlaySound}
        disabled={disabled || internalDisabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexBasis: '29%',
    backgroundColor: '#e7f8ea',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    // width: 60,
    // height: 60,
  },
});
