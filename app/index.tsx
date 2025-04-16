import {
  Image,
  StyleSheet,
  Platform,
  View,
  SafeAreaView,
  ImageBackground,
  Text,
  TouchableOpacity,
  type ImageBackgroundProps,
} from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useSoundMemory } from '@/hooks/useSoundMemory';
import SongRouter from '@/components/SongComponents/SongRouter';
import SoundBoard from '@/components/SoundBoard';
import useBirdBoxStore from '@/components/lib/zustand/useBirdBoxStore';

export default function HomeScreen(): JSX.Element {
  const { getBirdSingingBack, setBirdSingingBack } = useBirdBoxStore();
  const birdSingingBack = getBirdSingingBack();
  const [songTitle, setSongTitle] = useState<string>();
  const [showPlayButton, setShowPlayButton] = useState(Platform.OS === 'web');

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
        {showPlayButton ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                setShowPlayButton(false);
              }}
            >
              <View
                style={{
                  backgroundColor: '#add8e6b7',
                  borderRadius: 100,
                  padding: 15,
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 24,
                    fontStyle: 'italic',
                  }}
                >
                  Play!
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <>
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
            <Link href="/modal" disabled={birdSingingBack}>
              Open modal
            </Link>
          </>
        )}
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
