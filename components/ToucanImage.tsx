import useSound from '@/hooks/useSound';
import React from 'react';
import {
  Image,
  ImageBackground,
  ImageBackgroundProps,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import quack from '@/assets/audio/Quack.mp3';

type ToucanImageProps = {
  disabled: boolean;
};

export default function ToucanImage({ disabled }: ToucanImageProps) {
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
          source={require('@/assets/images/BirdBoxToucan4.gif')}
          style={{
            width: 450,
            height: 318,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
}
