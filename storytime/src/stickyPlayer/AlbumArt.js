import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Pressable,
  Dimensions,
} from 'react-native';

const AlbumArt = ({
  url,
  onPress
}) => (
  <View style={styles.container}>
    <Pressable onPress={onPress}>
      <Image
        style={styles.image}
        source={{uri: url}}
      />
    </Pressable>
  </View>
);

export default AlbumArt;

const { width, height } = Dimensions.get('window');
const imageSize = width - 48;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 2,
    paddingTop:2,
    paddingRight: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius:10
  },
})
