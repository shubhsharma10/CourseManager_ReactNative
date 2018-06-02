import React from 'react';
import { StyleSheet, Text, View, StatusBar,Alert } from 'react-native';
import FixedHeader from './elements/FixedHeader'
import TextHeading from './elements/TextHeading'
import Exam from './elements/Exam'

export default class App extends React.Component {
  render() {
    return (
      <View >
        <StatusBar barStyle="light-content"/>
        <FixedHeader/>
        <Exam/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
});
