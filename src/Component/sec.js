var React = require('react-native');

var {
  View,
  Text,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    flex: 1,
    marginLeft: 15
  },
});

class Separator extends React.Component{
  render(){
    return (
      <View>
        <Text>{this.props.name}</Text>
      </View>
    );
  }
};

module.exports = Separator;
