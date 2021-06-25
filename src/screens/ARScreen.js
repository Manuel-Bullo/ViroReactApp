import React from 'react';
import {ViroARSceneNavigator} from '@viro-community/react-viro';
import ARScene from '../scenes/ARScene';

export default class ARScreen extends React.Component {
  render() {
    return (
      <ViroARSceneNavigator
        worldAlignment={'GravityAndHeading'}
        autofocus={true}
        initialScene={{
          scene: ARScene,
        }}
        style={{flex: 1}}
      />
    );
  }
}
