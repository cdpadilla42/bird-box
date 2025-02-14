import { View, StyleSheet, Button } from 'react-native';
import useSound from '@/hooks/useSound';

type SoundComponentProps = {
  soundSource: any;
  onPlay?: () => void;
  disabled?: boolean;
};

export default function SoundComponent({
  soundSource,
  onPlay = () => {},
  disabled = false,
}: SoundComponentProps) {
  const { playSound } = useSound({ soundSource, onPlay });

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} disabled={disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
