// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   FlatList,
//   Image,
// } from 'react-native';
// import tw from 'twrnc';
// import { useSelector } from 'react-redux';
// const LibraryScreen = () => {
//   const { libraryList } = useSelector(state => state.auth);

//   const renderLibrary = ({ item }) => (
//     <View style={styles.itemContainer}>
//       <TouchableOpacity>
//         <Image source={{ uri: item.url }} style={styles.image} />
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.publisher}>{item.publisher}</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <ScrollView style={tw`flex-1 bg-gray-900`}>
//       <Text style={tw`text-2xl font-bold text-white m-4`}>Library</Text>

//       <ScrollView horizontal={true}>
//         <>
//           <FlatList
//             data={libraryList}
//             renderItem={renderLibrary}
//             keyExtractor={item => item.id.toString()}
//             numColumns={2}
//             contentContainerStyle={styles.container}
//           />
//         </>
//       </ScrollView>
//     </ScrollView>
//   );
// };
// export default LibraryScreen;
// const styles = StyleSheet.create({
//   mainBody: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#291F4E',
//     alignContent: 'center',
//   },
//   container: {
//     padding: 5,
//     marginBottom: 100,
//   },
//   itemContainer: {
//     flex: 1,
//     alignItems: 'right',
//     margin: 9,
//   },
//   image: {
//     width: 180,
//     height: 180,
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
// });
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import tw from 'twrnc';
import { useSelector, useDispatch } from 'react-redux';
import { setStoryInfo, openStickyPlayer } from '../store/user/authSlice';
const LibraryScreen = () => {
  const { libraryList } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleStoryPress = (story) => {
    dispatch(setStoryInfo({ s_id: story.id, s_name: story.name })); // Set the story info
    dispatch(openStickyPlayer()); // Open the sticky player
  };

  const renderLibrary = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleStoryPress(item)}>
        <Image source={{ uri: item.url }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.publisher}>{item.publisher}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={tw`flex-1 bg-gray-900`}>
      <Text style={tw`text-2xl font-bold text-white m-4`}>Library</Text>

      <ScrollView horizontal={true}>
        <>
          <FlatList
            data={libraryList}
            renderItem={renderLibrary}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.container}
          />
        </>
      </ScrollView>
    </ScrollView>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#291F4E',
    alignContent: 'center',
  },
  container: {
    padding: 5,
    marginBottom: 100,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'right',
    margin: 9,
  },
  image: {
    width: 180,
    height: 180,
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
});