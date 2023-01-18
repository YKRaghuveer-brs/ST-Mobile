import React, {
  useState,
  useEffect,
  createRef,
  useContext,
  useRef,
} from "react";
import axios from "axios";
import {
  View,
  Text,
  StatusBar,
  Image,
  Pressable,
  Animated,
} from "react-native";
import Header from "./Header";
import AlbumArt from "./AlbumArt";
import TrackDetails from "./TrackDetails";
import SeekBar from "./SeekBar";
import Controls from "./Controls";
import Video from "react-native-video";
import { AuthContext } from "../context/AuthContext";
import { truncateText } from "../utils/common";
import TextTicker from "react-native-text-ticker";

const Player = ({ tracks, story, press }) => {
// await AsyncStorage.setItem('user', JSON.stringify(token))
  console.log("story",story)
  const [paused, setPaused] = useState(true);
  const [totalLength, setTotalLength] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [repeatOn, setRepeatOn] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  // console.log("tracks",tracks)
  const setDuration = (data) => {
    // console.log(totalLength);
    // this.setState({totalLength: Math.floor(data.duration)});
    setTotalLength(Math.floor(data.duration));
  };

  const setTime = (data) => {
    //console.log(data);
    // this.setState({currentPosition: Math.floor(data.currentTime)});
    setCurrentPosition(Math.floor(data.currentTime));
  };

  const seek = (time) => {
    time = Math.round(time);
    // this.refs.audioElement && this.refs.audioElement.seek(time);
    // this.setState({
    //   currentPosition: time,
    //   paused: false,
    // });
    setCurrentPosition(time);
    setPaused(false);
  };

  const onBack = () => {
    if (currentPosition < 10 && selectedTrack > 0) {
      // this.refs.audioElement && this.refs.audioElement.seek(0);
      // this.setState({ isChanging: true });
      setIsChanging(true);

      setTimeout(() => {
        setCurrentPosition(0);
        setPaused(false);
        setTotalLength(1);
        setIsChanging(false);
        setSelectedTrack(selectedTrack - 1);
        // paused: false,
        // totalLength: 1,
        // isChanging: false,
        // selectedTrack: this.state.selectedTrack - 1,
      }, 0);
    } else {
      // this.refs.audioElement.seek(0);
      // this.setState({
      //   currentPosition: 0,
      // });
      setCurrentPosition(0);
    }
  };

  const onForward = () => {
    console.log("Hiiii");
    if (selectedTrack < tracks.length - 1) {
      // this.refs.audioElement && this.refs.audioElement.seek(0);
      // this.setState({ isChanging: true });
      setIsChanging(true);
      setTimeout(() => {
        setCurrentPosition(0);
        setPaused(false);
        setTotalLength(1);
        setIsChanging(false);
        setSelectedTrack(selectedTrack + 1);

        //   currentPosition: 0,
        // totalLength: 1,
        // paused: false,
        // isChanging: false,
        // selectedTrack: this.state.selectedTrack + 1,
      }, 0);
    }
  };

  const track = tracks[selectedTrack];
  const video = isChanging ? null : (
    <Video
      source={{ uri: track.audioUrl }} // Can be a URL or a local file.
      paused={paused} // Pauses playback entirely.
      resizeMode="cover" // Fill the whole screen at aspect ratio.
      repeat={true} // Repeat forever.
      onLoadStart={this.loadStart} // Callback when video starts to load
      onLoad={(data) => setDuration(data)} // Callback when video loads
      onProgress={(data) => setTime(data)} // Callback every ~250ms with currentTime
      onEnd={this.onEnd} // Callback when playback finishes
      onError={this.videoError} // Callback when video cannot be loaded
      style={styles.audioElement}
    />
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <AlbumArt url={track.albumArtUrl} />
        <Pressable onPress={() => press()}>
          <View style={{ paddingLeft: 10, paddingTop: 14 }}>
            <Text style={{ color: "#fff", fontSize: 14 }}>
              {truncateText(story.name, 14)}
            </Text>

            <TextTicker
              style={{ fontSize: 12, color: "#fff", width: 100 }}
              duration={3000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}
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
    backgroundColor: "#5E48A8",
  },
  audioElement: {
    height: 0,
    width: 0,
  },
};
