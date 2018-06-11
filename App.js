import React from 'react'
import {StyleSheet, Text, View , ScrollView} from 'react-native';
import MainTabs from './Containers/MainTabs';
import InnerTabs from './Containers/InnerTabs'
import { AppRegistry } from 'react-native';
import Login from './Login.js';
import { get } from "Dimensions";
import {request,deleteToken} from './api.js'
var {width, height} = get('window')

export default class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          isLoggedIn: false,
          language : "en",
          availableLanguages : [],
          navigation : "",
          general : ""
      }
  }

  componentWillMount(){
      request.get("/text")
          .then((response) => {
              this.setState({
                  language : response.data.locale,
                  availableLanguages : response.data['available_locales'],
                  navigation : response.data.data.navigation,
                  general : response.data.data.general
              })
          })
          .catch(function (error) {
              console.log(error);
          });
  }
  render() {
      console.log(this.state);
      if (this.state.isLoggedIn) {
          return (
              <ScrollView style={{flex: 1}}>
                  {this.state.navigation && <InnerTabs onLogoutPress={() => {deleteToken();
                  this.setState({isLoggedIn: false})}}
                             {...this.state}/>}
              </ScrollView>)
      }
      else{
          return( <Login
              onLoginPress={() => this.setState({isLoggedIn: true})}
              onLogoutPress={() => {deleteToken();
                  this.setState({isLoggedIn: false})}}
          />)
      }
  }
}
AppRegistry.registerComponent('ak1', () => App);

