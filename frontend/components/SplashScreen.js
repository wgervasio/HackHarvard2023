import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Animated, Easing } from "react-native";
import * as Font from "expo-font";
import { GoogleButton } from "../components/GoogleButton";

const SplashScreen = ({ loginWithGoogle }) => {
	const [fadeAnim] = useState(new Animated.Value(0));
	const [positionAnim] = useState(new Animated.Value(0));
	const [buttonFadeAnim] = useState(new Animated.Value(0));
	const [isFontLoaded, setIsFontLoaded] = useState(false);

	useEffect(() => {
		const loadFont = async () => {
			await Font.loadAsync({
				Montserrat: require("../assets/Montserrat-Bold.ttf"),
			});
			setIsFontLoaded(true);
		};
		loadFont();

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
	}

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					styles.fadeContainer,
					{
						opacity: fadeAnim,
						transform: [{ translateY: positionAnim }],
					},
				]}
			>
				<Image
					source={require("../../frontend/assets/app_icon.png")}
					style={styles.image}
					resizeMode="contain"
				/>
				<Text style={styles.text}>QuickSort</Text>
			</Animated.View>
			<Animated.View style={{ opacity: buttonFadeAnim }}>
				<GoogleButton
					text="Login with Google"
					onPress={loginWithGoogle}
				/>
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
	button: {
		marginTop: 20,
		padding: 10,
		backgroundColor: "#4CAF50",
		color: "white",
		fontSize: 20,
	},
});

export default SplashScreen;
