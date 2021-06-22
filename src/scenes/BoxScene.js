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
    diffuseTexture: require('../images/boxplank.jpg'),
  },
});

export default class BoxScene extends React.Component {
  static contextType = CoordinatesContext;

  render() {
    return (
      <ViroARScene>
        <ViroARPlaneSelector>
          <ViroBox
            width={0.25}
            length={0.25}
            height={0.25}
            materials={['boxplank']}
            position={[this.context.x, this.context.y, this.context.z]}
          />
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }
}
