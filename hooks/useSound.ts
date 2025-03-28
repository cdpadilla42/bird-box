import { useEffect, useRef, useState } from 'react';
import { Audio, InterruptionModeAndroid } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

type UseSoundProps = {
  soundSource: any;
  onPlay?: () => void;
  playOnLoad: boolean;
};

type SoundRef = Sound | null;

export default function useSound({
  soundSource,
  onPlay = () => {},
  playOnLoad = true,
}: UseSoundProps) {
  // const [sound, setSound] = useState<Sound>();
  const soundRef = useRef<SoundRef>(null);

  async function getIsSoundLoaded() {
    if (soundRef.current) {
      return new Promise((res, rej) => {
        const id = setInterval(() => {
          let checkCount = 0;
          const run = async () => {
            const status = await soundRef.current?.getStatusAsync();
            if (status?.isLoaded) {
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
    console.log('sound loaded', isSoundLoaded);
    if (soundRef.current) {
      console.log('Playing Sound');
      // await sound.stopAsync();
      await soundRef.current.setPositionAsync(0);
      await soundRef.current.playAsync();
      onPlay();
    }
  }

  async function stopSound() {
    const isSoundLoaded = await getIsSoundLoaded();
    if (soundRef.current && isSoundLoaded) {
      // setTimeout(async () => {
      //   await sound.stopAsync();
      // }, 500);
      // @ts-expect-error fade not in types
      //   await sound.setVolumeAsync(0, {
      //     shouldCorrectPitch: false,
      //     currentTime: currentPosition + fadeOutDuration
      // });
    }
  }

  useEffect(() => {
    const loadSound = async () => {
      console.log('Loading Sound');
      // await Audio.requestPermissionsAsync();
      console.log('setup');
      await Audio.setAudioModeAsync({
        staysActiveInBackground: false,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        shouldDuckAndroid: false,
        // playThroughEarpieceAndroid: false,
        // allowsRecordingIOS: false,
        // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
      });

      const { sound } = await Audio.Sound.createAsync(soundSource, {
        shouldPlay: playOnLoad,
      });
      // await sound.loadAsync(soundSource, { shouldPlay: true });
      soundRef.current = sound;
      console.log('Sound loaded');
    };
    loadSound();
  }, [soundSource]);

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log('Unloading Sound');
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  return { playSound, stopSound, sound: soundRef };
}
