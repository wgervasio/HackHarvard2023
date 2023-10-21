<<<<<<< HEAD
import * as React from 'react';
import { View, Text } from 'react-native';

export default function ScannerScreen({ navigation }: any) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Scanner Screen</Text>
        </View>
    );
}
=======
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { Camera } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native';

export default function App() {
  const cameraRef = useRef<Camera | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (cameraRef.current) {
        cameraRef.current.resumePreview();
      }
    }, [])
  );

  if (hasCameraPermission === null) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for the camera not granted. Please change this in settings.</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} ref={(ref) => (cameraRef.current = ref)} />
        <View style={styles.topLeft} />
        <View style={styles.topRight} />
        <View style={styles.bottomLeft} />
        <View style={styles.bottomRight} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  topLeft: {
    position: 'absolute',
    top: 20,
    left: 20,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    width: 40,
    height: 40,
    borderColor: 'white',
  },
  topRight: {
    position: 'absolute',
    top: 20,
    right: 20,
    borderTopWidth: 3,
    borderRightWidth: 3,
    width: 40,
    height: 40,
    borderColor: 'white',
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    width: 40,
    height: 40,
    borderColor: 'white',
  },
  bottomRight: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    width: 40,
    height: 40,
    borderColor: 'white',
  },
});
>>>>>>> fafee5974f15057d14c0a25783aa207381f59cf8
