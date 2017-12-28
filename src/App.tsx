import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Widget } from './Widget';

interface Props { }
interface State { }

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <Widget prop1='Yo' />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
