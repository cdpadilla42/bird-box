import useSound from '@/hooks/useSound';
import React from 'react';
import {
  Image,
  ImageBackground,
  ImageBackgroundProps,
  ImageSourcePropType,
  Platform,
  TouchableOpacity,
} from 'react-native';
import quack from '@/assets/audio/Quack.mp3';
import ToucanResting from '@/assets/images/BirdBoxToucanResting.gif';
import ToucanSinging from '@/assets/images/BirdBoxToucan5.gif';
import useBirdBoxStore from '@/app/store/useBirdBoxStore';

type ToucanImageProps = {
  disabled: boolean;
};

export default function ToucanImage({ disabled }: ToucanImageProps) {
  const { getBirdSingingBack } = useBirdBoxStore();
  const birdSingingBack = getBirdSingingBack();
  const { playSound, stopSound } = useSound({
    soundSource: quack,
    playOnLoad: false,
  });

  const imageBackgroundPlatformStyles: { width?: string; height?: string } = {};
  if (!['ios', 'android'].includes(Platform.OS)) {
    imageBackgroundPlatformStyles.width = '100%';
    imageBackgroundPlatformStyles.height = '100%';
  }

  const playSoundAndStopOthers = async () => {
    stopSound();
    console.log('playSoundAndStopOthers');
    await playSound();
  };

  return (
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
      <TouchableOpacity
        onPress={playSoundAndStopOthers}
        disabled={disabled}
        activeOpacity={1}
      >
        <Image
          source={ToucanResting as ImageSourcePropType}
          style={{
            width: 450,
            height: 318,
            resizeMode: 'contain',
            display: birdSingingBack ? 'none' : 'flex',
          }}
        />
        <Image
          source={ToucanSinging as ImageSourcePropType}
          style={{
            width: 450,
            height: 318,
            resizeMode: 'contain',
            display: birdSingingBack ? 'flex' : 'none',
          }}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
}
