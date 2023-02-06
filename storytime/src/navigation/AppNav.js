/** 
Created: 23.01.2023
Component: App Nav component
Description: Based on user is logged in status, the User is redirected to App Stack or Auth Stack
(c) Copyright (c) by Nyros. 
**/

import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import AuthStack from "./AuthStack";
import Player from "../stickyPlayer/Player";
import { View } from "react-native";
import AppStack from "./AppStack";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../utils/LoadingSpinner";

const AppNav = () => {
  const { userToken, stickyPlayer, tracks, story, isLoading } =useContext(AuthContext);

  return (
    <NavigationContainer ref={navigationRef}>
      {userToken !== null ? <AppStack /> : <AuthStack />}
      {stickyPlayer ? (
        <View
          style={{
            flex: 1,
            position: "absolute",
            zIndex: 3,
            bottom: 50,
            paddingLeft: 10,
          }}
        >
          <Player tracks={tracks} story={story} />
        </View>
      ) : null}
      {isLoading ? <LoadingSpinner /> : ""}
    </NavigationContainer>
  );
};

export default AppNav;
