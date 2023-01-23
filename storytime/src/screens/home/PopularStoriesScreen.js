/** 
Created: 23.01.2023
Component: Popular Stories screen
Description: Renders the list of Popular shows
(c) Copyright (c) by Nyros. 
**/

import {Text, View, FlatList, Image, StyleSheet, Pressable} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {truncateText} from '../../utils/common';
import {AuthContext} from '../../context/AuthContext';
import tw from 'twrnc';

const PopularStoriesScreen = ({navigation}) => {
  const {spotifySearch, setTracks, spotifyGet, setStory} =
    useContext(AuthContext);
  const [offset, setOffset] = useState(0);
  const [hasMoreItem, setHasMoreItems] = useState(true);
  const [popularStories, setPopularStories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllPopularShows = async () => {
    setLoading(true);
    const searchQuery = 'popular-stories-podcasts';
    const queryParams = {
      type: 'show',
      include_external: 'audio',
      market: 'IN',
      offset,
      limit: '16',
    };

    const search = {
      q: searchQuery,
    };

    const response = await spotifySearch(search, queryParams);

    const removeExplicitStories = response.shows.items.filter(
      story => !story.explicit,
    );
    if (response.shows.items.length > 0 || response.next) {
      filteredStories([...popularStories, ...removeExplicitStories]);
    } else {
      setHasMoreItems(false);
      return false;
    }
    setLoading(false);
  };

  const filteredStories = list => {
    let removedDuplicates = list.filter(
      (story, index) => index === list.findIndex(elem => elem.id === story.id),
    );
    setPopularStories(removedDuplicates);
  };

  const loadMoreStories = () => {
    if (hasMoreItem) {
      setOffset(offset + 16);
    }
  };

  useEffect(() => {
    getAllPopularShows();
  }, [offset]);

  const getEpisodeList = async story => {
    setStory(story);
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
    } else {
      return false;
    }
  };

  return (
    <View style={tw`flex-1 bg-[#291F4E] pt-4 text-white`}>
      {loading ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 2,
            left: 0,
            right: 0,
            top: 40,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../../../assets/Images/Spiral_logo_loader.gif')}
          />
        </View>
      ) : (
        ''
      )}

      <View style={styles.navBar}>
        <View style={styles.leftContainer}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Text
              style={[
                {
                  textAlign: 'left',
                  fontSize: 15,
                  padding: 5,
                  color: '#fff',
                  backgroundColor: '#FFFFFF3E',
                  marginLeft: 10,
                },
              ]}>
              {'<'} Explore
            </Text>
          </Pressable>
        </View>
        <Text style={tw`text-xl text-white font-bold content-center  `}>
          Popular
        </Text>
        <View style={styles.rightContainer}></View>
      </View>

      <View style={{marginBottom: 90, marginLeft: 15}}>
        <FlatList
          horizontal={false}
          numColumns={2}
          keyExtractor={(item, index) => index}
          data={popularStories}
          showsHorizontalScrollIndicator={false}
          onEndReached={loadMoreStories}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View>
              <Pressable onPress={() => getEpisodeList(item)}>
                <Image
                  source={{uri: item.images[1].url}}
                  style={{
                    width: 175,
                    height: 180,
                    borderRadius: 10,
                    marginRight: 8,
                  }}
                />
                <Text style={{fontSize: 18, color: '#fff', marginBottom: 3}}>
                  {truncateText(item.name, 20)}
                </Text>

                <Text style={{fontSize: 14, color: '#fff', marginBottom: 15}}>
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

export default PopularStoriesScreen;

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
});
