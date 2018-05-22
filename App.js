import React from 'react'
import {StyleSheet, Text, View , ScrollView} from 'react-native';
import MainTabs from './Containers/MainTabs';
import InnerTabs from './Containers/InnerTabs'
import { AppRegistry } from 'react-native';

import { get } from "Dimensions";
var {width, height} = get('window')

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: {
        id: 1
      }
    };
  }
  render() {
    return (
      <ScrollView style={{flex:1}}>
        <InnerTabs />
      </ScrollView>
    )
  }
}
AppRegistry.registerComponent('ak1', () => App);

