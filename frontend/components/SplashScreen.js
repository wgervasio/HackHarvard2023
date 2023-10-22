import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import * as Font from "expo-font";

const SplashScreen = () => {
	const [fadeAnim] = useState(new Animated.Value(0));
	const [isFontLoaded, setIsFontLoaded] = useState(false);

	useEffect(() => {
		const loadFont = async () => {
			await Font.loadAsync({
				Montserrat: require("../assets/Montserrat-Bold.ttf"),
			});
			setIsFontLoaded(true);
		};
		loadFont();

		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 2000,
			useNativeDriver: true,
		}).start();
	}, []);

	if (!isFontLoaded) {
		return null;
	}

	return (
		<View style={styles.container}>
			<Animated.View
				style={[styles.fadeContainer, { opacity: fadeAnim }]}
			>
				<Image
					source={require("../../frontend/assets/app_icon.png")}
					style={styles.image}
					resizeMode="contain"
				/>
				<Text style={styles.text}>QuickSort</Text>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#BBD9B4",
		justifyContent: "center",
		alignItems: "center",
	},
	fadeContainer: {
		alignItems: "center",
	},
	image: {
		width: 280,
		height: 280,
	},
	text: {
		fontSize: 50,
		color: "#F7F7E1",
		fontFamily: "Montserrat",
		fontWeight: "bold",
	},
});

export default SplashScreen;
