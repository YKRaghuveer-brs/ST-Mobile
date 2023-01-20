import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import tw from "twrnc";
import { truncateText } from "../utils/common";

const Search = ({ route, navigation }) => {
  const { spotifySearch, selectedLanguages, logout } = useContext(AuthContext);
  const [offset, setOffset] = useState(0);
  const [hasMoreItem, setHasMoreItems] = useState(true);

  const [popularShows, setPopularShows] = useState([]);

  const [storiesList, setStoriesList] = useState([]);
  const [authorsList, setAuthorsList] = useState([]);
  const [episodesList, setEpisodesList] = useState([]);
  const imagePerRow = 8;
  const [nextShows, setNextShows] = useState(imagePerRow);
  const [nextAuthors, setNextAuthors] = useState(imagePerRow);
  const [nextEpisodes, setNextEpisodes] = useState(imagePerRow);
  const [loading, setLoading] = useState(true);

  const [languageCodeArr, setLanguageCodeAr] = useState([]);
  const [languageNameArr, setLanguageNameArr] = useState([]);

  const getLanguageName = (lngs) => {
    const langNames = lngs.map((item) => item.name);
    setLanguageNameArr(langNames);
  };

  const getLanguageCode = (lngs) => {
    const langCodes = lngs.map((item) => item.languageCode);
    setLanguageCodeAr(langCodes);
  };

  useEffect(() => {
    if (selectedLanguages.length === 0) {
      setLanguageCodeAr(["ta", "te", "hi", "en en-US en-AU en-GB"]);
      setLanguageNameArr(["hindi", "tamil", "telugu", "english"]);
      return;
    }
    getLanguageCode(selectedLanguages);
    getLanguageName(selectedLanguages);
  }, [selectedLanguages]);

  useEffect(() => {
    getShowsByCategory();
  }, [route.params.searchTerm, offset, languageNameArr]);

 
  const getShowsByCategory = async () => {
    setLoading(true);
    const languages = await languageNameArr.toString().replaceAll(",", "%20");
    const queryParams = {
      type: "show",
      include_external: "audio",
      market: "IN",
      offset: offset,
      limit: "30",
    };

    const search = {
      q: languages,
      keywords: route.params.searchTerm,
    };

    const response = await spotifySearch(search, queryParams);
    if (response.shows.items.length > 0 || response.shows.next) {
      setHasMoreItems(true);
      let res = [];
      const filteredLang = response.shows.items.filter((show) => {
        languageCodeArr.forEach((lang) => {
          if (lang === "en en-US en-AU en-GB") {
            if (
              (show.languages.includes("en") ||
                show.languages.includes("en-US") ||
                show.languages.includes("en-AU") ||
                show.languages.includes("en-GB")) &&
              !show.explicit
            ) {
              return res.push(show);
            }
          }
          if (show.languages.includes(lang) && !show.explicit) {
            return res.push(show);
          } else return false;
        });
        return show;
      });
      setStoriesList([...storiesList, ...res]);
    } else {
      setHasMoreItems(false);
    }

    setLoading(false);
  };

  const filteredStories = (list) => {
    let removedDuplicates = list.filter(
      (story, index) => index === list.findIndex((elem) => elem.id === story.id)
    );
    setStoriesList(removedDuplicates);
  };

  const loadMoreStories = () => {
    if (hasMoreItem) {
      setLoading(true);
      setOffset(offset + 30);
    } else {
      setLoading(false);
    }
  };

  window.onscroll = function () {
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
      loadMoreStories();
    }
  };

  // useEffect(() => {
  //   getSeveralShows();
  // }, [offset]);

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 15, paddingLeft: 13 }}>
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
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-[#291F4E] pt-4`}>
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
            source={require("../../assets/Images/Spiral_logo_loader.gif")}
          />
        </View>
      ) : (
        ""
      )}

      <View>
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
                    marginLeft: 13,
                  },
                ]}
              >
                {"<"} Explore
              </Text>
            </Pressable>
          </View>
          <Text style={tw`text-xl text-white font-bold content-center  `}>
            Search Results {route.params.searchTerm}
          </Text>

          <View style={styles.rightContainer}></View>
        </View>

        <View style={styles.navBar}>
          <View style={styles.leftContainer}>
            <Text style={tw`text-xl text-white font-bold ml-4`}>Stories</Text>
          </View>

          <View style={styles.rightContainer}></View>
        </View>

        <View style={{ marginBottom: 200, marginLeft: 15 }}>
          <FlatList
            horizontal={false}
            numColumns={2}
            keyExtractor={(item) => item.id}
            data={storiesList}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreStories}
            renderItem={({ item }) => (
              <View>
                <Pressable onPress={() => navigation.navigate("Player", { story: item })}>
                  <Image
                    source={{ uri: item.images[1].url }}
                    style={{
                      width: 175,
                      height: 180,
                      borderRadius: 10,
                      marginRight: 8,
                    }}
                  />
                  <Text style={{ fontSize: 16, color: "#fff", marginBottom: 4 }}>
                    {truncateText(item.name, 24)}
                  </Text>
                  <Text style={{ fontSize: 13, color: "#fff", marginBottom: 12 }}>
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
export default Search;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
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
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  rightIcon: {
    height: 10,
    width: 10,
    resizeMode: "contain",
    backgroundColor: "white",
  },

  separator: {
    height: 0.5,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  text: {
    fontSize: 15,
    color: "black",
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#2A0D62",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
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
});
