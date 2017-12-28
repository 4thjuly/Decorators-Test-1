import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

interface Props {
  prop1: string
}

interface State {
  state1: string 
}

export class Widget extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { state1: 'constructor'};
  }

  componentDidMount() { 
    this.setState( { state1: 'didMount' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> A Widget </Text>
        <Text style={styles.text}> Prop1: { this.props.prop1  } </Text>
        <Text style={styles.text}> State: { this.state.state1  } </Text>
      </View>
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