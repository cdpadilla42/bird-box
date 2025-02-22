import { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';

type SoundComponentProps = {
  playSound: () => void;
  disabled?: boolean;
};

export default function SoundComponent({
  playSound,
  disabled = false,
}: SoundComponentProps) {
  const [internalDisabled, setInternalDisabled] = useState(false);
  const onPlaySound = () => {
    playSound();
    setInternalDisabled(true);
    setTimeout(() => {
      setInternalDisabled(false);
    }, 1000);
  };
  return (
    <View style={styles.container}>
      <Button
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
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
