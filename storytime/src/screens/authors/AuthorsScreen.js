/** 
Created: 23.01.2023
Component: Author Stories screen
Description: Renders the list of Shows related to Authors
(c) Copyright (c) by Nyros. 
**/

import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import tw from "twrnc";
import { AuthContext } from "../../context/AuthContext";
import { truncateText } from "../../utils/common";

const AuthorsScreen = ({ navigation }) => {
  const { SpotifySearch, isLoading } = useContext(AuthContext);
  const [offset, setOffset] = useState(0);
  const [hasMoreItem, setHasMoreItems] = useState(true);
  const [shows, setShows] = useState([]);

  const getShowsByCategory = async () => {
    const queryParams = {
      type: "show",
      include_external: "audio",
      market: "IN",
      offset,
      limit: "16",
    };

    const search = {
      q: "popular stories podcasts",
    };

    const response = await SpotifySearch(search, queryParams);
    if (response.shows.items.length > 0 || response.shows.next) {
      const removeExplicitStories = response.shows.items.filter(
        (story) => !story.explicit
      );
      setShows([...shows, ...removeExplicitStories]);
    } else {
      setHasMoreItems(false);
      return false;
    }
  };

  useEffect(() => {
    getShowsByCategory();
  }, [offset]);

  const loadMoreStories = () => {
    if (hasMoreItem) {
      setOffset(offset + 30);
    }
  };

  return (
    <View style={tw`flex-1 bg-[#291F4E]`}>
      <View>
        <View>
          <Pressable onPress={() => navigation.navigate("Home")}>
            <Text style={tw`text-xl text-white font-bold ml-4 mt-6`}>
              Authors
            </Text>
          </Pressable>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 110,
            marginTop: 25,
          }}
        >
          <FlatList
            horizontal={false}
            numColumns={2}
            keyExtractor={(item, index) => index}
            data={shows}
            showsHorizontalScrollIndicator={false}
            onEndReached={loadMoreStories}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View>
                <Pressable
                  onPress={() =>
                    navigation.navigate("AuthorStories", {
                      publisher: item.publisher,
                    })
                  }
                >
                  <Image
                    source={{ uri: item.images[1].url }}
                    style={{
                      width: 175,
                      height: 180,
                      borderRadius: 10,
                      marginRight: 8,
                    }}
                  />
                  <Text style={{ fontSize: 18,color:"#fff",marginBottom:13}}>
                    {truncateText(item.publisher, 24)}
                  </Text>
                </Pressable>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default AuthorsScreen;
