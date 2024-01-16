import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState,useEffect } from 'react';
import * as Font from 'expo-font';

// Screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserScreen from './screens/UserScreen';
import ResultScreen from './screens/ResultScreen';
import SearchResult from './screens/SearchResult';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
        'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'),
        'Poppins-Italic': require('./assets/fonts/Poppins-Italic.ttf'),
        'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
        'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        // Add any other styles of the font here
      });
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null; // Render nothing while the font is still loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Account" component={UserScreen}/>
        <Stack.Screen name='Result' component={ResultScreen}/>
        <Stack.Screen name='Search' component={SearchResult}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
