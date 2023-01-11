import React, { useState, useEffect, createRef, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,FlatList
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";
import tw from "twrnc";

const Search = ({ route,navigation }) => {
  const { spotifySearch, logout } = useContext(AuthContext);
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

  // useEffect(() => {
  //   getSeveralShows();
  // }, [offset]);

   useEffect(() => {
    getSearchData();
  }, []);

  // OnLoad Page get Authors,Stories,EPisodes data by Search API
  const getSearchData = async () => {
    const queryParams = {
      type: "show,episode",
      include_external: "audio",
      market: "IN",
      limit: "30",
    };
    const search = {
      q: route.params.searchTerm,
    };
    const searchResponse = await spotifySearch(search, queryParams);

    const removeExplicitStories = searchResponse.shows.items.filter(
      (story) => !story.explicit
    );

    setStoriesList(removeExplicitStories); // set all Stories if languages not present
    const authorsData = [];
    removeExplicitStories.map((p, index) => {
      const obj = {
        name: p.publisher,
        images: p.images[0].url,
        about: p.description,
      };
      authorsData.push(obj);
    });
    setAuthorsList(authorsData);
    setEpisodesList(searchResponse.episodes.items);
    setLoading(false);
  };


  // get Stories by ids with API
  const getSeveralShows = async () => {
    const searchQuery = "popular stories podcasts";
    const queryParams = {
      type: "show",
      include_external: "audio",
      market: "IN",
      offset,
      limit: "30",
    };
    const search = {
      q: searchQuery,
    };
    const response = await ctx.SpotifySearch(search, queryParams);

    const removeExplicitStories = response.shows.items.filter(
      (story) => !story.explicit
    );
    if (response.shows.items.length > 0 || response.next) {
      filteredStories([...storiesList, ...removeExplicitStories]);
    } else {
      setHasMoreItems(false);
      return false;
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
        <Text style={{ color: "#fff", paddingTop: 2, fontSize: 12 }}>
          {item.publisher}
        </Text>
      </View>
    );
  };

  //  const renderFooter = () =>{
  //   return (
  //   //Footer View with Load More button
  //     <View style={styles.footer}>

  //        <Text style={styles.btnText}>Loading</Text>
  //         {loading ? (
  //            <Image
  //         style={{width: 100, height: 100}}
  //         // source={{uri: 'https://media3.giphy.com/media/wWue0rCDOphOE/giphy.gif'}}
  //         source={require("../../assets/Images/Spiral_logo_loader.gif")}
  //         />
  //         ) : null}
  //     </View>
  //   );
  // }

  return (
    <View style={tw`flex-1 bg-[#291F4E] pt-4 text-white`}>
      {loading ? (
        <View style={styles.loader}>
          <Image
            style={{ width: 100, height: 100 }}
            // source={{uri: 'https://media3.giphy.com/media/wWue0rCDOphOE/giphy.gif'}}
            source={require("../../assets/Images/Spiral_logo_loader.gif")}
          />
        </View>
      ) : (
        ""
      )}
      <ScrollView
      // keyboardShouldPersistTaps="handled"
      >
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
          
              <Text style={tw`text-xl text-white font-bold ml-4 mt-6 mb-4`}>
                Stories
              </Text>
          </View>

          <View style={styles.rightContainer}></View>
        </View>

        <View style={{ marginTop: 10 }}>
          <FlatList
            numColumns={2}
            keyExtractor={(item, index) => index}
            data={storiesList}
            estimatedItemSize={100}
            renderItem={(item) => renderItem(item)}
            onEndReached={loadMoreStories}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            // ListFooterComponent={() => renderFooter()}
            refreshing={true}
          />
        </View>
        {/*<View style={styles.half_circle}></View>*/}
      </ScrollView>
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
