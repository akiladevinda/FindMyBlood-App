import React, {Component} from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import HeaderPrimary from '../../components/Header/HeaderPrimary';
import {WebView} from 'react-native-webview';
import Metrics from '../../config/Metrics';

export default class Website extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonOnPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.backButtonOnPress,
    );
  }

  backButtonOnPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  render() {
    return (
      <View style={styles.container}>
        <HeaderPrimary
          title="National Blood Bank Official"
          onPress={() => this.backButtonOnPress()}
        />
        <WebView
          source={{uri: 'http://www.nbts.health.gov.lk/'}}
          style={{height: Metrics.DEVICE_HEIGHT, width: Metrics.DEVICE_WIDTH}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
