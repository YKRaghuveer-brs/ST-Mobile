import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import Slider from '@react-native-community/slider';

// const Slider = require('react-native-slider');

function pad(n, width, z=0) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}




const SeekBar = ({trackLength,currentPosition,onSeek,onSlidingStart}) => {
  const minutesAndSeconds = (position) => ([
    pad(Math.floor(position / 60), 2),
    pad(position % 60, 2),
  ]);


  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(trackLength - currentPosition);
  return (
    <View style={styles.container}>
     
      <Slider
        // maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
        // onSlidingStart={onSlidingStart}
        // onSlidingComplete={onSeek}
        // value={currentPosition}
        // style={styles.slider}
        // minimumTrackTintColor='#fff'
        // maximumTrackTintColor='rgba(255, 255, 255, 0.14)'
        // thumbStyle={styles.thumb}
        // trackStyle={styles.track}


        // style={{width: 200, height: 40}}
  minimumValue={0}
  value={currentPosition}
  maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
  minimumTrackTintColor="#FFFFFF"
  maximumTrackTintColor="#F2F2F2"
  
  step={1}
        />
    </View>
  );
};

export default SeekBar;
const styles = StyleSheet.create({
  slider: {
    marginTop: -12,
  },
  container: {
    paddingLeft: 1,
    paddingRight: 1,
   
    
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    textAlign:'center',
  }
});
