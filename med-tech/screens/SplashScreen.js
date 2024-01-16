import { View, Text, StyleSheet, SafeAreaView,Image, TextInput, Pressable, Dimensions} from 'react-native'
import React, { useLayoutEffect, useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();
    const screenHeight = Dimensions.get('window').height;

    const handlePress = () => { 
        navigation.navigate('Login');
    }
    const handleRegister = () => { 
        navigation.navigate('Register');
     }
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/MedTechSplash.png')} style={{height: screenHeight <= 740 ? 440 : 640, borderBottomRightRadius: 80,}}/>
      </View>
      <View>
        <Pressable style={styles.blueButton} onPress={handlePress}>
          <Text style={{color:'white', fontSize: screenHeight <= 740 ? 24 : 32, fontWeight: 700}}>Login</Text>
        </Pressable>
        <Pressable style={styles.grayButton} onPress={handleRegister}>
          <Text style={{color:'white', fontSize: screenHeight <= 740 ? 24 : 32, fontWeight: 700}}>Register</Text>
        </Pressable>
      </View>
    </View>
  )
}


const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        alignItems:'center'
    },
    imageContainer:{
        width:'100%',
        height: screenHeight <= 740 ? 440 : 640,
        borderBottomRightRadius: 80,
    },
    blueButton:{
        width: screenHeight <= 740 ? 193 : 293,
        height: screenHeight <= 740 ? 64 : 74,
        backgroundColor: '#6DE5FF',
        borderRadius: 33,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        marginTop: screenHeight <= 740 ? 20 : 40,
      },
      grayButton:{
        width: screenHeight <= 740 ? 193 : 293,
        height: screenHeight <= 740 ? 64 : 74,
        backgroundColor: '#D9D9D9',
        borderRadius: 33,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        marginTop: screenHeight <= 740 ? 20 : 40,
      }
})

export default SplashScreen