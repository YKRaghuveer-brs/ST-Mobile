import React, {useContext, useState, useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,FlatList,
  Image,
  Button,StyleSheet,Pressable
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
import tw from "twrnc";


const fruitsArr = [
  {name: 'Apple', key: 'F1'},
  {name: 'Orange', key: 'F2'},
  {name: 'Jackfruit', key: 'F3'},
  {name: 'Pomegranate', key: 'F4'},
  {name: 'Grapes', key: 'F5'},
];

export default function HomeScreeen({navigation}) {
  const {spotifySearch,logout} = useContext(AuthContext);
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
    console.log("Stories",response);
    setLoading(false);
  };

  useEffect(() => {
    console.log('calling UE');
    getPopularShows();
  }, []);

    // const lastItem = index === data.length - 1;
const renderItem = ({ item, index }) => {
    // const lastItem = index === data.length - 1;

    return (
      // <View style={{ marginBottom: 15 }}>
      <View style={{ flex: 1, marginBottom: 15 }}>
        <Pressable onPress={() => navigation.navigate("PlayerScreen", { story: item })}>
          <Image
            source={{
              uri: item.images[1].url,
            }}
            style={{
              width: 115,
              height: 115,
              borderRadius: 10,
              resizeMode: "contain",
            }}
          />

          <Text
            numberOfLines={1}
            style={{
              width: 110,
              color: "#fff",
              paddingTop: 5,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.name}
          </Text>
          <Text style={{ color: "#fff", paddingTop: 5, fontSize: 12 }}>{item.publisher}</Text>
        </Pressable>
      </View>
    );
  };
   
  

  return (
    <SafeAreaView style={tw`flex-1 bg-[#291F4E] text-white px-3`}>

      <ScrollView>
        {/*<View
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
        </View>*/}

       <View style={styles.navBar}>
          <View style={styles.leftContainer}></View>
          <Image
            source={{ uri: "https://i.ibb.co/YfCLy1z/storytime.png" }}
            style={{
              width: 40,
              height: 40,
              resizeMode: "contain",
              marginRight: 5,
            }}
          />
          <Text style={{ alignSelf: "center", color: "#fff", fontSize: 20 }}>StoryTime</Text>
          <View style={styles.rightContainer}>
            <Pressable onPress={() => navigation.navigate("Profile")}>
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png",
                }}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: "contain",
                  marginRight: 15,
                }}
              />
            </Pressable>
             <TouchableOpacity onPress={() => {logout()}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign out
            </Text>
          </View>
        </TouchableOpacity>
          </View>
        </View>

          <View style={tw`h-10 mt-4 mb-2 px-4`}>

         {/* <Feather
            name="search"
            size={20}
            color="#C6C6C6"
            style={{marginRight: 5, marginTop: 12}}
          />*/}
          <TextInput placeholder="Search"   
                        style={tw`flex-1 border-2 pl-4 rounded-3xl border-white  text-white`}
            placeholderTextColor="#fff"
 />
        </View>

         <View style={{ position: "relative" }}>
          <Image
            source={require("../../assets/Images/banner.png")}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 10,
              marginTop: 10,
            }}
          />
        </View>

        <View>
          <View
            style={{
              marginVertical: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: "#fff",fontSize: 18, fontFamily: 'Roboto-Medium'}}>
              Popular
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Popular')}>
              <Text style={{color: '#fff'}}>See all</Text>
            </TouchableOpacity>
          </View>

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
            <View style={{marginBottom: 20}}>
              <FlatList
            numColumns={3}
                keyExtractor={item => item.id}
                data={popularStories}
                // renderItem={({item}) => (
                //   <View>
                //           <TouchableOpacity onPress={() => navigation.navigate("Player", { story: item })}>

                //     <Image
                //       source={{uri: item.images[1].url}}
                //       style={{
                //         width: 110,
                //         height: 110,
                //         borderRadius: 10,
                //         marginRight: 8,
                //       }}

                //     />
                //     <Text style={{fontSize: 18}}>
                //       {truncateText(item.publisher, 12)}
                //     </Text>
                //     <Text style={{fontSize: 15}}>
                //       {truncateText(item.name, 12)}
                //     </Text>
                //     </TouchableOpacity>
                //   </View>
                // )}
                            renderItem={(item, index) => renderItem(item, index)}

              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    // marginLeft: 12,
    // marginRight: 12,
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
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#291F4E",
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
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 20,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    position: "relative",
    backgroundColor: "#F5FCFF",
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
    backgroundColor: "#F5FCFF",
    marginTop: 8,
  },
  infoText: {
    textAlign: "center",
  },
  autocompleteContainer: {
    // Hack required to make the autocomplete
    // work on Andrdoid
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
    padding: 5,
  },
});
