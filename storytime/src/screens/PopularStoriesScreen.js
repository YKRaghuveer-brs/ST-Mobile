import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Button,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {truncateText} from '../utils/common';
import {AuthContext} from '../context/AuthContext';

const PopularStoriesScreen = () => {
  const {spotifySearch, HttpGet} = useContext(AuthContext);
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
      (story) => !story.explicit
    );
    if (response.shows.items.length > 0 || response.next) {
      filteredStories([...popularStories, ...removeExplicitStories]);
    } else {
      setHasMoreItems(false);
      return false;
    }
    
    // setPopularStories(response.shows.items);
    // console.log(response);
    setLoading(false);
  };

  const filteredStories = (list) => {
    let removedDuplicates = list.filter(
      (story, index) => index === list.findIndex((elem) => elem.id === story.id)
    );
    setPopularStories(removedDuplicates);
  };

  const loadMoreStories = () => {
    if (hasMoreItem) {
      // setLoading(true);
      setOffset(offset + 16);
    } 
    // alert("reached end...")
  };

  useEffect(() => {
    getAllPopularShows();
  }, [offset]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {loading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <View style={{marginBottom: 20, marginTop: 25}}>
          <FlatList
            horizontal={false}
            numColumns={2}
            keyExtractor={item => item.id}
            data={popularStories}
            showsHorizontalScrollIndicator={false}
            onEndReached={loadMoreStories}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View>
                <Image
                  source={{uri: item.images[1].url}}
                  style={{
                    width: 175,
                    height: 180,
                    borderRadius: 10,
                    marginRight: 8,
                  }}
                />
                <Text style={{fontSize: 18}}>
                  {truncateText(item.publisher, 16)}
                </Text>
                <Text style={{fontSize: 15}}>
                  {truncateText(item.name, 15)}
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default PopularStoriesScreen;
