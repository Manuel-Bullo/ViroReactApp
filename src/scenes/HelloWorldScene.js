import {
  ViroARPlaneSelector,
  ViroARScene,
  ViroBox,
  ViroMaterials,
} from '@viro-community/react-viro';
import React from 'react';
import {CoordinatesContext} from '../contexts/CoordinatesContext';

ViroMaterials.createMaterials({
  boxplank: {
    diffuseTexture: require('../../images/boxplank.jpg'),
  },
});

export default class HelloWorldScene extends React.Component {
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
        <ViroARPlaneSelector>
          <ViroBox
            width={0.5}
            length={0.5}
            height={0.5}
            materials={['boxplank']}
            scale={[0.5, 0.5, 0.5]}
            position={[this.context.x, this.context.y, this.context.z]}
          />
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    /*
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Hello World!',
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }*/
  }
}
