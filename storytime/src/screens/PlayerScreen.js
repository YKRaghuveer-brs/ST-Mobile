import React, { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import Player from "../app/Player";
import { AuthContext } from '../context/AuthContext';
const { width, height } = Dimensions.get("window");

const TRACKS = [
  {
    title: "Hotline Bling",
    artist: "Drake",
    albumArtUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    title: "Stressed Out",
    artist: "Twenty One Pilots",
    albumArtUrl: "http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Love Yourself",
    artist: "Justin Bieber",
    albumArtUrl: "http://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
];

const PlayerScreen = ({ route, navigation }) => {
  const scrollX = useRef(new Animated.Value(0).current);
  const {spotifyGet} = useContext(AuthContext);
  const [episodeList, setEpisodeList] = useState([]);
  const { story } = route.params;

  useEffect(() => {
    getEpisodeList();
  }, []);

  const getEpisodeList = async () => {
    const queryParams = { limit: 40, market: "IN" };
    const response = await spotifyGet(`shows/${story.id}/episodes`, queryParams);
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
      {episodeList && episodeList.length ? <Player tracks={episodeList} story={story.id} /> : null}
      {/*<Player tracks={TRACKS} />*/}
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
