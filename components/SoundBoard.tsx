import useSound from '@/hooks/useSound';
import React from 'react';
import SoundComponent from './SoundComponent';
import whistleA from '@/assets/audio/Whistle_A.mp3';
import whistleB from '@/assets/audio/Whistle_B.mp3';
import whistleG from '@/assets/audio/Whistle_G.mp3';
import whistleD from '@/assets/audio/Whistle_D.mp3';
import whistleE from '@/assets/audio/Whistle_E.mp3';
import { StyleSheet, View } from 'react-native';

type Props = {
  handleAddSound: (sound: string) => void;
  disabled: boolean;
};

export default function SoundBoard({ handleAddSound, disabled }: Props) {
  const { playSound: playE, stopSound: stopE } = useSound({
    soundSource: whistleE,
    onPlay: () => handleAddSound('E'),
  });
  const { playSound: playD, stopSound: stopD } = useSound({
    soundSource: whistleD,
    onPlay: () => handleAddSound('D'),
  });
  const { playSound: playB, stopSound: stopB } = useSound({
    soundSource: whistleB,
    onPlay: () => handleAddSound('B'),
  });
  const { playSound: playA, stopSound: stopA } = useSound({
    soundSource: whistleA,
    onPlay: () => handleAddSound('A'),
  });
  const { playSound: playG, stopSound: stopG } = useSound({
    soundSource: whistleG,
    onPlay: () => handleAddSound('G'),
  });

  const playSoundAndStopOthers = (playCallback: () => void) => {
    stopAllSounds();
    playCallback();
  };

  const stopAllSounds = () => {
    stopE();
    stopD();
    stopB();
    stopA();
    stopG();
  };
  return (
    <View style={styles.container}>
      <SoundComponent
        playSound={() => playSoundAndStopOthers(playE)}
        disabled={disabled}
      />
      <SoundComponent
        playSound={() => playSoundAndStopOthers(playD)}
        disabled={disabled}
      />
      <SoundComponent
        playSound={() => playSoundAndStopOthers(playB)}
        disabled={disabled}
      />
      <SoundComponent
        playSound={() => playSoundAndStopOthers(playA)}
        disabled={disabled}
      />
      <SoundComponent
        playSound={() => playSoundAndStopOthers(playG)}
        disabled={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    // flexDirection: 'row',
    flexDirection: 'row-reverse',
    // gap: 0,
  },
});
