import React from 'react';
import {
  ViroNode,
  ViroARScene,
  ViroConstants,
  Viro3DObject,
  ViroAmbientLight,
} from '@viro-community/react-viro';
import {Platform, ToastAndroid} from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import beacons from '../beacons.json';

const Toast = (message: string) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};

const distanceBetweenPoints = (p1: any, p2: any) => {
  if (!p1 || !p2) {
    return 0;
  }

  var R = 6371; // Radius of the Earth in km
  var dLat = ((p2.latitude - p1.latitude) * Math.PI) / 180;
  var dLon = ((p2.longitude - p1.longitude) * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((p1.latitude * Math.PI) / 180) *
      Math.cos((p2.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

export interface Props {

}

interface State {
  nearbyPlaces: any,
  tracking: boolean,
  compassHeading: number,
  isRendered: boolean,
}

export default class ARScene extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      nearbyPlaces: undefined,
      tracking: false,
      compassHeading: undefined,
      isRendered: false,
    };

    this._onInitialized = this._onInitialized.bind(this);
    this.transformGpsToAR = this.transformGpsToAR.bind(this);
    this.latLongToMerc = this.latLongToMerc.bind(this);
    this.placeARObjects = this.placeARObjects.bind(this);
    this.getNearbyPlaces = this.getNearbyPlaces.bind(this);
  }

  componentDidMount() {
    CompassHeading.start(3, (heading) => {
      if (typeof this.state.compassHeading == 'undefined') {
        console.log("compassHeading: " + heading.heading);
        this.setState({compassHeading: heading.heading});
      }
    });
  }

  componentWillUnmount() {
    CompassHeading.stop();
  }

  latLongToMerc = (latDeg: number, longDeg: number) => {
    // From: https://gist.github.com/scaraveos/5409402
    const longRad = (longDeg / 180.0) * Math.PI;
    const latRad = (latDeg / 180.0) * Math.PI;
    const smA = 6378137.0;
    const xmeters = smA * longRad;
    const ymeters = smA * Math.log((Math.sin(latRad) + 1) / Math.cos(latRad));
    return {x: xmeters, y: ymeters};
  };

  transformGpsToAR = (lat: number, lng: number) => {
    const isAndroid = Platform.OS === 'android';
    const latObj = lat;
    const longObj = lng;
    const latMobile = global.location.latitude; //test
    const longMobile = global.location.longitude; //test

    const deviceObjPoint = this.latLongToMerc(latObj, longObj);
    const mobilePoint = this.latLongToMerc(latMobile, longMobile);
    const objDeltaY = deviceObjPoint.y - mobilePoint.y;
    const objDeltaX = deviceObjPoint.x - mobilePoint.x;

    if (isAndroid) {
      let degree = this.state.compassHeading;
      let angleRadian = (degree * Math.PI) / 180;

      let newObjX =
        objDeltaX * Math.cos(angleRadian) - objDeltaY * Math.sin(angleRadian);
      let newObjY =
        objDeltaX * Math.sin(angleRadian) + objDeltaY * Math.cos(angleRadian);

        return {x: newObjX, z: -newObjY};
    }

    return {x: objDeltaX, z: -objDeltaY};
  };

  // Used for dynamicly render objects depending on the location
  getNearbyPlaces = () => {
    /*this.setState({
      nearbyPlaces: beacons,
    });*/
  };

  placeARObjects = () => {
    if (typeof this.state.compassHeading == 'undefined') {
      return undefined;
    }

    console.log("placeARObjects");

    this.setState({isRendered: true});

    const ARTags = beacons.map((item: any) => {
      const coords = this.transformGpsToAR(item.lat, item.lng);
      const scale = Math.abs(Math.round(coords.z / 15));
      const distance = distanceBetweenPoints(global.location, {
        latitude: item.lat,
        longitude: item.lng,
      });

      return (
        <ViroNode key={'node' + item.id}>
          <Viro3DObject
            key={item.id}
            source={require('../models/GLB/monkey.glb')}
            resources={[require('../models/GLB/monkey_texture.jpeg')]}
            position={[coords.x, 0, coords.z]}
            scale={[1, 1, 1]}
            type="GLB"
          />
        </ViroNode>
      );
    });

    return ARTags;
  };

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return !this.state.isRendered;
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroAmbientLight color="#FFFFFF" key={'light1'} />
        {this.placeARObjects()}
      </ViroARScene>
    );
  }

  _onInitialized(state: any, reason: any) {
    this.setState(
      {
        tracking:
          state == ViroConstants.TRACKING_NORMAL ||
          state == ViroConstants.TRACKING_LIMITED,
      },
      () => {
        if (this.state.tracking) {
          Toast('All set!');
        } else {
          //Toast(`Move your device around gently to calibrate AR (${reason}) and compass.`);
        }
      },
    );
  }
}