/** 
Created: 23.01.2023
Component: Library screen
Description: User saved shows are rendered in this component
(c) Copyright (c) by Nyros. 
**/

import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import tw from 'twrnc';
import {AuthContext} from '../../context/AuthContext';


const LibraryScreen = ({navigation}) => {
  const {SpotifyGet,isLoading, HttpGet,setTracks, setStory, setStickyPlayer} = useContext(AuthContext);
  const [libraryList, setLibraryList] = useState([]);
  const [libraryIdList, setLibraryIdList] = useState([]);
  const [updatedLibraryList, setUpdatedLibraryList] = useState([]);
  const [offset, setOffset] = useState(13);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getLibrary();
    }, 2000);
  }, []);

  // get Library (Saved Stories)
  const getLibrary = async () => {
    const res = await HttpGet('library');
    if (res.saved_stories.length != 0) {
      const {saved_stories} = res;
      setLibraryIdList(saved_stories); //we get list of ID's from API
    } 
  };

  // Get shows based on ID
  const getShowsByID = async Ids => {
    const queryParams = {market: 'IN', ids: Ids};
    const response = await SpotifyGet('shows', queryParams);
    setLibraryList(response.shows);
  };

  // to apply pagination on scrolling
  const getUpdatedList = () => {
    const newList = libraryList.slice([0], [offset]).map(item => item);
    setUpdatedLibraryList(newList);
  };

  const loadMoreStories = () => {
    setOffset(offset + 13);
  };

  window.onscroll = function () {
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
      loadMoreStories();
    }
  };

  const getEpisodeList = async story => {
    setStory(story);
    const queryParams = {limit: 50, market: 'IN'};
    const response = await SpotifyGet(
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
    } else {
      return false;
    }
    setStickyPlayer(true);
  };

  useEffect(() => {
    getLibrary();
  }, []);

  useEffect(() => {
    if (libraryIdList && libraryIdList.length) {
      const newList = libraryIdList.toString();
      getShowsByID(newList);
    }
  }, [libraryIdList]);

  useEffect(() => {
    getUpdatedList();
  }, [offset, libraryList]);

  const renderItem = ({item}) => {
    return (
      <View style={{marginBottom: 15, paddingLeft: 13}}>
        <Pressable onPress={() => getEpisodeList(item)}>
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
              color: '#fff',
              paddingTop: 5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
            {item.name}
          </Text>
          <Text style={{color: '#fff', paddingTop: 2, fontSize: 12}}>
            {item.publisher}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-[#291F4E] text-white`}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.navBar}>
          <View style={styles.leftContainer}>
            <Pressable onPress={() => navigation.navigate('Home')}>
              <Text style={tw`text-xl text-white font-bold ml-4 mt-6 mb-3`}>
                Saved Stories
              </Text>
            </Pressable>
          </View>

          <View style={styles.rightContainer}></View>
        </View>

          <View
            style={{
              marginTop: 10,
              height: '100%',
              marginTop: 10,
              width: Dimensions.get('screen').width,
            }}>
            <FlatList
              numColumns={2}
              data={updatedLibraryList}
              renderItem={item => renderItem(item)}
              estimatedItemSize={100}
            />
          </View>
        


        {libraryIdList.length === 0 && !isLoading && (
          <View
            style={{
              marginTop: 250,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                marginTop: 15,
                fontSize: 18,
                marginBottom: 10,
              }}>
              The Library is currently empty
            </Text>
            <Text style={{color: '#fff'}}>
              Find more of the stories amoung our popular stories
            </Text>
            <Pressable onPress={() => navigation.navigate('Popular')}>
              <Text style={{marginTop: 15, fontSize: 18, color: '#0aada8'}}>
                Go To Popular Stories
              </Text>
            </Pressable>
            <Text
              style={{color: 'white', fontSize: 20, marginTop: 100}}
              onPress={getLibrary}>
              LOAD DATA
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default LibraryScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
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
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 20,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
