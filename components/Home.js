import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('ActivityForm', { hello: 'world' })
          }>
          <Image
            style={styles.button}
            source={require('../utils/title-image.png')}
          />
        </TouchableOpacity>
        {/* <Image source={require('../utils/title-image.png')} /> */}
        {/* <Button */}
        {/* // style={styles.button}
          // onPress={() =>
          //   this.props.navigation.navigate('ActivityForm', { hello: 'world' })
          // }
        //   title="Let's Get Started"
        //   color="red" */}
        // />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center',
    color: 'red'
  }
  // button: {
  //   fontSize: 20,
  //   fontWeight: 'bold'
  // }
});

export default Home;
