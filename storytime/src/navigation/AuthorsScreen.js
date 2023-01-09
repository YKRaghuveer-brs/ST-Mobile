import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,  
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { truncateText } from '../utils/common';


const AuthorsScreen = () => {
  const {spotifySearch} = useContext(AuthContext);
  const [offset, setOffset] = useState(0);
  const [hasMoreItem, setHasMoreItems] = useState(true);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);

  const getShowsByCategory = async () => {
    setLoading(true);

    const queryParams = {
      type: "show",
      include_external: "audio",
      market: "IN",
      offset,
      limit: "16",
    };

    const search = {
      q: "popular stories podcasts",
    };

    const response = await spotifySearch(search, queryParams);
    console.log('SHOWS RESPONSE...');
    console.log(response);
    setShows(response.shows.items);
    setLoading(false);
  };

  useEffect(() => {
    getShowsByCategory();
  }, []);

  return (
    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //   <Text>Authors Screen</Text>
    // </View>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {loading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <View style={{marginBottom: 20, marginTop: 25}}>
          <FlatList
            horizontal={false}
            numColumns={2}
            keyExtractor={item => item.id}
            data={shows}
            showsHorizontalScrollIndicator={false}
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

export default AuthorsScreen;
