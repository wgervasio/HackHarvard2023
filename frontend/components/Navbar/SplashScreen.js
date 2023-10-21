import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";

const SplashScreen = () => {
	const [fadeAnim] = useState(new Animated.Value(0));

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 2000, // You can adjust the duration for the desired fade-in speed
			useNativeDriver: true,
		}).start();
	}, []);

	return (
		<View style={styles.container}>
			<Animated.View
				style={[styles.fadeContainer, { opacity: fadeAnim }]}
			>
				<Image
					source={require("./logo")}
					style={styles.image}
					resizeMode="contain"
				/>
				<Text style={styles.text}>Your Splash Screen Text</Text>
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
		width: 280, // Adjust the width as per your requirement
		height: 280, // Adjust the height as per your requirement
		top: 50,
	},
	text: {
		fontSize: 20,
		color: "black", // Customize the text color here
	},
});

export default SplashScreen;
