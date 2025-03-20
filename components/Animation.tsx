import React from 'react';
import { Image } from 'react-native';

export default function Animation(props) {
  return (
    <div>
      <Image
        // style={styles.tinyLogo}
        source={require('@/assets/images/BirdBoxToucan1.png')}
        style={{
          width: 450,
          height: 318,
          // aspectRatio: 2480 / 3508,
          resizeMode: 'contain',
        }}
      />
      <Image
        // style={styles.tinyLogo}
        source={require('@/assets/images/BirdBoxToucan2.png')}
        style={{
          width: 450,
          height: 318,
          // aspectRatio: 2480 / 3508,
          resizeMode: 'contain',
        }}
      />
    </div>
  );
}
