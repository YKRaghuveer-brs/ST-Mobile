import React, {useContext, useState, useEffect} from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import BannerSlider from '../components/BannerSlider';
import {freeGames, paidGames, sliderData} from '../model/data';
import {windowWidth} from '../utils/Dimensions';
import Carousel from 'react-native-snap-carousel';
import CustomSwitch from '../components/CustomSwitch';
import ListItems from './ListItems';
import {AuthContext} from '../context/AuthContext';
import {truncateText} from '../utils/common';

const fruitsArr = [
  {name: 'Apple', key: 'F1'},
  {name: 'Orange', key: 'F2'},
  {name: 'Jackfruit', key: 'F3'},
  {name: 'Pomegranate', key: 'F4'},
  {name: 'Grapes', key: 'F5'},
];

export default function HomeScreeen({navigation}) {
  const {spotifySearch} = useContext(AuthContext);
  const [popularStories, setPopularStories] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const renderBanner = ({item, index}) => {
    // console.log(item);
    // console.log(index);
    return <BannerSlider data={item} />;
  };

 

  const getPopularShows = async () => {
    setLoading(true);
    const searchQuery = 'popular-stories-podcasts';
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
    console.log(response);
    setLoading(false);
  };

  useEffect(() => {
    console.log('calling UE');
    getPopularShows();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
            Hello John
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <ImageBackground
              source={require('../assets/images/user-profile.jpg')}
              style={{width: 35, height: 35}}
              imageStyle={{borderRadius: 25}}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderColor: '#C6C6C6',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 8,
            marginBottom: 30,
          }}>
          <Feather
            name="search"
            size={20}
            color="#C6C6C6"
            style={{marginRight: 5, marginTop: 12}}
          />
          <TextInput placeholder="Search" />
        </View>

        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={sliderData}
          renderItem={renderBanner}
          sliderWidth={windowWidth - 40}
          itemWidth={300}
          loop={true}
        />

        <View style={{marginVertical: 20}}>
          <View
            style={{
              marginVertical: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
              Popular
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Popular')}>
              <Text style={{color: '#0aada8'}}>See all</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <View style={{marginBottom: 20}}>
              <FlatList
                horizontal={true}
                keyExtractor={item => item.id}
                data={popularStories}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <View>
                    <Image
                      source={{uri: item.images[1].url}}
                      style={{
                        width: 110,
                        height: 110,
                        borderRadius: 10,
                        marginRight: 8,
                      }}
                    />
                    <Text style={{fontSize: 18}}>
                      {truncateText(item.publisher, 12)}
                    </Text>
                    <Text style={{fontSize: 15}}>
                      {truncateText(item.name, 12)}
                    </Text>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
