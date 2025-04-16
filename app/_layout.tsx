import { useFonts } from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
import Page from './index';

import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { BirdSingingBackContext } from '@/components/lib/birdSingingBackContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [birdSingingBack, setBirdSingingBack] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          navigationBarHidden: true,
        }}
        initialParams={{ birdSingingBack, setBirdSingingBack }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
        }}
        initialParams={{ birdSingingBack, setBirdSingingBack }}
      />
    </Stack>
  );
}
