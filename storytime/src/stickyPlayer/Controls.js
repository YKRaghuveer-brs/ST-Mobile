/** 
Created: 23.01.2022
Component: Controls
Description: contains the controls needed for the sticky player.
(c) Copyright (c) by Nyros. 
**/

import {View, StyleSheet, Image, Pressable} from 'react-native';

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
    <View />
    <Pressable onPress={onBack}>
      <Image source={require('../assets/images/player/ic_skip_previous_white_36pt.png')} />
    </Pressable>
    <View />
    {!paused ? (
      <Pressable onPress={onPressPause}>
        <View style={styles.playButton}>
          <Image source={require('../assets/images/player/ic_pause_white_48pt.png')} />
        </View>
      </Pressable>
    ) : (
      <Pressable onPress={onPressPlay}>
        <View style={styles.playButton}>
          <Image source={require('../assets/images/player/ic_play_arrow_white_48pt.png')} />
        </View>
      </Pressable>
    )}
    <View />
    <Pressable onPress={onForward} disabled={forwardDisabled}>
      <Image
        style={[forwardDisabled && {opacity: 0.3}]}
        source={require('../assets/images/player/ic_skip_next_white_36pt.png')}
      />
    </Pressable>
  </View>
);

export default Controls;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  playButton: {
    height: 45,
    width: 45,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 45 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  secondaryControl: {
    height: 18,
    width: 18,
  },
  off: {
    opacity: 0.3,
  },
});
