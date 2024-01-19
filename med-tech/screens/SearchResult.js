import { View, Text, StyleSheet, SafeAreaView, Image, Pressable, Dimensions } from 'react-native';
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const SearchResult = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { query } = route.params;
  const [searchResults, setSearchResults] = useState([]);

  const userPress = () => {
    navigation.navigate('Account');
  };
  const navigateToResult = (marker) => {
    navigation.navigate('Result', { marker });
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`https://api.medtechs.xyz/api/map/search/${query}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error.message);
      }
    };

    fetchSearchResults();
  }, [query]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <View style={styles.LogoHeader}>
        <Text style={styles.textHeading}>Results</Text>
        <Pressable style={styles.accountImage} onPress={userPress}>
          <Image source={require('../assets/User.png')} />
        </Pressable>
      </View>

      <View style={{ padding: 20 }}>
        {searchResults.map((result, index) => (
          <Pressable key={index} onPress={() => navigateToResult(result)}>
            <Text style={styles.resultText}>{result.hospitalName}</Text>
          </Pressable>
        ))}
      </View>
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
            // Apply padding or margin for iOS safe area
            paddingTop: 20,
            paddingBottom: 20,
          },
          android: {
            // Apply padding or margin for Android safe area
            paddingVertical: 30,
          },
        }),
      },
      LogoHeader:{
        width: '100%',
        height: screenHeight <= 740 ? 20 : 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      mainContent:{
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
      },
      textHeading:{
        fontSize: 25,
        fontFamily: 'Poppins-Bold',
        margin:10,
      },
      resultText:{
        fontSize:18,
        fontFamily: 'Poppins-SemiBold',
        paddingBottom:10,
      }
})

export default SearchResult