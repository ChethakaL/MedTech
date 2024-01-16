import { View, Text, StyleSheet, SafeAreaView,Image, TextInput, Pressable, Dimensions} from 'react-native'
import React, { useLayoutEffect,useState,useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import MapView,{Marker} from 'react-native-maps'
import axios from 'axios';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null); // State to store user's location
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMarker = (marker) => {
    setSelectedMarker(marker);
    navigation.navigate('Result', { marker });
  };

  const handleSearch = () => {
    navigation.navigate('Search', { query: searchQuery });
  };
  

  const userPress = () => {
    navigation.navigate('Account');
  };

  useEffect(() => {
    const fetchNearbyHospitals = async () => {
      try {
        const response = await axios.get('http://192.168.1.189:4000/api/map/all');
        setMarkers(response.data);
      } catch (error) {
        console.error('Error fetching nearby hospitals:', error.message);
      }
    };

    // Fetch user's location here if needed

    fetchNearbyHospitals();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.LogoHeader}>
        <Text style={styles.textHeading}>Main Menu</Text>
        <Pressable style={styles.accountImage} onPress={userPress}>
          <Image source={require('../assets/User.png')} />
        </Pressable>
      </View>
      <View style={styles.mainContent}>
        <View style={{display:'flex', flexDirection:'row', height: '8%', alignItems:'center'}}>
          <TextInput
            style={styles.searchContainer}
            placeholder="Search"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)} // Update searchQuery state
          />
          <Pressable style={styles.searchBtn} onPress={handleSearch}>
            <Text style={{color:'white', fontWeight:'800'}}>Search</Text>
          </Pressable>
        </View>
        <View style={styles.mainMapComponent}>
          <MapView
            style={{ flex: 1, borderTopLeftRadius: 50 }}
            initialRegion={{
              latitude: 6.9271,
              longitude: 79.8612,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {/* Display user's location */}
            {userLocation && <Circle center={userLocation} radius={50} fillColor="rgba(255, 0, 0, 0.5)" />}
            
            {/* Display markers for hospitals */}
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.location.latitude,
                  longitude: marker.location.longitude,
                }}
                title={marker.hospitalName}
                description={`Details about ${marker.hospitalName}`}
                onPress={() => handleMarker(marker)}
              />
            ))}
          </MapView>
        </View>
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
      textInput: {
        color: 'black',
        padding: 20,
        width: 380,
        height:70,
        backgroundColor: 'rgba(217,217,217,0.4)',
        borderRadius: 10,
        marginBottom: 20,
      },
      blueButton:{
        width: screenHeight <= 740 ? 193 : 293,
        height: screenHeight <= 740 ? 64 : 74,
        backgroundColor: '#6DE5FF',
        borderRadius: 33,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        marginTop: screenHeight <= 740 ? 5 : 10,
        marginBottom: screenHeight <= 740 ? 5 : 10,

      },
      accountImage:{
        marginRight: 20,
        width:60,
        height: 60,
        borderRadius:50,
      },
      searchContainer: {
        width:'80%',
        height:'90%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(109,229,255,0.3)', // Adjust background color as needed
        borderRadius: 10,
        margin: 10,
        paddingHorizontal: 10,
      },
      searchIcon: {
        marginRight: 10,
      },
      searchInput: {
        flex: 1,
        height: 40,
        color: '#000',
        fontSize: 16,
      },
      mainMapComponent:{
        width: '100%',
        height:'90%',
        marginTop: 20,
        backgroundColor:'red',
        borderTopLeftRadius:'70px',
      },
      searchBtn:{
        width:60,
        height:'90%',
        backgroundColor: 'black',
        borderRadius: 20,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
      }
})

export default HomeScreen