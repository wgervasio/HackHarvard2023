import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ViewStyle } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { GoogleLogo } from '../assets/GoogleLogo'; // Update the path accordingly

WebBrowser.maybeCompleteAuthSession();

export const GoogleButton = ({
  text,
  style,
  onPress,
}: {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <GoogleLogo style={styles.logo} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 5,
    backgroundColor: 'white',
    height: 50,
  },
  logo: { marginLeft: 10, marginTop: 1 },
  text: {
    color: '#36454f',
    alignSelf: 'center',
	marginRight: 20,
    marginLeft: 10, 
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default GoogleButton;
