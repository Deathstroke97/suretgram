import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Image } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';

class ImagesScreen extends Component {
  onPress = (screen, image) => {
    this.props.onGoBack(screen);
    this.props.setImage(image);
    
  };

  render() {
   // console.log('this.props.linkOfImages: ', this.props.linkOfImages)
    
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity style={styles.button} onPress={this.onPress('Home')}>
          <Text>'Go Home'</Text>
        </TouchableOpacity>
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{flex: 1}}
          keyExtractor={item => item}
          data={this.props.linkOfImages}
          renderItem={(dataItem) => ( 
            <View style={styles.view}>
            <TouchableOpacity onPress = { this.onPress('ShowImage', dataItem)}>
              <Image source={{ uri: dataItem.item }} style={styles.imageView} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageView: {
    width: 100,
    height: 100,
    margin: 7,
    borderRadius: 7,
  },
  view: {
    flexDirection: 'row',
  },
});

export default ImagesScreen;
