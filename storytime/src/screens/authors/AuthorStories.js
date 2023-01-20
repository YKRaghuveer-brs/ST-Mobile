import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import tw from "twrnc";
import { truncateText } from "../../utils/common";


const AuthorStories = ({ route, navigation }) => {
  const { publisher } = route.params;
  const { spotifySearch, logout,setTracks,spotifyGet } = useContext(AuthContext);
  const [author, setAuthor] = useState(publisher);
  const [authorStories, setAuthorStories] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [story, setStory] = useState([]);
  const [hasMoreItem, setHasMoreItems] = useState(true);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuthorStories();
  }, [offset]);

  // OnLoad get authors stories with Search API
  const getAuthorStories = async () => {
    const queryParams = {
      type: "show",
      include_external: "audio",
      market: "IN",
      offset,
      limit: "30",
    };
    console.log("Author", publisher);
    const search = {
      q: publisher,
    };

    const response = await spotifySearch(search, queryParams);
    if (response.shows.items.length > 0 || response.shows.next) {
      const publisherShows = response.shows.items.filter((obj) => {
        return obj.publisher === publisher;
      });
      const removeExplicitStories = publisherShows.filter((story) => !story.explicit);
      setAuthorStories([...authorStories, ...removeExplicitStories]);
    } else {
      setLoading(false);
      setHasMoreItems(false);
      return false;
    }
    setLoading(false);
  };

  // SideBarOpen
  const onSetSidebarOpen = (open) => {
    setSidebarOpen(open);
  };

  // Get story passed to sidebar
  const getStoryData = async (story) => {
    setStory(story);
    setSidebarOpen(true); //  Open Side Bar with pass story,episodes
  };

   const getEpisodeList = async (story) => {
    // setStory(story);
    // setEpisodeList([]);
    // setStickyPlayer(false);
    const queryParams = { limit: 50, market: "IN" };
    const response = await spotifyGet(
      `shows/${story.id}/episodes`,
      queryParams
    );
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

      // setEpisodeList(episodes);
      setTracks(episodes)
    } else {
      return false;
    }

    // setStickyPlayer(true);
  };


  const loadMoreStories = () => {
    if (hasMoreItem) {
      setLoading(true);
      setOffset(offset + 30);
    } else {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 15, paddingLeft: 13 }}>
                 <Pressable 
                 // onPress={() => navigation.navigate("Player", { story: item })}
          onPress={() => getEpisodeList(item)}
                 >

        <Image
          source={{
            uri: item.images[1].url,
          }}
          style={{
            width: 170,
            height: 170,
            borderRadius: 5,
          }}
        />

        <Text
          numberOfLines={1}
          style={{
            width: 100,
            color: "#fff",
            paddingTop: 5,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.name}
        </Text>
        <Text style={{ color: "#fff", paddingTop: 2, fontSize: 12 }}>{item.publisher}</Text>
                </Pressable>
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-[#291F4E] pt-4 text-white`}>
      {loading ? (
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            left: 0,
            right: 0,
            top: 40,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            source={require("../../../assets/Images/Spiral_logo_loader.gif")}
          />
        </View>
      ) : (
        ""
      )}

       <View style={styles.navBar}>
        <View style={styles.leftContainer}>
          <Pressable onPress={() => navigation.navigate("Home")}>
            <Text
              style={[
                {
                  textAlign: "left",
                  fontSize: 15,
                  padding: 5,
                  color: "#fff",
                  backgroundColor: "#FFFFFF3E",
                  marginLeft: 10,
                },
              ]}
            >
              {"<"} Explore
            </Text>
          </Pressable>
        </View>
        <Text style={tw`text-xl text-white font-bold content-center  `}>Author Stories</Text>
        <View style={styles.rightContainer}></View>
      </View>

      <View style={{marginBottom: 90,marginLeft:15 }}>
        <FlatList
          horizontal={false}
          numColumns={2}
            keyExtractor={(item, index) => index}
          data={authorStories}
          showsHorizontalScrollIndicator={false}
          onEndReached={loadMoreStories}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View>
                    <Pressable
                     // onPress={() => navigation.navigate("Player", { story: item })}
                              onPress={() => getEpisodeList(item)}

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
            
              <Text style={{ fontSize: 18,color:"#fff",marginBottom:3}}>
                {truncateText(item.name, 20)}
              </Text>

                <Text style={{ fontSize: 14,color:"#fff",marginBottom:15 }}>
                {truncateText(item.publisher, 16)}
              </Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default AuthorStories;

const styles = StyleSheet.create({

  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

});
