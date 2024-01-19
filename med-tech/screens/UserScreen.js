import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, Pressable, Dimensions, ActivityIndicator } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UserScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({
    fname: '',
    lname: '',
    age: '',
    nic: '',
    password: '',
    username: '',
    gender: '',
    email: '',
  });

  const fetchUserProfile = async () => {
    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem('userToken');

      const response = await axios.get('https://api.medtechs.xyz/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { fname, lname, age, nic, password, username, gender, email } = response.data;

      setUserDetails({
        fname,
        lname,
        age,
        nic,
        password,
        username,
        gender,
        email,
      });

      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
      // Handle error, such as redirecting to the login screen if the token is invalid
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    fetchUserProfile(); // Fetch user details when the component mounts
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.LogoHeader}>
        <Text style={styles.textHeading}>User Account</Text>
        <Pressable style={styles.accountImage} onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/User.png')} />
        </Pressable>
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.textHeading}>User Details</Text>
        {/* Display user details */}
        <TextInput style={styles.textInput} placeholder="First Name" value={userDetails.fname} />
        <TextInput style={styles.textInput} placeholder="Last Name" value={userDetails.lname} />
        <TextInput style={styles.textInput} placeholder="Age" value={userDetails.age} />
        <TextInput style={styles.textInput} placeholder="NIC" value={userDetails.nic} />
        <TextInput style={styles.textInput} placeholder="Username" value={userDetails.username} />
        <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={true} value={userDetails.password} />
        <TextInput style={styles.textInput} placeholder="Gender" value={userDetails.gender} />
        <TextInput style={styles.textInput} placeholder="Email" value={userDetails.email} />
      </View>
    </SafeAreaView>
  );
};

const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LogoHeader: {
    width: '100%',
    height: screenHeight <= 740 ? 20 : 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textHeading: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
    margin: 10,
  },
  textInput: {
    color: 'black',
    padding: 20,
    width: 380,
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
  accountImage: {
    marginRight: 20,
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});

export default UserScreen;
