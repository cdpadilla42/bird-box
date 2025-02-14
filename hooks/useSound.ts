import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

type UseSoundProps = {
  soundSource: any;
  onPlay?: () => void;
};

export default function useSound({
  soundSource,
  onPlay = () => {},
}: UseSoundProps) {
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
      const { sound } = await Audio.Sound.createAsync(soundSource);
      setSound(sound);
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

  return { playSound, sound };
}
