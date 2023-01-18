import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useState, useEffect } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  Button,
  StyleSheet,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import BannerSlider from "../components/BannerSlider";
import { freeGames, paidGames, sliderData } from "../model/data";
import { windowWidth } from "../utils/Dimensions";
import Carousel from "react-native-snap-carousel";
import CustomSwitch from "../components/CustomSwitch";
import ListItems from "./ListItems";
import { AuthContext } from "../context/AuthContext";
import { truncateText } from "../utils/common";
import tw from "twrnc";
import Controls from "../stickyPlayer/Controls";
import Player from "../stickyPlayer/Player";
import TextTicker from "react-native-text-ticker";

export const TRACKS = [
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
    albumArtUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

export default function HomeScreeen({ navigation }) {
  const {
    spotifySearch,
    spotifyGet,
    logout,
    languages,
    selectLanguages,
    selectedLanguages,
  } = useContext(AuthContext);

  const [popularStories, setPopularStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerms, setSearchTerms] = useState([]);
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("");
  const [stickyPlayer, setStickyPlayer] = useState(false);
  const [episodeList, setEpisodeList] = useState([]);
  const [story, setStory] = useState([]);

  const getPopularShows = async () => {
    setLoading(true);
    const searchQuery = "popular-stories-podcasts";
    const queryParams = {
      type: "show",
      include_external: "audio",
      market: "IN",
      limit: "6",
    };
    const search = {
      q: searchQuery,
    };
    const response = await spotifySearch(search, queryParams);
    setPopularStories(response.shows.items);
    setLoading(false);
  };

  useEffect(() => {
    getPopularShows();
  }, []);

  // Search Terms save in localstorage and redirect to search
  const handleSearch = (e) => {
    e.preventDefault();
    let arr = searchTerms;
    if (arr.length < 7) {
      arr.unshift(value);
    } else {
      arr.unshift(value);
      arr.pop();
    }
    const filteredArr = [...new Set(arr)];
    setSearchTerms(filteredArr);
    AsyncStorage.setItem("searchTerms", JSON.stringify(filteredArr));
    navigation.navigate("Search", { searchTerm: value });
  };

  const getEpisodeList = async (story) => {
    setStory(story);
    setEpisodeList([]);
    setStickyPlayer(false);
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

      setEpisodeList(episodes);
    } else {
      return false;
    }

    setStickyPlayer(true);
  };

  // const lastItem = index === data.length - 1;
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1, marginBottom: 15 }}>
        <Pressable
          // onPress={() => navigation.navigate("Player", { story: item })}
          // onPress={() => setStickyPlayer(true)}
          onPress={() => getEpisodeList(item)}
        >
          <Image
            source={{
              uri: item.images[1].url,
            }}
            style={{
              width: 115,
              height: 115,
              borderRadius: 10,
              resizeMode: "contain",
            }}
          />

          <Text
            numberOfLines={1}
            style={{
              width: 110,
              color: "#fff",
              paddingTop: 5,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {truncateText(item.name, 16)}
          </Text>
          <Text style={{ color: "#fff", paddingTop: 5, fontSize: 12 }}>
            {truncateText(item.publisher, 16)}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#291F4E] text-white px-3`}>
      <View style={styles.navBar}>
        <View style={styles.leftContainer}></View>
        <Image
          source={{ uri: "https://i.ibb.co/YfCLy1z/storytime.png" }}
          style={{
            width: 40,
            height: 40,
            resizeMode: "contain",
            marginRight: 5,
          }}
        />
        <Text style={{ alignSelf: "center", color: "#fff", fontSize: 20 }}>
          StoryTime
        </Text>
        <View style={styles.rightContainer}>
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png",
              }}
              style={{
                width: 40,
                height: 40,
                resizeMode: "contain",
                marginRight: 15,
              }}
            />
          </Pressable>
          <TouchableOpacity
            onPress={() => {
              logout();
            }}
            style={{ paddingVertical: 15 }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Roboto-Medium",
                  marginLeft: 5,
                }}
              >
                Sign out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        keyboardShouldPersistTaps="handled"
      >
        <View style={tw`h-10 mt-4 mb-2 px-4`}>
          <TextInput
            placeholder="Search"
            style={tw`flex-1 border-2 pl-4 rounded-3xl border-white  text-white`}
            placeholderTextColor="#fff"
            onFocus={() => setShowDropdown(true)}
            onChangeText={(text) => setValue(text)}
            onSubmitEditing={(e) => handleSearch(e)}
            onBlur={() => setShowDropdown(false)} //when you touch outside the textInput this will call
          />
        </View>
      </TouchableWithoutFeedback>

      <View
        style={{
          position: "absolute",
          top: 130,
          left: 10,
          width: "100%",
          zIndex: 3,
          paddingHorizontal: 20,
        }}
      >
        {showDropdown ? (
          <View style={tw`text-black bg-white rounded`}>
            <View>
              {searchTerms ? (
                <Text
                  style={{
                    color: "#000",
                    fontSize: 15,
                    marginVertical: 7,
                    paddingLeft: 8,
                    fontWeight: "500",
                  }}
                >
                  Recent Search
                </Text>
              ) : null}

              {searchTerms && searchTerms.length > 0 ? (
                <View>
                  {searchTerms?.map((searchTerm, index) => {
                    return (
                      <Pressable onPress={() => selectSearchItem(searchTerm)}>
                        <Text
                          style={{
                            color: "#000",
                            paddingVertical: 2,
                            paddingLeft: 10,
                          }}
                        >
                          {searchTerm}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              ) : null}
            </View>

            <Text
              style={{
                color: "#000",
                fontSize: 15,
                marginVertical: 7,
                paddingLeft: 8,
                fontWeight: "500",
              }}
            >
              Top
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate("Search", { searchTerm: "Ramayan" })
              }
            >
              <Text
                style={{ color: "#000", paddingVertical: 2, paddingLeft: 10 }}
              >
                Ramayan
              </Text>
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate("Search", { searchTerm: "Cricket" })
              }
            >
              <Text
                style={{ color: "#000", paddingVertical: 2, paddingLeft: 10 }}
              >
                Cricket
              </Text>
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate("Search", { searchTerm: "Kid Stories" })
              }
            >
              <Text
                style={{ color: "#000", paddingVertical: 2, paddingLeft: 10 }}
              >
                Kid Stories
              </Text>
            </Pressable>

            <Text
              style={{
                color: "#000",
                fontSize: 15,
                marginVertical: 7,
                paddingLeft: 8,
                fontWeight: "500",
              }}
            >
              Langugaes
            </Text>
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 8,
              }}
            >
              {/* <Button  title='Get Selected' onPress={getSelected}></Button> */}
              {languages.map((language, index) => {
                return (
                  <View key={language.id}>
                    {language.isActive ? (
                      <View style={{ padding: 5 }}>
                        <Button
                          color="green"
                          title={language.name}
                          onPress={() => {
                            language.isActive = false;
                            selectLanguages((prevState) =>
                              prevState.filter((item) => {
                                return item.id !== language.id;
                              })
                            );
                          }}
                        ></Button>
                      </View>
                    ) : (
                      <View style={{ padding: 5 }}>
                        <Button
                          color="grey"
                          title={language.name}
                          onPress={() =>
                            selectLanguages((prevState) => {
                              language.isActive = true;
                              return [...prevState, language];
                            })
                          }
                        ></Button>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ) : null}
      </View>

      <View style={{ position: "relative" }}>
        <Image
          source={require("../../assets/Images/banner.png")}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 10,
            marginTop: 10,
          }}
        />
      </View>

      <View>
        <View
          style={{
            marginVertical: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ color: "#fff", fontSize: 18, fontFamily: "Roboto-Medium" }}
          >
            Popular
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Popular")}>
            <Text style={{ color: "#fff" }}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={{position: 'absolute',zIndex: 3}}>
<View><Text style={{color:"red"}}>my text</Text></View>
<View><Text style={{color:"red"}}>My fixed footer</Text></View>
</View>*/}

        {stickyPlayer ? (
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
            {episodeList && episodeList.length ? (
              <Player
                tracks={episodeList}
                story={story}
                press={() => navigation.navigate("Player", { story: story })}
              />
            ) : null}
          </View>
        ) : null}

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
              // source={{uri: 'https://media3.giphy.com/media/wWue0rCDOphOE/giphy.gif'}}
              source={require("../../assets/Images/Spiral_logo_loader.gif")}
            />
          </View>
        ) : (
          <View style={{ marginBottom: 20 }}>
            <FlatList
              numColumns={3}
              keyExtractor={(item) => item.id}
              data={popularStories}
              // renderItem={({item}) => (
              //   <View>
              //           <TouchableOpacity onPress={() => navigation.navigate("Player", { story: item })}>

              //     <Image
              //       source={{uri: item.images[1].url}}
              //       style={{
              //         width: 110,
              //         height: 110,
              //         borderRadius: 10,
              //         marginRight: 8,
              //       }}

              //     />
              //     <Text style={{fontSize: 18}}>
              //       {truncateText(item.publisher, 12)}
              //     </Text>
              //     <Text style={{fontSize: 15}}>
              //       {truncateText(item.name, 12)}
              //     </Text>
              //     </TouchableOpacity>
              //   </View>
              // )}
              renderItem={(item, index) => renderItem(item, index)}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    // marginLeft: 12,
    // marginRight: 12,
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
  rightIcon: {
    height: 10,
    width: 10,
    resizeMode: "contain",
    backgroundColor: "white",
  },
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#291F4E",
    alignContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#2A0D62",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#fcc630",
    height: 40,
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 20,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    position: "relative",
    backgroundColor: "#F5FCFF",
    flex: 1,

    // Android requiers padding to avoid overlapping
    // with content and autocomplete
    paddingTop: 50,

    // // Make space for the default top bar
    // ...Platform.select({
    //   web: {
    //     marginTop: 0,
    //   },
    //   default: {
    //     marginTop: 25,
    //   },
    // }),
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: "#F5FCFF",
    marginTop: 8,
  },
  infoText: {
    textAlign: "center",
  },
  autocompleteContainer: {
    // Hack required to make the autocomplete
    // work on Andrdoid
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
    padding: 5,
  },
});
