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

  async function getIsSoundLoaded() {
    if (sound) {
      return new Promise((res, rej) => {
        const id = setInterval(() => {
          let checkCount = 0;
          const run = async () => {
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
              res(true);
              clearInterval(id);
            }
            if (checkCount >= 3000) {
              console.log('Could not load sound');
              rej(false);
              clearInterval(id);
            }
            checkCount++;
          };
          run();
        }, 100);
      });
    }
    return false;
  }

  async function playSound() {
    const isSoundLoaded = await getIsSoundLoaded();
    if (sound && isSoundLoaded) {
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
