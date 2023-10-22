import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const loginWithGoogle = () => {
		setIsLoggedIn(true);
	};

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 2000);
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: "#BBD9B4" }}>
			{isLoaded ? (
				isLoggedIn ? (
					<Navbar />
				) : (
					<SplashScreen loginWithGoogle={loginWithGoogle} />
				)
			) : (
				<SplashScreen />
			)}
			<StatusBar style="auto" />
		</View>
	);
}
