import * as React from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

function MrCloud(guid:string, sharedState:string[]) {

  // Generate instances of a class
  function construct(constructor, args) {
    var c:any = function () { return constructor.apply(this, args);  }
    c.prototype = constructor.prototype;
    return new c();
  }

  function classDecorator(constructor:any, guid:string, sharedState:string[]) {
    var originalConstructor = constructor;
    var guid = guid;

    // New constructor function
    var f:any = function (...args) {
      console.log("[Decorator] New: " + originalConstructor.name); 
      var newObj = construct(originalConstructor, args);
      // Hook setState
      var originalSetState = newObj['setState'];
      newObj['setState'] = function(...args) {
        console.log("[Decorator] SetState guid: ", guid);
        console.log("[Decorator] SetState arg0: ", args[0]);
        originalSetState.apply(newObj, args);
      }
      return newObj;
    }

    // copy prototype so intanceof operator still works
    f.prototype = originalConstructor.prototype;
  
    // return new constructor (will override original)
    return f;
  }

  return (target) => classDecorator(target, guid, sharedState);
}

interface Props {
  prop1:string
}

interface State {
  state1:number 
}

@MrCloud('1234-5678', ['state1'])
export class Widget extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { state1: 0 };
  }

  componentDidMount() { 
    this.setState( { state1: 1 });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> A Widget </Text>
        <Text style={styles.text}> Prop1: { this.props.prop1 } </Text>
        <Text style={styles.text}> State: { this.state.state1 } </Text>
        <Button onPress={ () => this.updateState() } title='  Update State  ' />
      </View>
    );
  }

  updateState() {
    this.setState({state1: this.state.state1 + 1});
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