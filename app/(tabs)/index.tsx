import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SoundComponent from '@/components/SoundComponent';
import ah from '@/assets/audio/TestAh.mp3';
import la from '@/assets/audio/TestLa.mp3';
import oh from '@/assets/audio/TestOh.mp3';

import { useSoundMemory } from '@/hooks/useSoundMemory';
import { Link } from 'expo-router';
import { openModal } from '../modal';
import { useState } from 'react';
import SongRouter from '@/components/SongComponents/SongRouter';

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
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{' '}
          to see changes. Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{' '}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{' '}
          directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">Open modal</Link>
        <SoundComponent
          soundSource={ah}
          onPlay={() => handleAddSound('ah')}
          disabled={birdSingingBack}
        />
        <SoundComponent
          soundSource={oh}
          onPlay={() => handleAddSound('oh')}
          disabled={birdSingingBack}
        />
        <SoundComponent
          soundSource={la}
          onPlay={() => handleAddSound('la')}
          disabled={birdSingingBack}
        />
        <SongRouter
          songTitle={songTitle}
          onEventSoundFinish={onEventSoundFinish}
          onPlaySong={onPlaySong}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
