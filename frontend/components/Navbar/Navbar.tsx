import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MapScreen from '../../Pages/MapScreen';
import ProfileScreen from '../../Pages/ProfileScreen';
import ScannerScreen from '../../Pages/ScannerScreen';

const Tab = createBottomTabNavigator();

export default function Navbar() {
    return(
        <NavigationContainer>
            <Tab.Navigator initialRouteName={"Scanner"}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let icon;
                    let routeName = route.name;

                    if (routeName === "Scanner") {
                        icon = focused ? "camera" : "camera-outline"
                    } else if (routeName === "Map") {
                        icon = focused ? "location" : "location-outline"
                    } else if (routeName === "Profile") {
                        icon = focused ? "person" : "person-outline"
                    }

                    return <Ionicons name={icon!} size={size} color={color}/>
                }
            })}>

            <Tab.Screen name={"Scanner"} component={ScannerScreen}/>
            <Tab.Screen name={"Map"} component={MapScreen}/>
            <Tab.Screen name={"Profile"} component={ProfileScreen}/>
                
            </Tab.Navigator>
        </NavigationContainer>
    );
}