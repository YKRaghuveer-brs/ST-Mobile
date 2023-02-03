/** 
Created: 23.01.2023
Component: Category screen
Description: Renders the list of Shows of a selected category and languages
(c) Copyright (c) by Nyros. 
**/

import React, {useContext, useState, useEffect} from 'react';
import {Text, View, FlatList, Image, Pressable} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import {truncateText} from '../../utils/common';
import tw from 'twrnc';

const CategoryStoriesScreen = ({navigation, route}) => {
  const {SpotifySearch, isLoading, SpotifyGet, selectedLanguages, setTracks, setStory, stickyPlayer,
    setStickyPlayer} =
    useContext(AuthContext);

  const [offset, setOffset] = useState(0);
  const [hasMoreItem, setHasMoreItems] = useState(false);
  const [shows, setShows] = useState([]);
  const [languageCodeArr, setLanguageCodeAr] = useState([]);
  const [languageNameArr, setLanguageNameArr] = useState([]);

  const getLanguageName = lngs => {
    const langNames = lngs.map(item => item.name);
    setLanguageNameArr(langNames);
  };

  const getLanguageCode = lngs => {
    const langCodes = lngs.map(item => item.languageCode);
    setLanguageCodeAr(langCodes);
  };

  const getShowsByCategory = async () => {
    const languages = await languageNameArr.toString().replaceAll(',', '%20');
    const queryParams = {
      type: 'show',
      include_external: 'audio',
      market: 'IN',
      offset: offset,
      limit: '16',
    };

    const search = {
      q: languages,
      keywords: route.params?.item.keywords,
    };

    const response = await SpotifySearch(search, queryParams);

    if (response.shows.items.length > 0 || response.shows.next) {
      setHasMoreItems(true);
      let res = [];
      const filteredLang = response.shows.items.filter(show => {
        languageCodeArr.forEach(lang => {
          if (lang === 'en en-US en-AU en-GB') {
            if (
              (show.languages.includes('en') ||
                show.languages.includes('en-US') ||
                show.languages.includes('en-AU') ||
                show.languages.includes('en-GB')) &&
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
      setShows([...shows, ...res]);
    } else {
      setHasMoreItems(false);
    }
  };

  const loadMoreStories = () => {
    if (hasMoreItem) {
      setOffset(offset + 16);
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
    if (selectedLanguages.length === 0) {
      setLanguageCodeAr(['ta', 'te', 'hi', 'en en-US en-AU en-GB']);
      setLanguageNameArr(['hindi', 'tamil', 'telugu', 'english']);
      return;
    }
    getLanguageCode(selectedLanguages);
    getLanguageName(selectedLanguages);
  }, [selectedLanguages]);

  useEffect(() => {
    getShowsByCategory();
  }, [route.params?.item.keywords, offset, languageNameArr]);

  return (
    <View style={tw`flex-1 bg-[#291F4E]`}>
      {isLoading ? (
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
            source={require('../../assets/images/Spiral_logo_loader.gif')}
          />
        </View>
      ) : (
        ''
      )}

      <View>
        <View>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Text style={tw`text-xl text-white font-bold ml-4 mt-6`}>
              Categories
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 110,
            marginTop: 25,
          }}>
          <FlatList
            horizontal={false}
            numColumns={2}
            keyExtractor={(item, index) => index}
            data={shows}
            showsHorizontalScrollIndicator={false}
            onEndReached={loadMoreStories}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={{marginBottom: 15}}>
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
                  <Text style={{fontSize: 18, color: '#fff'}}>
                    {truncateText(item.publisher, 16)}
                  </Text>
                  <Text style={{fontSize: 15, color: '#fff'}}>
                    {truncateText(item.name, 15)}
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

export default CategoryStoriesScreen;
