/** 
Created: 23.01.2022
Component: Player 
Description: Renders the Sticky Player
(c) Copyright (c) by Nyros. 
**/

import {useContext, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import AlbumArt from './AlbumArt';
import SeekBar from './SeekBar';
import Controls from './Controls';
import Video from 'react-native-video';
import {AuthContext} from '../context/AuthContext';
import {truncateText} from '../utils/common';
import TextTicker from 'react-native-text-ticker';
import * as RootNavigation from '../navigation/RootNavigation.js';

const Player = ({tracks, story}) => {
  const [paused, setPaused] = useState(true);
  const [totalLength, setTotalLength] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [repeatOn, setRepeatOn] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const {setStickyPlayer} = useContext(AuthContext);

  const setDuration = data => {
    setTotalLength(Math.floor(data.duration));
  };

  const setTime = data => {
    setCurrentPosition(Math.floor(data.currentTime));
  };

  const seek = time => {
    time = Math.round(time);
    setCurrentPosition(time);
    setPaused(false);
  };

  const onBack = () => {
    if (currentPosition < 10 && selectedTrack > 0) {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentPosition(0);
        setPaused(false);
        setTotalLength(1);
        setIsChanging(false);
        setSelectedTrack(selectedTrack - 1);
      }, 0);
    } else {
      setCurrentPosition(0);
    }
  };

  const onForward = () => {
    if (selectedTrack < tracks.length - 1) {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentPosition(0);
        setPaused(false);
        setTotalLength(1);
        setIsChanging(false);
        setSelectedTrack(selectedTrack + 1);
      }, 0);
    }
  };

  const track = tracks[selectedTrack];
  const video = isChanging ? null : (
    <Video
      source={{uri: track.audioUrl}} // Can be a URL or a local file.
      paused={paused} // Pauses playback entirely.
      resizeMode="cover" // Fill the whole screen at aspect ratio.
      repeat={true} // Repeat forever.
      onLoadStart={this.loadStart} // Callback when video starts to load
      onLoad={data => setDuration(data)} // Callback when video loads
      onProgress={data => setTime(data)} // Callback every ~250ms with currentTime
      onEnd={this.onEnd} // Callback when playback finishes
      onError={this.videoError} // Callback when video cannot be loaded
      style={styles.audioElement}
    />
  );

  const openPlayer = () => {
    setStickyPlayer(false);
    RootNavigation.navigate('Player', {story: story});
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable onPress={() => setStickyPlayer(false)}>
          <Text style={{textAlign: 'right'}}>Close</Text>
        </Pressable>
      </View>
      <View style={{flexDirection: 'row'}}>
        <AlbumArt url={track.albumArtUrl} />
        <Pressable onPress={() => openPlayer()}>
          <View style={{paddingLeft: 10, paddingTop: 14}}>
            <Text style={{color: '#fff', fontSize: 14}}>
              {truncateText(story.name, 14)}
            </Text>

           {/* <TextTicker
              style={{fontSize: 12, color: '#fff', width: 100}}
              duration={3000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}>
              {track.title}
            </TextTicker>*/}
            <TextTicker
              style={{fontSize: 12, color: '#fff', width: 100}}
          duration={3000}
       
          marqueeDelay={3000}
        >
         {track.title}
        </TextTicker>
          </View>
        </Pressable>

        <Controls
          onPressRepeat={() => setRepeatOn(!repeatOn)}
          repeatOn={repeatOn}
          shuffleOn={shuffleOn}
          forwardDisabled={selectedTrack === tracks.length - 1}
          onPressShuffle={() => setShuffleOn(!shuffleOn)}
          onPressPlay={() => setPaused(false)}
          onPressPause={() => setPaused(true)}
          onBack={onBack}
          onForward={onForward}
          paused={paused}
        />
        {video}
      </View>

      <View>
        <SeekBar
          onSeek={() => seek(tme)}
          trackLength={totalLength}
          onSlidingStart={() => setPaused(false)}
          currentPosition={currentPosition}
        />
      </View>
    </View>
  );
};

export default Player;

const styles = {
  container: {
    flex: 1,
    width: 372,
    borderRadius: 10,
    backgroundColor: '#5E48A8',
  },
  audioElement: {
    height: 0,
    width: 0,
  },
};
