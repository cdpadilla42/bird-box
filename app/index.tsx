import {
  StyleSheet,
  Platform,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useSoundMemory } from '@/hooks/useSoundMemory';
import SongRouter from '@/components/SongComponents/SongRouter';
import SoundBoard from '@/components/SoundBoard';
import useBirdBoxStore from '@/app/store/useBirdBoxStore';
import ToucanImage from '@/components/ToucanImage';

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
  if (!['ios', 'android'].includes(Platform.OS)) {
    imageBackgroundPlatformStyles.width = '100%';
    imageBackgroundPlatformStyles.height = '100%';
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...styles.stepContainer }}>
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
            <ToucanImage disabled={birdSingingBack} />

            <SoundBoard
              handleAddSound={handleAddSound}
              disabled={birdSingingBack}
            />
            <SongRouter
              songTitle={songTitle}
              onEventSoundFinish={onEventSoundFinish}
              onPlaySong={onPlaySong}
            />
          </>
        )}
      </View>
      {!showPlayButton && (
        <View style={styles.songBookButton}>
          <Link href="/modal" disabled={birdSingingBack}>
            <View
              style={{
                backgroundColor: birdSingingBack ? 'pink' : '#eee5b0',
                borderRadius: 100,
                padding: 15,
                width: 50,
                height: 50,
              }}
            ></View>
          </Link>
        </View>
      )}
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
  songBookButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
  },
});
