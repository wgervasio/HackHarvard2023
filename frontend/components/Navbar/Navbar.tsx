import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

import MapScreen from '../../Pages/MapScreen';
import ProfileScreen from '../../Pages/ProfileScreen';
import ScannerScreen from '../../Pages/ScannerScreen';

const Tab = createBottomTabNavigator();

export default function Navbar() {
	return (
		<NavigationContainer>
		  <Tab.Navigator
			initialRouteName={'Scanner'}
			screenOptions={({ route }) => ({
			  tabBarIcon: ({ focused, color, size }) => {
				let icon;
				let routeName = route.name;
	  
				if (routeName === 'Scanner') {
				  icon = focused ? 'camera' : 'camera-outline';
				} else if (routeName === 'Map') {
				  icon = focused ? 'location' : 'location-outline';
				} else if (routeName === 'Profile') {
				  icon = focused ? 'person' : 'person-outline';
				}
	  
				return (
				  <View
					style={{
					  width: 60,
					  height: 60,
					  borderRadius: 30,
					  backgroundColor: focused ? '#BBD9B4' : 'transparent',
					  justifyContent: 'center',
					  alignItems: 'center',
					  borderWidth: 5,
    				  borderColor: focused? 'white': 'transparent',
					}}
				  >
					<Ionicons name={icon!} size={size} color={focused ? 'white' : '#BBD9B4'} />
				  </View>
				);
			  },
			  tabBarLabel: '',
			})}
		  >
			<Tab.Screen name={'Map'} component={MapScreen} />
			<Tab.Screen name={'Scanner'} component={ScannerScreen} />
			<Tab.Screen name={'Profile'} component={ProfileScreen} />
		  </Tab.Navigator>
		</NavigationContainer>
	  );
}

