import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

type Props = {
  onPress: () => void;
  title: string;
  disabled: boolean;
};

export default function MusicNoteButton({
  onPress = () => {},
  title = '',
  disabled = false,
}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: disabled ? 'pink' : '#ADD8E6',
          borderRadius: 100,
          padding: 15,
          width: 45,
          height: 45,
        }}
      >
        {/* <Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>
          {title}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
}
