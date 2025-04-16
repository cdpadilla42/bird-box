import useBirdBoxStore from '@/app/store/useBirdBoxStore';
import SongBook from '@/components/SongBook/SongBook';
import { Link, router } from 'expo-router';
import { StyleSheet, Text, TextStyle, View } from 'react-native';

export const textStyles: TextStyle = {
  color: '#95b6b6',
  fontWeight: 'bold',
  fontSize: 20,
  fontStyle: 'italic',
};

export default function Modal(): JSX.Element {
  const canGoBack = router.canGoBack();
  const { getBirdSingingBack, setBirdSingingBack } = useBirdBoxStore();
  const birdSingingBack = getBirdSingingBack();

  function onEventSoundFinish() {
    setBirdSingingBack(false);
  }

  function onPlaySong() {
    setBirdSingingBack(true);
  }

  return (
    <View style={styles.container}>
      <Text style={textStyles}>Songbook</Text>
      <SongBook
        onEventSoundFinish={onEventSoundFinish}
        onPlaySong={onPlaySong}
        birdSingingBack={birdSingingBack}
      />
      <Link href={canGoBack ? '../' : '/'} disabled={birdSingingBack}>
        <Text style={textStyles}>Close</Text>
      </Link>
    </View>
  );
}

export function openModal() {
  router.push('/modal');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7f8ea',
    fontSize: 24,
  },
});
