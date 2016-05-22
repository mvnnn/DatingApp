import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import config from '../../config'
import Firebase from 'firebase';
const FireRef = new Firebase(`${ config.FIREBASE_ROOT }`);

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#48BBEC',
    paddingBottom: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  name: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 21,
    flex: 3,
    // marginTop: 10,
    // marginBottom: 5,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class Badge extends Component{
  constructor(props){
  super(props);
  }
  handleSubmit(){
    FireRef.child(this.props.userInfo).update({
      connectWith:'',
      available: true
    });
    this.props.navigator.push({
      id:'first'
    });
  }
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.name}> {this.props.userInfo} </Text>
        <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
            underlayColor="#88D4F5">
              <Text style={styles.buttonText}>Logout</Text>
          </TouchableHighlight>
      </View>
    )
  }
};

// Badge.propTypes = {
//   userInfo: React.PropTypes.object.isRequired
// }


module.exports = Badge;
