import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';


const Controls = ({
  paused,
  shuffleOn,
  repeatOn,
  onPressPlay,
  onPressPause,
  onBack,
  onForward,
  onPressShuffle,
  onPressRepeat,
  forwardDisabled,
}) => (
  <View style={styles.container}>
    <Pressable activeOpacity={0.0} onPress={onPressShuffle}>
     {/* <Image
        style={{
           height: 25,
                                    width: 25,
                                    marginLeft: 20,
                                    marginRight: 10,
                                    tintColor: "#FF8C00",
                                    alignSelf: "center",
        }}
       source={require('../img/ic_skip_previous_white_36pt.png')}
        />*/}
    </Pressable>
    <View style={{width: 40}} />
    <Pressable onPress={onBack}>
      <Image source={require('../img/ic_skip_previous_white_36pt.png')}/>
    </Pressable>
    <View style={{width: 20}} />
    {!paused ?
      <Pressable onPress={onPressPause}>
        <View style={styles.playButton}>
          <Image source={require('../img/ic_pause_white_48pt.png')}/>
        </View>
      </Pressable> :
      <Pressable onPress={onPressPlay}>
        <View style={styles.playButton}>
          <Image source={require('../img/ic_play_arrow_white_48pt.png')}/>
        </View>
      </Pressable>
    }
    <View style={{width: 20}} />
    <Pressable onPress={onForward}
      disabled={forwardDisabled}>
      <Image style={[forwardDisabled && {opacity: 0.3}]}
        source={require('../img/ic_skip_next_white_36pt.png')}/>
    </Pressable>
    <View style={{width: 40}} />
    <Pressable activeOpacity={0.0} onPress={onPressRepeat}>
      <Image style={[styles.secondaryControl, repeatOn ? [] : styles.off]}
        source={require('../img/ic_repeat_white.png')}/>
    </Pressable>
  </View>
);

export default Controls;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  playButton: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryControl: {
    height: 18,
    width: 18,
  },
  off: {
    opacity: 0.30,
  }
})
