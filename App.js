import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { SocialIcon } from 'react-native-elements';
import { TextInput, TouchableOpacity } from 'react-native';
import AssetExample from './components/AssetExample';

import { Card } from 'react-native-elements';
import { Button } from 'react-native';
import ImagesScreen from './ImagesScreen';
import ErrorScreen from './ErrorScreen';
import Image from 'react-native';

const Dimensions = require('Dimensions');

const window = Dimensions.get('window');

const makeRequest = () => {
  const path = this.props.request;
  return fetch(path);
};

export default class App extends Component {
  state = {
    input: '',
    currentScreen: 'Home',
    data: [],
    image: null,
  };
  makeRequest = link => {
    return fetch(link);
  };

  fetchImages = async () => {
    this.makeRequest()
      .then(response => {
        return response.json();
      })
      .then(result => {
        console.log('hi again');
        const edges = result.graphql.user.edge_owner_to_timeline_media.edges;

        const sources = edges.map(val => {
          return val.node.display_url;
        });

        console.log('sources: ', sources);
        this.setState({ data: sources });
        this.changeScreen('ImagesScreen');
      })
      .catch(err => {
        //console.log(link);
        console.log('Something went wrong! Please check your input! ', err);
        this.changeScreen('ErrorScreen');
      });
  };

  onPress = () => {
    console.log("hi");
    if (this.state.input != '') {
      const link = 'https://apinsta.herokuapp.com/u/' + this.state.input;
      console.log(link);
      this.fetchImages(link);
      
    }
  };

  changeScreen = screen => {
    this.setState({ currentScreen: screen });
  };

  setImage = img => {
    this.setState({ image: img });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.currentScreen === 'Home' && (
          <View>
            <View>
              <SocialIcon button light type="instagram" iconSize={90} />
            </View>
            <View style={styles.input}>
              <TextInput
                style={styles.inputText}
                onChangeText={text => this.setState({ input: text })}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={this.onPress}>
              <Text>Touch Here </Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.currentScreen === 'ImagesScreen' && (
          <ImagesScreen
            linkOfImages={this.state.data}
            onGoBack={this.state.changeScreen}
            setImage={this.setImage}
          />
        )}
        {this.state.currentScreen === 'ErrorScreen' && (
          <ErrorScreen onGoBack={this.changeScreen} />
        )}
        {this.state.currentScreen === 'ShowImage' && (
          <Image source={{ uri: this.state.image.item }} style={styles.img} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    //justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
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
  inputText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  img: {
    width: window.width,
    height: window.height,
  },
});
