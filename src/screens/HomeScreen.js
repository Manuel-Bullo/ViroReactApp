import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Home</Text>
        <Button
          title="AR"
          onPress={() => this.props.navigation.navigate('AR')}></Button>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  button: {},
});
