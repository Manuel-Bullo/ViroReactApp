import React from 'react';
import {ViroARSceneNavigator} from '@viro-community/react-viro';
import ARScene from '../scenes/ARScene';

export type Props = {};

const ARScreen: React.FC<Props> = ({

}) => {
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

export default ARScreen;
