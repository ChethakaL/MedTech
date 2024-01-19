import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, Pressable, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = () => {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handlePress = async () => {
    try {
      const response = await axios.post('https://api.medtechs.xyz/api/user/login', {
        username,
        password,
      });
      
      // Store the token in AsyncStorage
      await AsyncStorage.setItem('userToken', response.data.token);

      console.log(response.data); // Log the response from the server

      // Handle successful login, navigate to Home, store token, etc.
      navigation.navigate('Home');
    } catch (error) {
      if (error.response) {
        // Log the error response from the server
        console.error(error.response.data);
      } else {
        // Log the general error if there's no response property
        console.error(error.message);
      }

      // Handle login error, display an error message, etc.
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleTextInputFocus = () => {
    setIsTyping(true);
  };

  const handleTextInputBlur = () => {
    setIsTyping(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.LogoHeader}>
          {isTyping ? null : <Text style={{ color: 'black', fontSize: 18 }}>Logo</Text>}
        </View>
        <View style={styles.mainContent}>
          <Text style={styles.textHeading}>Login</Text>
          <Image source={require('../assets/LoginIllustrator.png')} style={{ marginBottom: isTyping ? 0 : 20 }} />
          {/* TextInput */}
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
            onFocus={handleTextInputFocus}
            onBlur={handleTextInputBlur}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password} // remove this when connecting to the backend
            secureTextEntry={true}
            onFocus={handleTextInputFocus}
            onBlur={handleTextInputBlur}
          />
          <Pressable style={styles.blueButton} onPress={handlePress}>
            <Text style={{ color: 'white', fontSize: screenHeight <= 740 ? 24 : 32, fontWeight: 700 }}>Login</Text>
          </Pressable>
          <Text>Forgot Your Password?</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 20,
        paddingBottom: 20,
      },
      android: {
        paddingVertical: 30,
      },
    }),
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  LogoHeader: {
    width: '100%',
    height: screenHeight <= 740 ? 20 : 70,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textHeading: {
    fontSize: 40,
    fontFamily: 'Poppins-Bold',
    margin: 10,
  },
  textInput: {
    color: 'black',
    padding: 20,
    width: 350,
    height: 70,
    backgroundColor: 'rgba(217,217,217,0.4)',
    borderRadius: 10,
    marginBottom: 20,
  },
  blueButton: {
    width: screenHeight <= 740 ? 193 : 293,
    height: screenHeight <= 740 ? 64 : 74,
    backgroundColor: '#6DE5FF',
    borderRadius: 33,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: screenHeight <= 740 ? 5 : 10,
    marginBottom: screenHeight <= 740 ? 5 : 10,
  },
});

export default LoginScreen;
