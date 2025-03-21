import {
  Image,
  StyleSheet,
  Platform,
  View,
  SafeAreaView,
  ImageBackground,
  type ImageBackgroundProps,
} from 'react-native';

import { useSoundMemory } from '@/hooks/useSoundMemory';
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

  const imageBackgroundPlatformStyles: { width?: string; height?: string } = {};
  const stepContainerPlatformStyles = {};
  if (!['ios', 'android'].includes(Platform.OS)) {
    imageBackgroundPlatformStyles.width = '100%';
    imageBackgroundPlatformStyles.height = '100%';
    stepContainerPlatformStyles;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...styles.stepContainer, ...stepContainerPlatformStyles }}>
        <ImageBackground
          source={require('@/assets/images/BirdBoxCloudedBG.png')}
          imageStyle={{ resizeMode: 'cover' }}
          style={
            {
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              ...imageBackgroundPlatformStyles,
            } as ImageBackgroundProps
          }
        >
          <Image
            source={require('@/assets/images/BirdBoxToucan4.gif')}
            style={{
              width: 450,
              height: 318,
              resizeMode: 'contain',
            }}
          />
        </ImageBackground>
        <SoundBoard
          handleAddSound={handleAddSound}
          disabled={birdSingingBack}
        />
        <SongRouter
          songTitle={songTitle}
          onEventSoundFinish={onEventSoundFinish}
          onPlaySong={onPlaySong}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#e7f8ea',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    // gap: 8,
    maxWidth: 550,
    maxHeight: 550,
    marginBottom: 8,
    position: 'relative',
  },
});
