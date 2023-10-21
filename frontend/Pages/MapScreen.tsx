<<<<<<< HEAD
import * as React from 'react';
import { View, Text } from 'react-native';

export default function MapScreen({ navigation }: any) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Map Screen</Text>
        </View>
    );
}
=======
import React, { Component } from 'react';
import { View, Text, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';
import axios, { AxiosResponse } from 'axios';
import {REACT_APP_GOOGLE_PLACES_API_KEY} from '@env';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface PlaceResult {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
}

export default class RecyclingCentersMap extends Component {
  state = {
    userLocation: null as Coordinates | null,
    recyclingCenters: [] as PlaceResult[],
  };

  componentDidMount() {
    this.getUserLocation();
  }
  
  getUserLocation = async () => {
    const latitude = 42.36351;
    const longitude = -71.12643;
    const userLocation: Coordinates = { latitude, longitude };
    this.setState({ userLocation });
    this.getNearbyRecyclingCenters(userLocation);
  }  

  getNearbyRecyclingCenters = async (userCoordinates: Coordinates) => {
    try {
      const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
        `location=${userCoordinates.latitude},${userCoordinates.longitude}` +
        `&radius=10000` +
        `&keyword=recycling center` +
        `&key=${REACT_APP_GOOGLE_PLACES_API_KEY}`;

      const response: AxiosResponse = await axios.get(apiUrl);

      if (response.data && response.data.results) {
        const recyclingCenters: PlaceResult[] = response.data.results;
        this.setState({ recyclingCenters });
      } else {
        console.error('Invalid API response');
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { userLocation, recyclingCenters } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {userLocation && (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
              title="Your Location"
            />
            {recyclingCenters.map((center, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: center.geometry.location.lat, longitude: center.geometry.location.lng }}
                title={center.name}
              />
            ))}
          </MapView>
        )}
        {!userLocation && <Text>Loading...</Text>}
      </View>
    );
  }
}
>>>>>>> fafee5974f15057d14c0a25783aa207381f59cf8
