import useBirdBoxStore from '@/components/lib/zustand/useBirdBoxStore';
import SongBook from '@/components/SongBook/SongBook';
import { Link, router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Modal(): JSX.Element {
  const isPresented = router.canGoBack();
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
      <Text>Songbook</Text>
      <SongBook
        onEventSoundFinish={onEventSoundFinish}
        onPlaySong={onPlaySong}
        birdSingingBack={birdSingingBack}
      />
      {isPresented && (
        <Link href="../" disabled={birdSingingBack}>
          Dismiss modal
        </Link>
      )}
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

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     // gap: 8,
//     maxWidth: 550,
//     maxHeight: 550,
//     marginBottom: 8,
//     position: 'relative',
//   },
// });
