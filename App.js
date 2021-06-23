import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import ARScreen from './src/screens/ARScreen';

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen
            name="AR"
            component={ARScreen}
            options={{unmountOnBlur: true}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
