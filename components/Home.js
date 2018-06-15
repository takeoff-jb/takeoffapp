import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Check out my Home Screen!</Text>
        <Button
          onPress={() =>
            this.props.navigation.navigate('ActivityForm', { hello: 'world' })
          }
          title="Start"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Home;
