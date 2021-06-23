import React from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {ViroARSceneNavigator} from '@viro-community/react-viro';
import BoxScene from '../scenes/BoxScene';
import {CoordinatesContext} from '../contexts/CoordinatesContext';

export default class ARScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      z: 0,
    };
  }

  onEndEditingX = (event) => {
    this.setState({
      x: parseFloat(event.nativeEvent.text),
    });
  };

  onEndEditingY = (event) => {
    this.setState({
      y: parseFloat(event.nativeEvent.text),
    });
  };

  onEndEditingZ = (event) => {
    this.setState({
      z: parseFloat(event.nativeEvent.text),
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <CoordinatesContext.Provider value={this.state}>
          <ViroARSceneNavigator
            autofocus={true}
            initialScene={{
              scene: BoxScene,
            }}
          />
          <View style={styles.guiViewStyle}>
            <View style={styles.inputCoordinatesStyle}>
              <Text>X</Text>
              <TextInput
                keyboardType={'number-pad'}
                onEndEditing={this.onEndEditingX}></TextInput>
            </View>

            <View style={styles.inputCoordinatesStyle}>
              <Text>Y</Text>
              <TextInput
                keyboardType={'number-pad'}
                onEndEditing={this.onEndEditingY}></TextInput>
            </View>

            <View style={styles.inputCoordinatesStyle}>
              <Text>Z</Text>
              <TextInput
                keyboardType={'number-pad'}
                onEndEditing={this.onEndEditingZ}></TextInput>
            </View>
          </View>
          <Button
            title="Home"
            onPress={() => this.props.navigation.pop()}></Button>
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
