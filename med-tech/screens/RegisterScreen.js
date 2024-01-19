import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [age, setAge] = useState(0);
  const [nic, setNic] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');

  const handlePress = async () => {
    try {
      const response = await axios.post('https://api.medtechs.xyz/api/user/', {
        fname,
        lname,
        age,
        nic,
        username,
        password,
        gender,
        email,
        phone,
        address,
        dob,
        // Add other fields as needed
      });

      console.log(response.data);
      navigation.navigate('Login');

      // Handle successful registration, navigation, etc.
    } catch (error) {
      console.error(error.message); // Log the error message

      // Handle registration error, display an error message, etc.
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.mainContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.textHeading}>Register</Text>
          {/* TextInput */}
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            onChangeText={(text) => setFname(text)}
            value={fname}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            onChangeText={(text) => setLname(text)}
            value={lname}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Age"
            onChangeText={(number) => setAge(number)}
            value={age}
          />
          <TextInput
            style={styles.textInput}
            placeholder="NIC"
            onChangeText={(text) => setNic(text)}
            value={nic}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Gender"
            onChangeText={(text) => setGender(text)}
            value={gender}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Phone"
            onChangeText={(text) => setPhone(text)}
            value={phone}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Address"
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Date of Birth"
            onChangeText={(text) => setDob(text)}
            value={dob}
          />

          {/* Register button */}
          <Pressable style={styles.blueButton} onPress={handlePress}>
            <Text style={{ color: 'white', fontSize: screenHeight <= 740 ? 24 : 32, fontWeight: 700 }}>Register</Text>
          </Pressable>
        </ScrollView>
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
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textHeading: {
    fontSize: 40,
    fontFamily: 'Poppins-Bold',
    marginVertical: 10,
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
});

export default RegisterScreen;
