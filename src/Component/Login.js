'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Navigator,
  View
} from 'react-native';
var api = require('../Api/chatApi');
var chatRoom = require('./chatRoom');
import config from '../../config'
// var sec = require('./sec');
import Firebase from 'firebase';
const FireRef = new Firebase(`${ config.FIREBASE_ROOT }`);

class Login extends Component {
  constructor(props){
  super(props)
  this.state = {
    name: '',
    password: '',
    dob: ''
    }
  }
  nameChange(e){
  this.setState({
    name: e.nativeEvent.text
    })
  }
  passwordChange(e){
  this.setState({
    password: e.nativeEvent.text
  })
  }
  dobChange(e){
  this.setState({
    dob: e.nativeEvent.text
  })
  }
  handleResponse(ms, name){
    console.log("handleResponse");
    console.log(name);
    console.log(ms);
    this.pp = ms;
    if(ms === ""){
      console.log("nanana");
      this.pp = [{"text":'', "user":name, "time":''}];
    }
    console.log("ms"+this.pp);
    this.props.navigator.push({
      id:'second',
      passProps: {
            name: name,
            messages: this.pp
          }
    });
  }

  handleAdd(info, name, password, dob){
    // var nameSnapshot = FireRef.child(name);
    // var info = nameSnapshot.val();
    console.log(info);
    if(info === null){
      console.log("haha");
      FireRef.child(name).set({
        name: name,
        password: password,
        dob: dob,
        available: false,
        connectWith:'',
        messages:''
      });
      const mss = [{"text":'', "user":'', "time":''}];
      this.handleResponse(mss, name);
    // api.addInfo(name, password, dob)
    //   .then((jsonRes) => this.handleResponse(jsonRes, name))
    //   .catch((err) => {
    //     console.log("Error");
    //   })
    }else{
      this.handleResponse(info.messages, name);
    }
  }

  handleSubmit(){
    var name = this.state.name;
    var password = this.state.password;
    var dob = this.state.dob;
    console.log("login"+name+" "+password+" "+dob);
    this.setState({
      name: '',
      password: '',
      dob: ''
    });

    api.getBio(name)
      .then((jsonResp) => this.handleAdd(jsonResp, name, password, dob))
      .catch((err) => {
        console.log("getBio Error");
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
          <Text style={styles.welcome}>
            Login
          </Text>
        </View>
        <View style={styles.container2}>
          <Text style={styles.welcome}>
            Name
          </Text>
          <TextInput style={styles.input}
            value={this.state.name}
            onChange={this.nameChange.bind(this)} />
          <Text style={styles.welcome}>
            Password
          </Text>
          <TextInput style={styles.input}
            secureTextEntry={true}
            value={this.state.password}
            onChange={this.passwordChange.bind(this)} />
          <Text style={styles.welcome}>
            DOB
          </Text>
          <TextInput style={styles.input}
            value={this.state.dob}
            onChange={this.dobChange.bind(this)} />
            <TouchableHighlight
              style={styles.button}
              onPress={this.handleSubmit.bind(this)}
              underlayColor="white">
              <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCF5',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FC00',
  },
  container2: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'grey',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  input:{
    padding:4,
    height:40,
    borderColor:"grey",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width:200,
    alignSelf:'center'
  },
});

module.exports = Login;
