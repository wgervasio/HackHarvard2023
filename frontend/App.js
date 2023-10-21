import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import Navbar from './components/Navbar/Navbar';
import SplashScreen from './components/SplashScreen';

export default function App() {
  return (
	<SplashScreen/>
    <Navbar/>
  );
}