import React, { useContext, useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddGifImage from "../components/AddGifImage";

import AuthStack from "./AuthStack";
import Player from "../stickyPlayer/Player";

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

  console.log("userToken", userToken);

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
      {/*<AppStack2 />*/}
      {/*  <View style={{ flex: 1, position: "absolute", zIndex: 3, bottom:"20%",paddingLeft:10 }}>
            <View
              style={{
                justifyContent: "space-between",
                backgroundColor: "#5E48A8",
                width: 372,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: "https://source.unsplash.com/random" }}
                style={{ height: 70, width: 70 }}
              />
              <Text>Hiii</Text>
            </View>
          </View>*/}
      <View style={{ flex: 1, position: "absolute", zIndex: 3, top: 310 }}>
        {/* <View
              style={{
                justifyContent: "space-between",
                backgroundColor: "#5E48A8",
                width: 372,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: "https://source.unsplash.com/random" }}
                style={{ height: 70, width: 70 }}
              />
             <Controls/>
            </View>*/}
        {TRACKS && TRACKS.length ? (
          <Player
            tracks={TRACKS}
            story={story}
            press={() => navigation.navigate("Player", { story: story })}
          />
        ) : null}
      </View>
    </NavigationContainer>
  );
};

export default AppNav;

// import React, { Component,useContext } from 'react';

//  import { Platform, StyleSheet, View, Text,
//  Image, TouchableOpacity, Alert } from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import AddGifImage  from '../components/AddGifImage';

// import AuthStack from './AuthStack';

// import AppStack2 from './AppStack2';
// import {AuthContext} from '../context/AuthContext';
// const Stack = createNativeStackNavigator();
//    const {isLoading, userToken} = useContext(AuthContext);

//  export default class Myapp extends Component<{}>
// {
//    constructor(){
//      super();
//      this.state={
//      isVisible : true,
//     }
//   }
//    Hide_Splash_Screen=()=>{
//     this.setState({
//       isVisible : false
//     });
//   }

//   componentDidMount(){
//     var that = this;
//     setTimeout(function(){
//       that.Hide_Splash_Screen();
//     }, 9000);
//    }

//     render()
//     {
//         let Splash_Screen = (
//              <View style={styles.SplashScreen_RootView}>
//                  <View style={styles.SplashScreen_ChildView}>
//                       {/* <Image source={{uri:'https://static.javatpoint.com/tutorial/react-native/images/react-native-tutorial.png'}}
//                     style={{width:'100%', height: '100%', resizeMode: 'contain'}} />  */}
//                    <Image
//             style ={{width: "100%", height:"100%"}}
//             // source={{ }}
//             source={require("../../assets/Images/Cube_1.gif")}

//           />
//                 </View>
//              </View> )
//          return(
//              <View style = { styles.MainContainer }>
//                   <NavigationContainer>
//       {userToken !== null ? <AppStack2 /> : <AuthStack />}   {/*<AppStack2 />*/}

//   </NavigationContainer>
//                  {
//                   (this.state.isVisible === true) ? Splash_Screen : null
//                 }
//             </View>
//               );
//     }
// }
//  const styles = StyleSheet.create(
// {
//     MainContainer:
//     {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
//     },

//     SplashScreen_RootView:
//     {
//         justifyContent: 'center',
//         flex:1,
//         margin: 10,
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//       },

//     SplashScreen_ChildView:
//     {
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#00BCD4',
//         flex:1,
//     },
// });
