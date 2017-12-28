import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

interface Props {
  prop1: string
}

interface State {
  state1: string 
}

function guidClassDecorator(guid: string) {

  // Generate instances of a class
  function construct(constructor, args) {
    var c: any = function () { return constructor.apply(this, args);  }
    c.prototype = constructor.prototype;
    return new c();
  }

  function classDecorator(target: any, guid: string) {
    var original = target;

    // New constructor function
    var f: any = function (...args) {
      console.log("[Decorator] New: " + original.name); 
      var newObj  = construct(original, args);
      newObj.__classDecorator_guid = guid;
      return newObj;
    }
  
    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;
  
    // return new constructor (will override original)
    return f;
  }

  return (target) => classDecorator(target, guid);

}

@guidClassDecorator('1234-5678')
export class Widget extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { state1: 'constructor'};
  }

  componentDidMount() { 
    this.setState( { state1: 'didMount' });
  }

  render() {
    console.log('Render: ', this['__classDecorator_guid']);
    return (
      <View style={styles.container}>
        <Text style={styles.text}> A Widget </Text>
        <Text style={styles.text}> Prop1: { this.props.prop1 } </Text>
        <Text style={styles.text}> State: { this.state.state1 } </Text>
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