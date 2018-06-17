import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
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
            // style={styles.image}
            source={require('../utils/title-image.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
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
  // image: {
  //   flex: 1
  // }
});

export default Home;
