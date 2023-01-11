import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,Pressable
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {truncateText} from '../utils/common';
import tw from 'twrnc';

const CategoryScreen = ({navigation, route}) => {
  console.log(route.params?.item);
  const {spotifySearch} = useContext(AuthContext);
  const [offset, setOffset] = useState(0);
  const [hasMoreItem, setHasMoreItems] = useState(true);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);

  const getShowsByCategory = async () => {
    setLoading(true);

    const queryParams = {
      type: 'show',
      include_external: 'audio',
      market: 'IN',
      offset,
      limit: '16',
    };

    const search = {
      q: route.params?.item.keywords,
    };

    const response = await spotifySearch(search, queryParams);
    console.log('SHOWS RESPONSE...');
    console.log(response);
    setShows(response.shows.items);
    setLoading(false);
  };

  useEffect(() => {
    getShowsByCategory();
  }, [route.params?.item.keywords]);

  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <Text>{route.params?.item.categoryid}</Text>
  //       <Text>{route.params?.item.category}</Text>
  //       <Text>{route.params?.item.keywords}</Text>
  //     </View>
  //   );

  return (
    <View style={tw`flex-1 bg-[#291F4E]`}>
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

        <View>
        <View>
            <Pressable onPress={() => navigation.navigate("Home")}>
                           <Text style={tw`text-xl text-white font-bold ml-4 mt-6`}>Categories</Text>

            </Pressable>
          </View>
        <View style={{justifyContent: 'center', alignItems: 'center',marginBottom: 110, marginTop: 25}}>
          <FlatList
            horizontal={false}
            numColumns={2}
            keyExtractor={item => item.id}
            data={shows}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={{marginBottom:15}}>
               <Pressable
          onPress={() =>
            navigation.navigate("Player", { story: item })
          }
        >
                <Image
                  source={{uri: item.images[1].url}}
                  style={{
                    width: 175,
                    height: 180,
                    borderRadius: 10,
                    marginRight: 8,
                  }}
                />
                <Text style={{fontSize: 18,color:"#fff"}}>
                  {truncateText(item.publisher, 16)}
                </Text>
                <Text style={{fontSize: 15,color:"#fff"}}>
                  {truncateText(item.name, 15)}
                </Text>
                </Pressable>
              </View>
            )}
          />
        </View>
        </View>
      )}
    </View>
  );
};

export default CategoryScreen;
