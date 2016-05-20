import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#48BBEC',
    paddingBottom: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    alignSelf: 'center'
  }
});

class Badge extends Component{
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.name}> {this.props.userInfo} </Text>
      </View>
    )
  }
};

// Badge.propTypes = {
//   userInfo: React.PropTypes.object.isRequired
// }


module.exports = Badge;
