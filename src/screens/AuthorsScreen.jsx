
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

const popularStoryList = [
  {
    id: 1,
    name: 'History',
    url: 'https://i.scdn.co/image/ab67656300005f1f973a89728038eec4769d3157',
    publisher: 'sam',
  },
  {
    id: 2,
    name: 'Stories for kids',
    url: 'https://i.scdn.co/image/ab67656300005f1ffcceceed9f257ebbe9591bde',
    publisher: 'Kids candle',
  },
  {
    id: 3,
    name: 'Tamil audio books',
    url: 'https://i.scdn.co/image/4166df29f494ffa171d90410cfcc7759e6f2433f',
    publisher: 'jerry',
  },
  {
    id: 4,
    name: 'English stories',
    url: 'https://i.scdn.co/image/ab67656300005f1fae8ff8070da992ab3ee6f39e',
    publisher: 'Le Mai',
  },
  {
    id: 5,
    name: 'The Balaji storytime',
    url: 'https://i.scdn.co/image/ab67656300005f1f72a4b9f3e4052d86b9cd543c',
    publisher: 'Balaji R 4714',
  },
  {
    id: 6,
    name: 'The Balaji storytime',
    url: 'https://i.scdn.co/image/ab67656300005f1f973a89728038eec4769d3157',
    publisher: 'Balaji R 4714',
  },
  {
    id: 7,
    name: 'History',
    url: 'https://i.scdn.co/image/ab67656300005f1f973a89728038eec4769d3157',
    publisher: 'sam',
  },
  {
    id: 8,
    name: 'Stories for kids',
    url: 'https://i.scdn.co/image/ab67656300005f1ffcceceed9f257ebbe9591bde',
    publisher: 'Kids candle',
  },
  {
    id: 9,
    name: 'Tamil audio books',
    url: 'https://i.scdn.co/image/4166df29f494ffa171d90410cfcc7759e6f2433f',
    publisher: 'jerry',
  },
  {
    id: 10,
    name: 'English stories',
    url: 'https://i.scdn.co/image/ab67656300005f1fae8ff8070da992ab3ee6f39e',
    publisher: 'Le Mai',
  },
  {
    id: 11,
    name: 'The Balaji storytime',
    url: 'https://i.scdn.co/image/ab67656300005f1f72a4b9f3e4052d86b9cd543c',
    publisher: 'Balaji R 4714',
  },
  {
    id: 12,
    name: 'The Balaji storytime',
    url: 'https://i.scdn.co/image/ab67656300005f1f973a89728038eec4769d3157',
    publisher: 'Balaji R 4714',
  },
];
const AuthorsScreen = () => {
  
  const popularStories = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity>
        <Image source={{uri: item.url}} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.publisher}>{item.publisher}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <ScrollView style={tw`flex-1 bg-gray-900`}>
        <Text style={tw`text-2xl font-bold text-white m-4`}>Authors</Text>

        <ScrollView horizontal={true}>
          <>
            <FlatList
              data={popularStoryList}
              renderItem={popularStories}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              contentContainerStyle={styles.container}
            />
          </>
        </ScrollView>
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

export default AuthorsScreen;
