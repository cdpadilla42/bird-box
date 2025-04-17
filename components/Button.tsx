import React from 'react';
import { View, TouchableOpacity } from 'react-native';

type Props = {
  onPress: () => void;
  disabled?: boolean;
};

export default function MusicNoteButton({
  onPress = () => {},
  disabled = false,
}: Props) {
  const handlePress = () => {
    if (disabled) return;
    onPress();
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={{
          backgroundColor: disabled ? 'pink' : '#ADD8E6',
          borderRadius: 100,
          padding: 15,
          width: 50,
          height: 50,
        }}
      ></View>
    </TouchableOpacity>
  );
}
