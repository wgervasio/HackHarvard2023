import MapView from "react-native-maps";

const Map = () => {
	return <MapView style={styles.map} />;
};

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
});

export default Map;
