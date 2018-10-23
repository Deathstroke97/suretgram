import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Image } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';

class ErrorScreen extends Component {
  onPress = screen => {
    this.props.onGoBack(screen);
  };
  render() {
    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={this.onPress('Home')}>
          <Text>'Go Home'</Text>
        </TouchableOpacity>
        <Text>'Something went wrong! Click button to go back! '</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    border: 'none',
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 6,
    paddingLeft: 10,
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: 10,
    marginTop: 4,
    marginRight: 2,
  },
});
export default ErrorScreen;
