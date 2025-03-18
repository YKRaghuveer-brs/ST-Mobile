// import {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   StyleSheet,
//   ScrollView,
//   Pressable,
// } from 'react-native';
// import {ImageSlider} from 'react-native-image-slider-banner';
// import {useDispatch} from 'react-redux';
// import tw from 'twrnc';
// import {
//   logout,
//   openStickyPlayer,
//   setStoryInfo,
// } from '../store/user/authSlice';
// import {useGetPopularShowsQuery} from '../store/spotify/spotifyApiSlice';
// import {truncateText} from '../utils/utils';
// import LoadingSpinner from '../components/LoadingSpinner';
// import {TouchableOpacity} from 'react-native-gesture-handler';

// const HomeScreen = () => {
//   const dispatch = useDispatch();
//   const [popularStories, setPopularStories] = useState([]);

//   const {data: popularShowsData, isLoading: popularShowsLoading} =
//     useGetPopularShowsQuery({
//       queryParams: {
//         q: '"popular stories" "popular podcasts" "kids-stories"  language:"tamil" "telugu" "english"  "hindi" ',
//         type: 'show',
//         include_external: 'audio',
//         market: 'IN',
//         limit: '6',
//       },
//     });

//   const logoutHandler = () => {
//     dispatch(logout());
//   };

//   const playerHandler = (s_id, s_name) => {
//     dispatch(setStoryInfo({s_id, s_name}));
//     dispatch(openStickyPlayer());
//   };
  
//   const renderPopularStories = ({item}) => (
//     <TouchableOpacity onPress={() => playerHandler(item.id, item.name)}>
//       <View style={styles.itemContainer}>
//         <Image source={{uri: item.images[0].url}} style={styles.image} />
//         <Text style={styles.name}> {truncateText(item.name, 16)}</Text>
//         <Text style={styles.publisher}>{truncateText(item.publisher, 16)}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   useEffect(() => {
//     if (popularShowsData) {
//       const nonExplicitPopularStories = popularShowsData.shows.items.filter(
//         story => !story.explicit,
//       );
//       // console.log(nonExplicitPopularStories);
//       setPopularStories(nonExplicitPopularStories.slice(0, 6));
//     }
//   }, [popularShowsData]);

//   return (
//     <>
//       <ScrollView nestedScrollEnabled={true} style={{width: '100%'}}>
//         <View style={styles.mainBody}>
//           <View style={tw`mx-3`}>
//             <View style={styles.navBar}>
//               <View style={styles.leftContainer}></View>
//               <Image
//                 source={{uri: 'https://i.ibb.co/YfCLy1z/storytime.png'}}
//                 style={{
//                   width: 40,
//                   height: 40,
//                   resizeMode: 'contain',
//                 }}
//               />
//               <Text style={tw`text-white self-center text-xl ml-2`}>
//                 StoryTime
//               </Text>
//               <View style={styles.rightContainer}>
//                 <Pressable onPress={logoutHandler}>
//                   <Image
//                     source={{
//                       uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png',
//                     }}
//                     style={tw`w-10 h-10 ml-2.5`}
//                   />
//                   <Text style={tw`text-base text-white px-2`}>Sign out</Text>
//                 </Pressable>
//               </View>
//             </View>
//           </View>

//           <View style={tw`h-64 mb-8`}>
//             <ImageSlider
//               data={[
//                 {img: require('../assets/images/mobileBanner1.png')},
//                 {img: require('../assets/images/mobileBanner2.png')},
//                 {img: require('../assets/images/mobileBanner3.png')},
//               ]}
//               localImg
//               indicatorContainerStyle={{
//                 position: 'absolute',
//                 top: 40,
//                 paddingTop: 10,
//                 paddingBottom: 10,
//               }}
//               caroselImageContainerStyle={{
//                 borderRadius: 12,
//                 overflow: 'hidden',
//                 width: 390,
//                 position: 'relative',
//                 margin: 0,
//               }}
//               autoPlay={true}
//               closeIconColor="#fff"
//               preview={false}
//             />
//           </View>

//           <Text style={styles.popular}>Popular</Text>
//           <ScrollView horizontal={true}>
//             {popularShowsLoading ? (
//               <View style={{marginLeft: 200, marginBottom: 150, padding: 15}}>
//                 <LoadingSpinner />
//               </View>
//             ) : (
//               <FlatList
//                 data={popularStories}
//                 renderItem={renderPopularStories}
//                 keyExtractor={item => item.id.toString()}
//                 numColumns={3}
//                 contentContainerStyle={styles.container}
//               />
//             )}
//           </ScrollView>
//         </View>
//       </ScrollView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   mainBody: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#291F4E',
//     alignContent: 'center',
//     height: 800,
//   },
//   container: {
//     padding: 5,
//     marginBottom: 100,
//   },
//   itemContainer: {
//     flex: 1,
//     alignItems: 'center',
//     margin: 9,
//   },
//   image: {
//     width: 120,
//     height: 120,
//     borderRadius: 10,
//   },
//   name: {
//     marginTop: 7,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   publisher: {
//     marginTop: 5,
//     color: '#fff',
//   },
//   popular: {
//     marginTop: 20,
//     marginLeft: 25,
//     color: '#fff',
//     fontSize: 18,
//   },
//   leftContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//   },
//   rightContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   navBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 25,
//   },
// });

// export default HomeScreen;

import {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import {ImageSlider} from 'react-native-image-slider-banner';
import {useDispatch} from 'react-redux';
import tw from 'twrnc';
import {
  logout,
  openStickyPlayer,
  setStoryInfo,
} from '../store/user/authSlice';
import {useGetPopularShowsQuery} from '../store/spotify/spotifyApiSlice';
import {truncateText} from '../utils/utils';
import LoadingSpinner from '../components/LoadingSpinner';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [popularStories, setPopularStories] = useState([]);

  const {data: popularShowsData, isLoading: popularShowsLoading} =
    useGetPopularShowsQuery({
      queryParams: {
        q: '"popular stories" "popular podcasts" "kids-stories"  language:"tamil" "telugu" "english"  "hindi" ',
        type: 'show',
        include_external: 'audio',
        market: 'IN',
        limit: '6',
      },
    });

  const logoutHandler = () => {
    dispatch(logout());
  };

  const playerHandler = (s_id, s_name) => {
    dispatch(setStoryInfo({s_id, s_name}));
    dispatch(openStickyPlayer());
  };
  
  const renderPopularStories = ({item}) => (
    <TouchableOpacity onPress={() => playerHandler(item.id, item.name)}>
      <View style={styles.itemContainer}>
        <Image source={{uri: item.images[0].url}} style={styles.image} />
        <Text style={styles.name}> {truncateText(item.name, 16)}</Text>
        <Text style={styles.publisher}>{truncateText(item.publisher, 16)}</Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    if (popularShowsData) {
      const nonExplicitPopularStories = popularShowsData.shows.items.filter(
        story => !story.explicit,
      );
      // console.log(nonExplicitPopularStories);
      setPopularStories(nonExplicitPopularStories.slice(0, 6));
    }
  }, [popularShowsData]);

  return (
    <>
      <ScrollView nestedScrollEnabled={true} style={{width: '100%'}}>
        <View style={styles.mainBody}>
          <View style={tw`mx-3`}>
            <View style={styles.navBar}>
              <View style={styles.leftContainer}></View>
              <Image
                source={{uri: 'https://i.ibb.co/YfCLy1z/storytime.png'}}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: 'contain',
                }}
              />
              <Text style={tw`text-white self-center text-xl ml-2`}>
                StoryTime
              </Text>
              <View style={styles.rightContainer}>
                <Pressable onPress={logoutHandler}>
                  <Image
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png',
                    }}
                    style={tw`w-10 h-10 ml-2.5`}
                  />
                  <Text style={tw`text-base text-white px-2`}>Sign out</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={tw`h-64 mb-8`}>
            <ImageSlider
              data={[
                {img: require('../assets/images/mobileBanner1.png')},
                {img: require('../assets/images/mobileBanner2.png')},
                {img: require('../assets/images/mobileBanner3.png')},
              ]}
              localImg
              indicatorContainerStyle={{
                position: 'absolute',
                top: 40,
                paddingTop: 10,
                paddingBottom: 10,
              }}
              caroselImageContainerStyle={{
                borderRadius: 12,
                overflow: 'hidden',
                width: 390,
                position: 'relative',
                margin: 0,
              }}
              autoPlay={true}
              closeIconColor="#fff"
              preview={false}
            />
          </View>

          <Text style={styles.popular}>Popular</Text>
          <ScrollView horizontal={true}>
            {popularShowsLoading ? (
              <View style={{marginLeft: 200, marginBottom: 150, padding: 15}}>
                <LoadingSpinner />
              </View>
            ) : (
              <FlatList
                data={popularStories}
                renderItem={renderPopularStories}
                keyExtractor={item => item.id.toString()}
                numColumns={3}
                contentContainerStyle={styles.container}
              />
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#291F4E',
    alignContent: 'center',
    height: 800,
  },
  container: {
    padding: 5,
    marginBottom: 100,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 9,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  name: {
    marginTop: 7,
    fontWeight: 'bold',
    color: '#fff',
  },
  publisher: {
    marginTop: 5,
    color: '#fff',
  },
  popular: {
    marginTop: 20,
    marginLeft: 25,
    color: '#fff',
    fontSize: 18,
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
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },
});

export default HomeScreen;
