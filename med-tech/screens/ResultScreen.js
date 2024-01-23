import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Pressable, Dimensions, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const ResultScreen = ({ route }) => {
  const navigation = useNavigation();
  const { longitude, latitude, marker } = route.params;

  // Log for debugging
  console.log('Latitude received:', latitude);
  console.log('Longitude received:', longitude);

  const userPress = () => {
    navigation.navigate('Account');
  };

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.LogoHeader}>
        <Text style={styles.textHeading}>Result</Text>
        <Pressable style={styles.accountImage} onPress={userPress}>
          <Image source={require('../assets/User.png')} />
        </Pressable>
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.textHeading}>{marker.hospitalName}</Text>

        <View style={styles.glassmorhpismContainer}>
          <Text style={styles.heading}>Available</Text>
          {marker.equipmentDetails.map((equipment, index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.column}>{equipment.name}</Text>
              <Text style={styles.column}>{equipment.availableFrom}</Text>
              <Text style={styles.column}>{equipment.availableTo}</Text>
              <Text style={styles.column}>{`Rs.${equipment.testPrice}`}</Text>
            </View>
          ))}
        </View>
        <Pressable style={styles.mapBtn} onPress={openGoogleMaps}>
          <Text style={styles.mapText}>View Direction</Text>
        </Pressable>
        <MapView
          style={styles.mapView}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={{ latitude, longitude }} title={marker.hospitalName} />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
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
  accountImage: {
    marginRight: 20,
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  glassmorhpismContainer: {
    width: '95%',
    height: screenHeight <= 740 ? '25%' : '48%',
    borderRadius: 30,
    padding: 10,
    backgroundColor: 'linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(249, 249, 249, 0.6) 0.01%, rgba(0, 0, 0, 0.00) 100%)',
    boxShadow: '-3px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(10px)',
  },
  heading: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 10,
  },
  column: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    padding: 5,
  },
  mapBtn: {
    width: '80%',
    height: '10%',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#23e23e',
    marginTop: '5%',
  },
  mapText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  mapView: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginTop: 10,
  },
});

export default ResultScreen;
