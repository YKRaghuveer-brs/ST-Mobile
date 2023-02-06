/** 
Created: 23.01.2022
Component: Controls
Description: contains the controls needed for the main player.
(c) Copyright (c) by Nyros. 
**/

import {View, StyleSheet, Image, Pressable,Text} from 'react-native';

const Controls = ({
  paused,
  repeatOn,
  onPressPlay,
  onPressPause,
  onBack,
  onForward,
  onPressRepeat,
  forwardDisabled,
}) => (
  <View style={styles.container}>
    <View style={{width: 40}} />
    <Pressable onPress={onBack}>
      <Image source={require('../../../assets/images/player/ic_skip_previous_white_36pt.png')} />
    </Pressable>
    <View style={{width: 20}} />
    {!paused ? (
      <Pressable onPress={onPressPause}>
        <View style={styles.playButton}>
          <Image source={require('../../../assets/images/player/ic_pause_white_48pt.png')} />
        </View>
      </Pressable>
    ) : (
      <Pressable onPress={onPressPlay}>
        <View style={styles.playButton}>
          <Image source={require('../../../assets/images/player/ic_play_arrow_white_48pt.png')} />
        </View>
      </Pressable>
    )}
    <View style={{width: 20}} />
    <Pressable onPress={onForward} disabled={forwardDisabled}>
      <Image
        style={[forwardDisabled && {opacity: 0.3}]}
        source={require('../../../assets/images/player/ic_skip_next_white_36pt.png')}
      />
    </Pressable>
    <View style={{width: 40}} />
     {
       repeatOn === true ?
       <Pressable activeOpacity={0.0} onPress={() => onPressRepeat(repeatOn)}>
       <Image
        style={[styles.secondaryControl]}
        source={require('../../../assets/images/player/repeat_one.png')}
      /></Pressable> : null
     }

     {
       repeatOn === false ?
       <Pressable activeOpacity={0.0} onPress={() => onPressRepeat(repeatOn)}>
       <Image
        style={[styles.secondaryControl, repeatOn ? [] : styles.off]}
        source={require('../../../assets/images/player/ic_repeat_white.png')}
      /></Pressable> : null
     }
     
      {
       repeatOn === "all" ?
       <Pressable activeOpacity={0.0} onPress={() => onPressRepeat(repeatOn)}>
       <Image
        style={[styles.secondaryControl]}
        source={require('../../../assets/images/player/ic_repeat_white.png')}
      /></Pressable> : null
     }

      {/*<Image
        style={[styles.secondaryControl, repeatOn ? [] : styles.off]}
        source={require('../../../assets/images/player/repeat_one.png')}
      />
      <Text style={{width: 40}}>{repeatOn? "One" : "Off" } </Text>*/}
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
    opacity: 0.3,
  },
});
