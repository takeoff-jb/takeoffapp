import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

class Home extends React.Component {
  render() {
    // let windowWidth = Dimensions.get('window').width;
    // let widthChange = windowWidth / originalWidth

    return (
      <ImageBackground
        source={require('../utils/mountain-background.jpeg')}
        style={styles.container}>
        <View style={styles.inner}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ActivityForm', { hello: 'world' })
            }>
            <Image
              source={require('../utils/title-image.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  logo: {
    opacity: 0.7,
    borderRadius: 30
  }
});

export default Home;
