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
					source={require("../../assets/app_logo.png")}
					style={styles.image}
					resizeMode="contain"
				/>
				<Text style={styles.text}>App Name</Text>
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
