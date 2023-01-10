import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';

const Header = ({
  message,
  onDownPress,
  onQueuePress,
  onMessagePress,
}) => (
  <View style={styles.container}>
    <Pressable onPress={onDownPress}>
      <Image style={styles.button}
        source={require('../img/ic_keyboard_arrow_down_white.png')} />
    </Pressable>
    <Text onPress={onMessagePress}
      style={styles.message}>{message}</Text>
    <Pressable onPress={onQueuePress}>
     {/* <Image style={styles.button}
        source={require('../img/ic_queue_music_white.png')} />*/}
     <Text style={styles.cc}>CC</Text>
    </Pressable>
  </View>
);

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 72,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
  },
  message: {
    flex: 1,
    textAlign: 'center',
    // color: 'rgba(255, 255, 255, 0.72)',
    color:"#fff",
    fontWeight: 'bold',
    fontSize: 18,
  },
  button: {
    opacity: 0.72
  },
  cc:{
       color: 'rgba(255, 255, 255, 0.72)',
       paddingTop:10

  }
});
