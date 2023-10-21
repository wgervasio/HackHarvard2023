import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import SplashScreen from "./components/Navbar/SplashScreen";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		// Simulate a loading process
		setTimeout(() => {
			setIsLoaded(true);
		}, 2000); // Adjust the duration as per your requirement
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: "#BBD9B4" }}>
			{isLoaded ? <Navbar /> : <SplashScreen />}
			<StatusBar style="auto" />
		</View>
	);
}
