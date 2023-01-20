import React, { useContext, useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStack from "./AuthStack";

import AppStack2 from "./AppStack2";
import { AuthContext } from "../context/AuthContext";
const Stack = createNativeStackNavigator();
const AppNav = () => {
  const TRACKS = [
    {
      title: "Stressed Out",
      artist: "Twenty One Pilots",
      albumArtUrl:
        "http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      title: "Love Yourself",
      artist: "Justin Bieber",
      albumArtUrl:
        "http://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      title: "Hotline Bling",
      artist: "Drake",
      albumArtUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
  ];

  const story = {
    available_markets: [
      "AD",
      "AE"
    
    ],
    copyrights: [],
    description:
      "Tenali Rama was a poet and an advisor to King Krishna Dev of erstwhile kingdom Vijaya Nagar of 16th Century AD which was situated in modern-day Andhra Pradesh, India. He was quite popular for his wittiness and intelligence and had a funny side to his ways of working which attracted everyone towards him.  This podcast brings to life some of the most popular anecdotes from his life and interactions in the royal courtroom and outside. These stories make for a great listening experience for young and adults alike. If you like the show, support us by becoming a patron on this link: https://www.patreon.com/chimesradio  Visit our website to know more: https://chimesradio.com   All podcast listening links: http://chimesradio.bio.link/ Connect with us on our social handles to get all content updates:https://www.instagram.com/vrchimesradio/  https://www.facebook.com/chimesradio",
    explicit: false,
    external_urls: { spotify: "https://open.spotify.com/show/2FMtBcxm5HsoBNkFdscGZ1" },
    href: "https://api.spotify.com/v1/shows/2FMtBcxm5HsoBNkFdscGZ1",
    html_description:
      '<p>Tenali Rama was a poet and an advisor to King Krishna Dev of erstwhile kingdom Vijaya Nagar of 16th Century AD which was situated in modern-day Andhra Pradesh, India. He was quite popular for his wittiness and intelligence and had a funny side to his ways of working which attracted everyone towards him. </p><br/><p>This podcast brings to life some of the most popular anecdotes from his life and interactions in the royal courtroom and outside. These stories make for a great listening experience for young and adults alike.</p><br/><p>If you like the show, support us by becoming a patron on this link: <a href="https://www.patreon.com/chimesradio" rel="nofollow">https://www.patreon.com/chimesradio</a> </p><br/><p>Visit our website to know more: <a href="https://chimesradio.com" rel="nofollow">https://chimesradio.com </a> </p><br/><p>All podcast listening links: http://chimesradio.bio.link/</p><br/><p>Connect with us on our social handles to get all content updates:<br /><a href="https://www.instagram.com/vrchimesradio/" rel="nofollow">https://www.instagram.com/vrchimesradio/ </a> <br /><a href="https://www.facebook.com/chimesradio/" rel="nofollow">https://www.facebook.com/chimesradio</a></p>',
    id: "2FMtBcxm5HsoBNkFdscGZ1",
    images: [
      {
        height: 640,
        url: "https://i.scdn.co/image/ab6765630000ba8ab8035da8f35e611ff83b6622",
        width: 640,
      },
      {
        height: 300,
        url: "https://i.scdn.co/image/ab67656300005f1fb8035da8f35e611ff83b6622",
        width: 300,
      },
      {
        height: 64,
        url: "https://i.scdn.co/image/ab6765630000f68db8035da8f35e611ff83b6622",
        width: 64,
      },
    ],
    is_externally_hosted: false,
    languages: ["hi"],
    media_type: "audio",
    name: "Tenali Rama - Stories in Hindi",
    publisher: "Chimes Podcasts",
    total_episodes: 11,
    type: "show",
    uri: "spotify:show:2FMtBcxm5HsoBNkFdscGZ1",
  };

  const { isLoading, userToken } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);


  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsVisible(false);
  //   }, 5000);
  //   // storeData()
  // }, []);

  // if (isLoading) {
  //   return (
  //     <View
  //         style={{
  //           position: "absolute",
  //           zIndex: 2,
  //           left: 0,
  //           right: 0,
  //           top: 40,
  //           bottom: 0,
  //           alignItems: "center",
  //           justifyContent: "center",
  //         }}
  //       >
  //         <Image
  //           style={{ width: 100, height: 100 }}
  //           // source={{uri: 'https://media3.giphy.com/media/wWue0rCDOphOE/giphy.gif'}}
  //           source={require("../../assets/Images/Spiral_logo_loader.gif")}
  //         />
  //       </View>
  //   );
  // }

  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack2 /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;