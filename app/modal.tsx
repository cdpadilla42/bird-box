import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Modal() {
  return (
    <View style={styles.container}>
      <Text>Modal screen</Text>
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
  },
});
