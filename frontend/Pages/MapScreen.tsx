import React, { Component } from 'react';
import { View, Text, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';
import axios, { AxiosResponse } from 'axios';
import {REACT_APP_GOOGLE_PLACES_API_KEY} from '@env';

const GOOGLE_PLACES_API_KEY = REACT_APP_GOOGLE_PLACES_API_KEY;
console.log(GOOGLE_PLACES_API_KEY)
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
        `&key=${GOOGLE_PLACES_API_KEY}`;

      const response: AxiosResponse = await axios.get(apiUrl);

      if (response.data && response.data.results) {
        console.log('API Response:', response.data);
        const recyclingCenters: PlaceResult[] = response.data.results;
        this.setState({ recyclingCenters });
        console.log(recyclingCenters)
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
