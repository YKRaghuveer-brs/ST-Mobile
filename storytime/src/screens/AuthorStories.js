// import {View, Text} from 'react-native';

// const AuthorStories = () => {
//   return (
//     <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
//       <Text>Author Screen</Text>
//     </View>
//   );
// };

// export default AuthorStories


import React, { useState, useEffect, createRef, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  Dimensions,
  FlatList,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";
import tw from "twrnc";

const AuthorStories = ({ route, navigation }) => {
  const { publisher } = route.params;
  const { spotifySearch, logout } = useContext(AuthContext);
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
          onPress={() =>
            navigation.navigate("Player", { story: item })
          }
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
    <View style={tw`flex-1 bg-[#291F4E] pt-12 text-white`}>
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
      <SafeAreaView
      // keyboardShouldPersistTaps="handled"
      >
        <View style={styles.navBar}>
          <View style={styles.leftContainer}>
            <Pressable onPress={() => navigation.goBack()}>
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
                {"<"} Authors
              </Text>
            </Pressable>
          </View>
          <Text style={tw`text-xl text-white font-bold content-center  `}>Author Stories</Text>

          <View style={styles.rightContainer}></View>
        </View>

        <View
          style={{
            height: "100%",
            width: Dimensions.get("screen").width,
            marginTop: 10,
          }}
        >
          <FlatList
            nestedScrollEnabled
            numColumns={2}
            keyExtractor={(item, index) => index}
            data={authorStories}
            estimatedItemSize={100}
            renderItem={(item) => renderItem(item)}
            initialNumToRender={30}
            // keyExtractor={(item, index) => item.id.toString()}
            onEndReached={loadMoreStories}
            onEndReachedThreshold={0.1}
            // ListFooterComponent={renderFooter}
            // onEndReached={loadMoreStories}
            // onEndReachedThreshold={0.5}
            // ItemSeparatorComponent={() => <View style={styles.separator} />}
            // ListFooterComponent={() => renderFooter()}
            refreshing={true}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
export default AuthorStories;

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
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 20,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    height: 0.5,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
});
