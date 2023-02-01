/** 
Created: 23.01.2022
Component: Player 
Description: Renders the Main Player
(c) Copyright (c) by Nyros. 
**/

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  View,
  Text,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import Header from "./Header";
import AlbumArt from "./AlbumArt";
import TrackDetails from "./TrackDetails";
import SeekBar from "./SeekBar";
import Controls from "./Controls";
import Video from "react-native-video";
import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";
import ToastManager, { Toast } from "toastify-react-native";

const options = ["Close"];

const Player = ({ tracks, story,author }) => {
  const [paused, setPaused] = useState(true);
  const [totalLength, setTotalLength] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [repeatOn, setRepeatOn] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [episodes, setEpisodes] = [options];
  const [userStories, setUserStories] = useState([]);

  const refActionSheet = useRef(null);

  showActionSheet = () => {
    if (refActionSheet.current) {
      refActionSheet.current.show();
    }
  };

  const upNextPress = (index) => {
    if (index === 0) {
      
    } else {
      setSelectedTrack(index - 1);
    }
  };

 
  const setDuration = (data) => {
    setTotalLength(Math.floor(data.duration));
  };

  const setTime = (data) => {
    setCurrentPosition(Math.floor(data.currentTime));
  };

  useEffect(() => {
  // this will be triggered whenever user will be updated
  if (currentPosition) {
    // connect to backend now
  

  }
}, [currentPosition]);

  const seek = (time) => {
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

  useEffect(() => {
    getEpisodeList();
  }, []);
  const getEpisodeList = async () => {
    tracks.map((episode, index) => {
      episodes.push(
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            style={{ width: 40, height: 40 }}
            source={{
              uri: episode.albumArtUrl,
            }}
          />
          <Text style={{ paddingLeft: 10, paddingTop: 5 }}>
            {episode.title}
          </Text>
        </View>
      );
    });
  };

  const track = tracks[selectedTrack];
  const video = isChanging ? null : (
    <Video
      source={{ uri: track.audioUrl }} // Can be a URL or a local file.
      paused={paused} // Pauses playback entirely.
      resizeMode="cover" // Fill the whole screen at aspect ratio.
      repeat={repeatOn} // Repeat forever.
      onLoad={(data) => setDuration(data)} // Callback when video loads
      onProgress={(data) => setTime(data)} // Callback every ~250ms with currentTime
    
      style={styles.audioElement}
      
       

    />
  );

  // User Saves & remove story from savedStories
  const saveStory = (story) => {
    const user_stories = userStories;
    const index = user_stories.indexOf(story);
    if (index > -1) {
      user_stories.splice(index, 1);
    } else {
      user_stories.push(story);
    }
    setUserStories(user_stories);
    const obj = {};
    obj.saved_stories = user_stories;
    axios
      .put(BASE_URL + "saveStory/" + user._id, obj)

      .then((res) => {
        if (res) {
          setUserStories(res.data.saved_stories);

          if (index > -1) {
            Toast.error("Story removed from your library.");
          } else {
            Toast.success("Story added to your library.");
          }
        }
      })
      .catch((error) => {
        Toast.error(error.response.data);
      });
  };

  return (
    <View style={styles.container}>
      <ToastManager duration={3000} style={{ fontSize: 10 }} />

      <StatusBar hidden={true} />
      <Header message="Now Playing" />
      <AlbumArt url={track.albumArtUrl} />
      <TrackDetails title={track.title} artist={author}/>

      <SeekBar
        onSeek={(time) => seek(time)}
        trackLength={totalLength}
        onSlidingStart={() => setPaused(true)}
        currentPosition={currentPosition}


        // onSeek={this.seek.bind(this)}
        //   trackLength={this.state.totalLength}
        //   onSlidingStart={() => this.setState({paused: true})}
        //   currentPosition={this.state.currentPosition}
      />
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

      <View>
        <Pressable onPress={() => saveStory(story)}>
          <Text style={{ color: "#fff", paddingLeft: 20 }}>
            {userStories.includes(story) ? "Saved" : "Save"}
          </Text>
        </Pressable>
      </View>

      <View style={{ paddingTop: 20 }}>
        <Text
          style={{ color: "#fff", textAlign: "center" }}
          onPress={this.showActionSheet}
        >
          Upnext
        </Text>
        <ActionSheet
          ref={refActionSheet}
          title={<Text style={{ color: "#000", fontSize: 18 }}>UpNext</Text>}
          options={episodes}
          cancelButtonIndex={0}
          styles={{
            body: { flex: 1, alignSelf: "flex-end", backgroundColor: "red" },
          }}
          onPress={(index) => {
            upNextPress(index);
          }}
        />
      </View>
    </View>
  );
};

export default Player;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#291F4E",
  },
  audioElement: {
    height: 0,
    width: 0,
  },
};



// import React, { useState } from 'react';

// import { View, StyleSheet, Text } from 'react-native';

// import Slider from '@react-native-community/slider';

// export default function Player() {

//   const [data, setSliderData] = useState(10);

//   return (
//     <View style={styleSheet.MainContainer}>

//       <Text style={{ color: 'blue', fontSize: 30, textAlign: 'center' }}>
//         Example of React Native Community/Slider
//       </Text>

//       <Text style={{ fontSize: 28 }}>
//         Value of slider is : {data}
//       </Text>

//       <Slider
//         maximumValue={100}
//         minimumValue={0}
//         minimumTrackTintColor="#D50000"
//         maximumTrackTintColor="#01579B"
//         step={1}
//         value={data}
//         onValueChange={
//           (sliderValue) => setSliderData(sliderValue)
//         }
//         thumbTintColor="#1B5E20"
//         style={{width: 400, height: 40}}
//       />

//     </View>
//   );
// }

// const styleSheet = StyleSheet.create({

//   MainContainer: {
//     flex: 1,
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });