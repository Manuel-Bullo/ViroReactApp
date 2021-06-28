import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import ARScreen from './src/screens/ARScreen';

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator screenOptions={{
      headerShown: false
    }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen
      name="AR"
      component={ARScreen}
      options={{unmountOnBlur: true}}
      initialParams={{
        locationReady: false,
        cameraReady: false
      }}
    />
  </Tab.Navigator>
)

export type Props = {

};

const App: React.FC<Props> = ({

}) => {
  return(
    <NavigationContainer>
        <TabNavigator />
    </NavigationContainer>
  );
}

export default App;