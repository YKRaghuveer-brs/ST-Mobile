import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from './RootNavigation';
import AuthStack from "./AuthStack";
import Player from "../stickyPlayer/Player";
import MiniPlayer from "./MiniPlayer";
import { View, Text, ActivityIndicator, Image } from "react-native";


import AppStack2 from "./AppStack2";
import { AuthContext } from "../context/AuthContext";

const AppNav = () => {
  const { isLoading, userToken,stickyPlayer,setStickyPlayer,minPlayerTracks,minPlayerStory } = useContext(AuthContext);

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
    <NavigationContainer ref={navigationRef}>
      {userToken !== null ? <AppStack2 />:<AuthStack />}
      {stickyPlayer?<View
        style={{
          flex: 1,
          position: "absolute",
          zIndex: 3,
          bottom: 50,
          paddingLeft: 10,
        }}
      >

        <Player
          tracks={minPlayerTracks}
          story={minPlayerStory}
         
        />
      </View>:null}
    </NavigationContainer>
  );
};

export default AppNav;