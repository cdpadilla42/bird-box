import { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

type SoundComponentProps = {
  soundSource: any;
  onPlay: () => void;
};
export default function SoundComponent({
  soundSource,
  onPlay,
}: SoundComponentProps) {
  const [sound, setSound] = useState<Sound>();

  async function playSound() {
    if (sound) {
      console.log('Playing Sound');
      await sound.stopAsync();
      await sound.playAsync();
      onPlay();
    }
  }

  useEffect(() => {
    const loadSound = async () => {
      console.log('Loading Sound');
      // try {
      const { sound } = await Audio.Sound.createAsync(soundSource);
      setSound(sound);
      // } catch (error) {
      //   console.error('Could not load sound', error);
      // }
    };
    loadSound();
  }, [soundSource]);

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
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
