import { View, Text, StyleSheet, SafeAreaView,Image, TextInput, Pressable, Dimensions} from 'react-native'
import React, {useLayoutEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import MapView,{Marker} from 'react-native-maps'

const ResultScreen = ({ route }) => {
  const navigation = useNavigation();
  const { marker } = route.params;

  const longitude = marker.longitude
  const latitude = marker.latitude

  console.log(longitude,latitude)
  const userPress = () => { 
    navigation.navigate("Account")
 }


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
  return (
    <SafeAreaView>
        <View style={styles.LogoHeader}>
            <Text style={styles.textHeading}>Result</Text>
            <Pressable style={styles.accountImage} onPress={userPress}>
                <Image source={require('../assets/User.png')}/>
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
          <View style={styles.MapComponent}> 
          <MapView
              style={{ flex: 1, borderTopLeftRadius:50 }}
              initialRegion={{
                latitude: 6.9271,
                longitude: 79.8612,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
                <Marker
                  // coordinate={}
                  title={marker.title}
                  description={marker.description}
                />
            </MapView>
          </View>
        </View>
    </SafeAreaView>
  )
}

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
      MapComponent:{
        width: '90%',
        height:'30%',
        marginTop: 20,
        backgroundColor:'red',
        borderRadius: 30,
      },
      glassmorhpismContainer:{
        width: '95%',
        height:'55%',
        borderRadius: 30,
        padding: 10,
        backgroundColor: 'linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(249, 249, 249, 0.6) 0.01%, rgba(0, 0, 0, 0.00) 100%)',
        boxShadow: '-3px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(10px)'
      },
      heading:{
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
        margin:10,
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
})
export default ResultScreen