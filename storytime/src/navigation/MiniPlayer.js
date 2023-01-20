import Player from "../stickyPlayer/Player";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";
import React, { useContext, useState, useEffect } from "react";

export default function MiniPlayer({ tracks, story, press }) {
  // const Player = ({ tracks, story, press }) => {
  const { minPlayerTracks, minPlayerStory } = useContext(AuthContext);

  const press1 = (minPlayerStory) => {
    navigation.navigate("Player", { story: minPlayerStory })
  }

  return (
    <View>
      {minPlayerTracks && minPlayerTracks.length ? (
        <Player
          tracks={minPlayerTracks}
          story={minPlayerStory}
          press={press1}
          // onPress={() => navigation.navigate("Player", { story: item })}

        />
      ) : null}
    </View>
  );
}
