/** 
Created: 23.01.2022
Component: Player Screen
Description: Renders the Player
(c) Copyright (c) by Nyros. 
**/

import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import Player from "./customPlayer/Player";
import { spotifyGet } from "../../context/httpHelpers";
const { width, height } = Dimensions.get("window");

const PlayerScreen = ({ route, navigation }) => {
  const {SpotifyGet} = useContext(AuthContext);
  const scrollX = useRef(new Animated.Value(0).current);
  const [episodeList, setEpisodeList] = useState([]);


   const {
   story,
        setStory,
        tracks,
        setTracks,
        paused,
        setPaused,
        currentPosition,
        setCurrentPosition,
        selectedTrack,
        setSelectedTrack,
        repeatOn,
        setRepeatOn,
        stickyPlayer,
        setStickyPlayer,
  } = useContext(AuthContext);

  useEffect(() => {
    getEpisodeList();
  }, []);

  const getEpisodeList = async () => {
    const queryParams = { limit: 40, market: "IN" };
    const response = await SpotifyGet(`shows/${story.id}/episodes`, queryParams);
    const episodes = [];
    if (response.items.length > 0 || response.next) {
      response.items.map((episode, index) => {
        let obj = {
          id: index,
          title: episode.name.slice(0, 20),
          artist: "Justin Bieber",
          albumArtUrl: episode.images[0].url,
          audioUrl: episode.audio_preview_url,
        };
        episodes.push(obj);
      });

      setEpisodeList([...episodeList, ...episodes]);
    } else {
      return false;
    }
  };

  return (
    <>
      {episodeList && episodeList.length ? <Player tracks={tracks} story={story} author={story.publisher}/> : null}
    </>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#ccc",
  },
  bottomContainer: {
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    width,
    alignItems: "center",
    paddingVertical: 15,
  },
  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  artworkWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,

    shadowColor: "#ccc",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  artWorkImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#EEEEEE",
  },
  artist: {
    fontSize: 16,
    fontWeight: "200",
    textAlign: "center",
    color: "#EEEEEE",
  },
  progressContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: "row",
  },
  progressLabelContainer: {
    width: 340,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabelText: {
    color: "#fff",
  },
  musicControls: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-between",
    marginTop: 15,
  },
});
