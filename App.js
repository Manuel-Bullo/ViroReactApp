import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  ViroFlexView,
  ViroBox,
  ViroMaterials,
} from '@viro-community/react-viro';
import HelloWorldScene from './src/scenes/HelloWorldScene';
import {CoordinatesContext} from './src/contexts/CoordinatesContext';

export default class App extends React.Component {
  state = {
    x: 0,
    y: 0,
    z: 0,
  };

  render() {
    xHandler = (event) => {
      const value = parseFloat(event.nativeEvent.text);
      this.setState({
        x: value,
      });
    };

    yHandler = (event) => {
      const value = parseFloat(event.nativeEvent.text);
      this.setState({
        y: value,
      });
    };

    zHandler = (event) => {
      const value = parseFloat(event.nativeEvent.text);
      this.setState({
        z: value,
      });
    };

    return (
      <View style={{flex: 1}}>
        <CoordinatesContext.Provider value={this.state}>
          <ViroARSceneNavigator
            autofocus={true}
            initialScene={{
              scene: HelloWorldScene,
            }}
          />
          <View style={styles.guiViewStyle}>
            <View style={styles.inputCoordinatesStyle}>
              <Text>X</Text>
              <TextInput
                keyboardType={'number-pad'}
                onEndEditing={xHandler}></TextInput>
            </View>

            <View style={styles.inputCoordinatesStyle}>
              <Text>Y</Text>
              <TextInput
                keyboardType={'number-pad'}
                onEndEditing={yHandler}></TextInput>
            </View>

            <View style={styles.inputCoordinatesStyle}>
              <Text>Z</Text>
              <TextInput
                keyboardType={'number-pad'}
                onEndEditing={zHandler}></TextInput>
            </View>
          </View>
        </CoordinatesContext.Provider>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  guiViewStyle: {
    backgroundColor: 'rgba(255, 120, 0, 0.5)',
    position: 'absolute',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  inputCoordinatesStyle: {
    flex: 1,
    alignItems: 'center',
  },
});
