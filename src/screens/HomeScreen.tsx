import React from 'react';
import {useState} from 'react';
import {View, Text} from 'react-native';
import {Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {requestMultiple, PERMISSIONS, RESULTS} from 'react-native-permissions';

const HomeScreen = ({navigation}) => {
  const [locationReady, setLocationReady] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [geoSuccess, setGeoSuccess] = useState(false);
  let listener: any;

  const permissions = Platform.select({
    ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
    android: [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ],
  });

  requestMultiple(permissions).then((statuses: any) => {
    if (Platform.OS == 'ios') {
      setLocationReady(statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED);
      setCameraReady(statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED);
    } else {
      setLocationReady(statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED);
      setCameraReady(statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED);
    }

    if (cameraReady && locationReady) {
      const geoSuccess = (result: any) => {
        setGeoSuccess(true);
        global.location = result.coords;
      };
    
      listener = Geolocation.watchPosition(geoSuccess, (error) => {}, {
        distanceFilter: 10,
      });
    }
  });

  if (geoSuccess)
    return (
      <View style={{flex: 1}}>
        <Text>Home AR</Text>
        <Text>Ready!</Text>
      </View>
    );
  else
    return (
      <View>
        <Text>Home AR</Text>
      </View>
    );
}

export default HomeScreen;