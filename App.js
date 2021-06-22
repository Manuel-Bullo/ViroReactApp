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

const CoordinatesContext = React.createContext([0, 0, -3]);

class HelloWorldSceneAR extends Component {
  constructor(props) {
    super(props);
    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
    };
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  static contextType = CoordinatesContext;

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroBox
          width={0.5}
          length={0.5}
          height={0.5}
          materials={['boxplank']}
          scale={[0.5, 0.5, 0.5]}
          position={this.context}
        />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Hello World!',
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

ViroMaterials.createMaterials({
  boxplank: {
    diffuseTexture: require('./images/boxplank.jpg'),
  },
});

export default class App extends React.Component {
  state = {
    coordinates: [0, 0, -1],
  };

  render() {
    xHandler = (event) => {
      const x = parseFloat(event.nativeEvent.text);
      this.setState({
        coordinates: [x, this.state.coordinates[1], this.state.coordinates[2]],
      });
    };

    yHandler = (event) => {
      const y = parseFloat(event.nativeEvent.text);
      this.setState({
        coordinates: [this.state.coordinates[0], y, this.state.coordinates[2]],
      });
    };

    zHandler = (event) => {
      const z = parseFloat(event.nativeEvent.text);
      this.setState({
        coordinates: [this.state.coordinates[0], this.state.coordinates[1], z],
      });
    };

    return (
      <View style={{flex: 1}}>
        <CoordinatesContext.Provider value={this.state.coordinates}>
          <ViroARSceneNavigator
            autofocus={true}
            initialScene={{
              scene: HelloWorldSceneAR,
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
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
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
