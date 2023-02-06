/** 
Created: 23.01.2023
Component: Home screen
Description: Renders the Home Screen 
(c) Copyright (c) by Nyros. 
**/

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Button,
  StyleSheet,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import tw from "twrnc";
import { truncateText } from "../../utils/common";
import { AuthContext } from "../../context/AuthContext";

export default function HomeScreeen({navigation}) {
  const {
    spotifySearch,
    spotifyGet,
    logout,
    languages,
    selectLanguages,
    selectedLanguages,
    setTracks,
    setStory,
    stickyPlayer,
    setStickyPlayer,
  } = useContext(AuthContext);

  const [popularStories, setPopularStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerms, setSearchTerms] = useState([]);
  const [query, setQuery] = useState('');
  const [value, setValue] = useState('');
  // const [stickyPlayer, setStickyPlayer] = useState(false);
  const [episodeList, setEpisodeList] = useState([]);
  // const [story, setStory] = useState([]);

  const getPopularShows = async () => {
    setLoading(true);
    const searchQuery = 'popular-stories';
    const queryParams = {
      type: 'show',
      include_external: 'audio',
      market: 'IN',
      limit: '6',
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
  const handleSearch = e => {
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
    AsyncStorage.setItem('searchTerms', JSON.stringify(filteredArr));
    navigation.navigate('Search', {searchTerm: value});
  };

  const getEpisodeList = async story => {
    const queryParams = {limit: 50, market: 'IN'};
    const response = await spotifyGet(
      `shows/${story.id}/episodes`,
      queryParams,
    );
    const episodes = [];
    if (response.items.length > 0 || response.next) {
      response.items.map((episode, index) => {
        let obj = {
          id: index,
          title: episode.name.slice(0, 20),
          artist: 'Justin Bieber',
          albumArtUrl: episode.images[0].url,
          audioUrl: episode.audio_preview_url,
        };
        episodes.push(obj);
      });
      setTracks(episodes);
      setStory(story);
    } else {
      return false;
    }

    setStickyPlayer(true);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={tw`flex flex-1 mb-4 w-2/6`}>
        <Pressable
          onPress={() => getEpisodeList(item)}
          style={tw`w-full px-2`}
          >
          <Image
            source={{
              uri: item.images[1].url,
            }}
            style={tw`w-full h-32 rounded-xl`}
           
          />

          <Text
            numberOfLines={1}
            style={{
              width: 110,
              color: '#fff',
              paddingTop: 5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
            {truncateText(item.name, 16)}
          </Text>
          <Text style={{color: '#fff', paddingTop: 5, fontSize: 12}}>
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
          source={{uri: 'https://i.ibb.co/YfCLy1z/storytime.png'}}
          style={tw`w-10 h-10 mr-2 max-w-full`}

        />
        <Text style={tw`text-white self-center text-xl ml-2`}>
          StoryTime
        </Text>
        <View style={styles.rightContainer}>
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png',
              }}
              style={tw`w-10 h-10 mr-1`}
            />
          </Pressable>
          <TouchableOpacity
            onPress={() => {
              logout();
            }}
            style={{paddingVertical: 15}}>
            <View style={tw`flex-row items-center`}>
              <Text
                style={tw`text-base ml-1.5`}
                >
                Sign out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        keyboardShouldPersistTaps="handled">
        <View style={tw`h-10 mt-4 mb-2 px-4`}>
          <TextInput
            placeholder="Search"
            style={tw`flex-1 border-2 pl-4 rounded-3xl border-white  text-white`}
            placeholderTextColor="#fff"
            onFocus={() => setShowDropdown(true)}
            onChangeText={text => setValue(text)}
            onSubmitEditing={e => handleSearch(e)}
            onBlur={() => setShowDropdown(false)} //when you touch outside the textInput this will call
          />
        </View>
      </TouchableWithoutFeedback>

      <View
        style={tw`absolute z-10 left-1.5 top-56 w-full px-5`}
        >
        {showDropdown ? (
          <View style={tw`text-black bg-white rounded`}>
            <View>
              {searchTerms ? (
                <Text
                  style={tw`text-black text-sm font-medium pl-2 font-medium my-2`}
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
                          style={tw`text-black pl-2.5 py-0.5`}
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
              style={tw`text-black text-sm font-medium pl-2 font-medium my-2`}
              >
              Top
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate('Search', {searchTerm: 'Ramayan'})
              }>
              <Text
                style={tw`text-black pl-2.5 py-0.5`}
              >
                Ramayan
              </Text>
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate('Search', {searchTerm: 'Cricket'})
              }>
              <Text
                style={tw`text-black pl-2.5 py-0.5`}>
                Cricket
              </Text>
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate('Search', {searchTerm: 'Kid Stories'})
              }>
              <Text
                style={tw`text-black pl-2.5 py-0.5`}>
                Kid Stories
              </Text>
            </Pressable>

            <Text
              style={tw`text-black text-sm font-medium pl-2 font-medium my-2`}
             >
              
              Langugaes
            </Text>
            <View
              style={tw`flex-row pl-2`}>
              {languages.map((language, index) => {
                return (
                  <View key={language.id}>
                    {language.isActive ? (
                      <View style={tw`p-2`}>
                        <Button
                          color="green"
                          title={language.name}
                          onPress={() => {
                            language.isActive = false;
                            selectLanguages(prevState =>
                              prevState.filter(item => {
                                return item.id !== language.id;
                              }),
                            );
                          }}></Button>
                      </View>
                    ) : (
                      <View style={tw`p-2`}>
                        <Button
                          color="grey"
                          title={language.name}
                          onPress={() =>
                            selectLanguages(prevState => {
                              language.isActive = true;
                              return [...prevState, language];
                            })
                          }></Button>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>

            <View>
            <Pressable onPress={()=>setShowDropdown(false)}>
            <Text              
              style={tw`text-black text-sm font-medium pl-2 font-medium my-2`}
              >
              Close
            </Text></Pressable></View>
          </View>
        ) : null}
      </View>
      
      <View style={tw`relative border mt-2.5`}>
        
        <Image
          source={require('../../assets/images/banner.png')}
          style={styles.bannerImage}
        />
      </View>
      

      <View>
        <View
          style={{
            marginVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={tw`text-white font-medium text-lg`}>
            Popular
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Popular')}>
            <Text style={tw`text-white font-medium text-lg`}>See all</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View
            style={tw`absolute z-10 left-0 right-0 top-4 bottom-0 items-center justify-center`}
            >
            
            <Image
              style={tw`w-full h-full`}
              source={require('../../assets/images/Spiral_logo_loader.gif')}
            />
          </View>
        ) : (
          <View style={{marginBottom: 20}}>
            <FlatList
              numColumns={2}
              keyExtractor={item => item.id}
              data={popularStories}
              renderItem={(item, index) => renderItem(item, index)}
              style={tw`-mx-2`}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rightIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#291F4E',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#2A0D62',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#fcc630',
    height: 40,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 20,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    position: 'relative',
    backgroundColor: '#F5FCFF',
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
    backgroundColor: '#F5FCFF',
    marginTop: 8,
  },
  infoText: {
    textAlign: 'center',
  },
  autocompleteContainer: {
    // Hack required to make the autocomplete
    // work on Andrdoid
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    padding: 5,
  },
  bannerImage: {
    width: "100%",
    height: 230,
    marginTop: 20,
    borderRadius: 10
  }
});
