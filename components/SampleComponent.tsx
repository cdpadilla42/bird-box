import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Platform } from 'react-native';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

type SampleComponentProps = {
  soundSource: any; // an MP3 File
};

export default function SampleComponent({ soundSource }: SampleComponentProps) {
  // React hooks work as expected
  const [sound, setSound] = useState<Sound>();

  useEffect(() => {
    const loadSound = async () => {
      // Handle mobile device interactions with expo libraries
      const { sound } = await Audio.Sound.createAsync(soundSource);
      setSound(sound);
    };
    loadSound();
  }, [soundSource]);

  async function playSound() {
    if (sound) {
      // Run certain logic on specific platforms
      if (Platform.OS === 'ios') {
        await sound.setPositionAsync(0);
      }
      await sound.playAsync();
    }
  }

  // Use core library components to render elements
  return (
    <View style={[styles.container]}>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}

// Style components with CSS-like properties
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
