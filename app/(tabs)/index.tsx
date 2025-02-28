import { Image, StyleSheet, Platform, View, SafeAreaView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSoundMemory } from '@/hooks/useSoundMemory';
import { Link } from 'expo-router';
import { openModal } from '../modal';
import { useState } from 'react';
import SongRouter from '@/components/SongComponents/SongRouter';
import SoundBoard from '@/components/SoundBoard';

export default function HomeScreen() {
  const [birdSingingBack, setBirdSingingBack] = useState(false);
  const [songTitle, setSongTitle] = useState<string>();

  function onPatternMatch(matchedPattern: string) {
    setSongTitle(matchedPattern);
  }
  const { addSound } = useSoundMemory(onPatternMatch);

  const handleAddSound = (sound: string) => {
    addSound(sound);
  };

  function onEventSoundFinish() {
    setSongTitle('');
    setBirdSingingBack(false);
  }

  function onPlaySong() {
    setBirdSingingBack(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.stepContainer}>
        <SoundBoard
          handleAddSound={handleAddSound}
          disabled={birdSingingBack}
        />
        <SongRouter
          songTitle={songTitle}
          onEventSoundFinish={onEventSoundFinish}
          onPlaySong={onPlaySong}
        />
        <Link href="/modal">Open modal</Link>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
