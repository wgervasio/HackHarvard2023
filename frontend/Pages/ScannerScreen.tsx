import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native';
import fetch from 'node-fetch'; // Import the 'node-fetch' library for making HTTP requests


export default function App() {
  const cameraRef = useRef<Camera | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

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
  const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/yangy50/garbage-classification";
  const BEARER_TOKEN = "Token"; // Replace with your actual Hugging Face Bearer token
  
  function getTopPrediction(predictions:any) {
    // Sort the predictions from highest to lowest based on the score.
    predictions.sort((a:any, b:any) => b.score - a.score);
  
    // Check if the top score meets the minimum threshold.
    if (predictions[0].score > 0.60) {
      return predictions[0].label;
    } else {
      return 'n/a';
    }
  }

  const sendPhotoToServer = async (photoUri: string) => {
    try {
      // This is where we fetch the raw data from the image
      const photoData = await fetch(photoUri);
      const blob = await photoData.blob();
  
      console.log('Sending photo to Hugging Face Model');
  
      const response = await fetch(HUGGINGFACE_API_URL, {
        method: 'POST',
        body: blob, // Now we send the raw image directly
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`,
          'Content-Type': blob.type, // This would be 'image/jpeg' if it's a jpeg image
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        // console.log('Prediction result:', result);
        // You can set the result to the state or handle it any other way
        // [{"label": "cardboard", "score": 0.8171940445899963}, 
        // {"label": "paper", "score": 0.12719671428203583}, 
        // {"label": "trash", "score": 0.024590767920017242}, 
        // {"label": "plastic", "score": 0.012262715958058834}, 
        // {"label": "metal", "score": 0.011666516773402691}]  
        return getTopPrediction(result);

      } else {
        console.error('Failed to send photo to the Hugging Face Model');
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending photo to the Hugging Face Model:', error);
    }
  };
  

  const cancelPicture = () => {
    setPhoto(null);
    if (cameraRef.current) {
      cameraRef.current.resumePreview(); // This is important to make sure the camera starts capturing the preview again.
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.1, base64: false, skipProcessing: false };
        const data = await cameraRef.current.takePictureAsync(options);
        setPhoto(data.uri);
        sendPhotoToServer(data.uri);
        
  
        // Send the captured photo to your Flask server
        
      } catch (error) {
        console.error('Error taking picture: ', error);
      }
    }
  };
  
  


  const sendPhotoToServer = async (photoUri: string) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: photoUri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
      console.log('about to send response')

      console.log("POST" + SERVERURL + '/predict')
      // const response = await fetch(SERVERURL + '/predict', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      const response = await fetch(SERVERURL, {
        method: 'GET',
        // body: formData,
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      });
      console.log('sent response')
  
      if (response.ok) {
        const result = await response.json();
        console.log('Prediction result:', result);
        // Handle the prediction result as needed
      } else {
        console.error('Failed to send photo to the server');
      }
    } catch (error) {
      console.error('Error sending photo to the server:', error);
    }
  };
  

  const cancelPicture = () => {
    setPhoto(null);
    if (cameraRef.current) {
      cameraRef.current.resumePreview(); // This is important to make sure the camera starts capturing the preview again.
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.1, base64: false, skipProcessing: false };
        const data = await cameraRef.current.takePictureAsync(options);
        setPhoto(data.uri);
        sendPhotoToServer(data.uri);
        
  
        // Send the captured photo to your Flask server
        
      } catch (error) {
        console.error('Error taking picture: ', error);
      }
    }
  };
  
  


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        {photo ? (
          <View style={{ flex: 1 }}>
            <Image source={{ uri: photo }} style={{ flex: 1 }} />
            <TouchableOpacity style={styles.cancelButton} onPress={cancelPicture}>
              <Text style={styles.cancelButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <Camera style={styles.camera} ref={(ref) => (cameraRef.current = ref)} />
            <View style={styles.topLeft} />
            <View style={styles.topRight} />
            <View style={styles.bottomLeft} />
            <View style={styles.bottomRight} />
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.innerCircle}></View>
            </TouchableOpacity>
          </View>
        )}
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
  captureButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 35, // Half of the button size for a perfect circle
    borderWidth: 5,   // This creates the outer circle effect
    borderColor: 'white',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  innerCircle: {  // This is the inner circle of the button
    backgroundColor: '#000',
    borderRadius: 30,  // Half of the inner circle size
    width: 60,
    height: 60,
  },
  captureButtonText: {
    fontSize: 24, // emoji size
  },
  cancelButton: {
    position: 'absolute',
    top: 20, // position from top
    right: 20, // position from right
    backgroundColor: 'transparent', 
  },
  cancelButtonText: {
    fontSize: 25, // make it large
    color: 'white', // white cross mark
    fontWeight: 'bold', // bold cross mark
  }
});