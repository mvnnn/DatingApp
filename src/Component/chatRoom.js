
/**
 * React Native ChatApp chatRoomPage
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

var api =  require('../Api/chatApi');
var Separator = require('../Helper/Separator');
var Badge = require('./Badge');
import config from '../../config'
import Firebase from 'firebase';
const FireRef = new Firebase(`${ config.FIREBASE_ROOT }`);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10,
  },
  rowContainer1: {
    padding: 10,
    flexDirection: 'row',
  },
  forUser:{
    flex:3,
    fontSize:18,
    color: "#FF0000",
  },
  forTime:{
    flex:4,
    justifyContent: 'flex-end',
    color: "#00FF00",
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

class chatRoom extends Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.messages),
      message: '',
      error: '',
      connectedUser:'',
      count:0
    }
    this.msg = this.props.messages;
    this.CUData = [{"text":'', "user":this.props.name, "time":''}];
  }

  componentWillMount() {
  this.ref = FireRef.child(this.props.name);
  this.ref.child("messages").on('value', (snapshot) => {
    var items = [];
    snapshot.forEach(function(child) {
      items.push(child.val());
    });
    this.setState({
      dataSource: this.ds.cloneWithRows(items)
    });
  });
    console.log("hahaha");
    console.log(this.msg);
    api.getAllUser()
    .then((res)=> {
      console.log(res);
      for(i in res){
        console.log(res[i]["available"]);
        if(res[i]["available"] === true){
          FireRef.child(res[i]["name"]).update({
            connectWith:this.props.name
            // available:false
          });
          FireRef.child(this.props.name).update({
            connectWith:res[i]["name"],
            available:false
          });
          this.setState({count:1, connectedUser:res[i]["name"]});
          break;
        }
      }
      if(this.state.count === 0){
        console.log("No User available");
        FireRef.child(this.props.name).update({
          available:true
        });
      }
    });
  }

  handleChange(e){
    this.setState({
      message: e.nativeEvent.text
    })
  }
  handleSubmit(){
    var message = this.state.message;

    if(message != ''){
      console.log("MSG::"+this.msg);
      this.msg.push({"text":message, "user":this.props.name, "time":new Date()});
      this.nm = FireRef.child(this.props.name);
      this.nm.update({
        messages : this.msg
      });
      console.log("Outside");

      api.getMSG(this.state.connectedUser)
      .then((res)=>{
        if(res === null){
          this.CUData = [{"0":{"text":'', "user":this.props.name, "time":''}}];
        }
        else{this.CUData = res;}
        console.log("RES:"+res);
        this.CUData.push({"text":message, "user":this.props.name, "time":new Date()});
        FireRef.child(this.state.connectedUser).update({
          messages : this.CUData
        });
      });

    }

    // api.getData(this.props.name)
    // .then((data) => {
    //   this.setState({
    //     dataSource: this.ds.cloneWithRows(data)
    //     })
    // });

    this.setState({
      message: ''
    });
    // api.addmessage(this.props.name, message)
    //   .then((data) => {
    //     api.getInfo(this.props.name)
    //       .then((data) => {
    //         this.setState({
    //           dataSource: this.ds.cloneWithRows(data)
    //         })
    //       });
    //   })
    //   .catch((error) => {
    //     console.log('Request failed', error);
    //     this.setState({error})
    //   });
  }
  renderRow(rowData){
    return (
      <View>
        <View style={styles.rowContainer1}>
          <Text style={styles.forUser}> {rowData.user} </Text>
          <Text style={styles.forTime}> {rowData.time} </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text> {rowData.text} </Text>
        </View>
        <Separator />
      </View>
    )
  }
  footer(){
    return (
      <View style={styles.footerContainer}>
        <TextInput
            style={styles.searchInput}
            value={this.state.message}
            onChange={this.handleChange.bind(this)}
            placeholder="New Message" />
        <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
            underlayColor="#88D4F5">
              <Text style={styles.buttonText}>Post</Text>
          </TouchableHighlight>
      </View>
    )
  }
  render(){
    return (
      <View style={styles.container}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderHeader={() => <Badge userInfo={this.state.connectedUser}/>}/>
        {this.footer()}
      </View>
    )
  }
};

chatRoom.propTypes = {
  name: React.PropTypes.object.isRequired,
  messages: React.PropTypes.object.isRequired
}

module.exports = chatRoom;
