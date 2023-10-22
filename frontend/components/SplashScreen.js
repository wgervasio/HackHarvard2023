import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import * as Font from "expo-font";

const SplashScreen = () => {
	const [fadeAnim] = useState(new Animated.Value(0));
=======
import { View, Text, Image, StyleSheet, Animated, Easing } from "react-native";
import * as Font from "expo-font";
import { GoogleButton } from "../components/GoogleButton";

const SplashScreen = ({ loginWithGoogle }) => {
	const [fadeAnim] = useState(new Animated.Value(0));
	const [positionAnim] = useState(new Animated.Value(0));
	const [buttonFadeAnim] = useState(new Animated.Value(0));
>>>>>>> main
	const [isFontLoaded, setIsFontLoaded] = useState(false);

	useEffect(() => {
		const loadFont = async () => {
			await Font.loadAsync({
				Montserrat: require("../assets/Montserrat-Bold.ttf"),
			});
			setIsFontLoaded(true);
		};
		loadFont();

<<<<<<< HEAD
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 2000, // You can adjust the duration for the desired fade-in speed
			useNativeDriver: true,
		}).start();
	}, []);

	if (!isFontLoaded) {
		return null; // or a loading indicator
=======
		const positionAnimation = Animated.timing(positionAnim, {
			toValue: -50,
			duration: 500,
			useNativeDriver: true,
			easing: Easing.linear,
		});

		const fadeUpAnimation = Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 1500,
			useNativeDriver: true,
			easing: Easing.linear,
		});

		Animated.sequence([fadeUpAnimation, positionAnimation]).start(() => {
			Animated.timing(buttonFadeAnim, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
				easing: Easing.linear,
			}).start();
		});
	}, []);

	if (!isFontLoaded) {
		return null;
>>>>>>> main
	}

	return (
		<View style={styles.container}>
			<Animated.View
<<<<<<< HEAD
				style={[styles.fadeContainer, { opacity: fadeAnim }]}
=======
				style={[
					styles.fadeContainer,
					{
						opacity: fadeAnim,
						transform: [{ translateY: positionAnim }],
					},
				]}
>>>>>>> main
			>
				<Image
					source={require("../../frontend/assets/app_icon.png")}
					style={styles.image}
					resizeMode="contain"
				/>
<<<<<<< HEAD
				<Text style={styles.text}>App Name</Text>
=======
				<Text style={styles.text}>QuickSort</Text>
			</Animated.View>
			<Animated.View style={{ opacity: buttonFadeAnim }}>
				<GoogleButton
					text="Login with Google"
					onPress={loginWithGoogle}
				/>
>>>>>>> main
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
<<<<<<< HEAD
=======
	button: {
		marginTop: 20,
		padding: 10,
		backgroundColor: "#4CAF50",
		color: "white",
		fontSize: 20,
	},
>>>>>>> main
});

export default SplashScreen;
