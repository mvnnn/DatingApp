
/**
 * React Native ChatApp LoginPage
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Navigator,
  View
} from 'react-native';
var Login = require('./src/Component/Login');
var ChatRoom = require('./src/Component/chatRoom');
// var Sec = require('./src/Component/sec');

class ChatApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{id: 'first'}}
        renderScene={this.navigatorRenderScene}/>
    );
  }

  navigatorRenderScene(route, navigator) {
  _navigator = navigator;
  switch (route.id) {
    case 'first':
      return (
        <Login navigator={navigator} title="first"/>
      );
    case 'second':
      return (
        <ChatRoom navigator={navigator} title="second" name={route.passProps.name} messages={route.passProps.messages}/>
      );
}}}

AppRegistry.registerComponent('ChatApp', () => ChatApp);
