
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

// const popularStoryList = [
//   {
//     id: 1,
//     name: 'History',
//     url: 'https://i.scdn.co/image/ab67656300005f1f973a89728038eec4769d3157',
//     publisher: 'sam',
//   },
//   {
//     id: 2,
//     name: 'Stories for kids',
//     url: 'https://i.scdn.co/image/ab67656300005f1ffcceceed9f257ebbe9591bde',
//     publisher: 'Kids candle',
//   },
//   {
//     id: 3,
//     name: 'Tamil audio books',
//     url: 'https://i.scdn.co/image/4166df29f494ffa171d90410cfcc7759e6f2433f',
//     publisher: 'jerry',
//   },
//   {
//     id: 4,
//     name: 'English stories',
//     url: 'https://i.scdn.co/image/ab67656300005f1fae8ff8070da992ab3ee6f39e',
//     publisher: 'Le Mai',
//   },
//   {
//     id: 5,
//     name: 'The Balaji storytime',
//     url: 'https://i.scdn.co/image/ab67656300005f1f72a4b9f3e4052d86b9cd543c',
//     publisher: 'Balaji R 4714',
//   },
//   {
//     id: 6,
//     name: 'The Balaji storytime',
//     url: 'https://i.scdn.co/image/ab67656300005f1f973a89728038eec4769d3157',
//     publisher: 'Balaji R 4714',
//   },
//   {
//     id: 7,
//     name: 'History',
//     url: 'https://i.scdn.co/image/ab67656300005f1f973a89728038eec4769d3157',
//     publisher: 'sam',
//   },
//   {
//     id: 8,
//     name: 'Stories for kids',
//     url: 'https://i.scdn.co/image/ab67656300005f1ffcceceed9f257ebbe9591bde',
//     publisher: 'Kids candle',
//   },
//   {
//     id: 9,
//     name: 'Tamil audio books',
//     url: 'https://i.scdn.co/image/4166df29f494ffa171d90410cfcc7759e6f2433f',
//     publisher: 'jerry',
//   },
//   {
//     id: 10,
//     name: 'English stories',
//     url: 'https://i.scdn.co/image/ab67656300005f1fae8ff8070da992ab3ee6f39e',
//     publisher: 'Le Mai',
//   },
//   {
//     id: 11,
//     name: 'The Balaji storytime',
//     url: 'https://i.scdn.co/image/ab67656300005f1f72a4b9f3e4052d86b9cd543c',
//     publisher: 'Balaji R 4714',
//   },
//   {
//     id: 12,
//     name: 'The Balaji storytime',
//     url: 'https://i.scdn.co/image/ab67656300005f1f973a89728038eec4769d3157',
//     publisher: 'Balaji R 4714',
//   },
// ];
// const AuthorsScreen = () => {
  
//   const popularStories = ({item}) => (
//     <View style={styles.itemContainer}>
//       <TouchableOpacity>
//         <Image source={{uri: item.url}} style={styles.image} />
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.publisher}>{item.publisher}</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <>
//       <ScrollView style={tw`flex-1 bg-gray-900`}>
//         <Text style={tw`text-2xl font-bold text-white m-4`}>Authors</Text>

//         <ScrollView horizontal={true}>
//           <>
//             <FlatList
//               data={popularStoryList}
//               renderItem={popularStories}
//               keyExtractor={item => item.id.toString()}
//               numColumns={2}
//               contentContainerStyle={styles.container}
//             />
//           </>
//         </ScrollView>
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

// export default AuthorsScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';

import AuthorsList from '../components/authors/AuthorsList';
import LoadingSpinner from '../components/LoadingSpinner';
import { useGetPopularShowsQuery } from '../store/spotify/spotifyApiSlice';
import { useGetLanguagesQuery } from '../store/language/languageApiSlice';
import { useGetUserProfileAPIQuery } from '../store/user/userApiSlice';
import { logout } from '../store/user/authSlice';

const AuthorsPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [authorsList, setAuthorsList] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [search, setSearch] = useState('popular stories top stories Comedy and Light-Hearted Tales kids stories motivation stories  Language:');

  const { userData } = useSelector((state) => state.auth);
  const { data: languagesData, isLoading: languageLoading } = useGetLanguagesQuery();
  const { data: userProfileData, isLoading: isUserProfileLoading, refetch: refetchUserInfo } = useGetUserProfileAPIQuery();

  const { data: authorsInfo, isLoading: authorsLoading, refetch: refetchAuthors } = useGetPopularShowsQuery({
    queryParams: {
      q: search + selectedLanguages,
      type: 'show',
      include_external: 'audio',
      market: 'IN',
      limit: '50',
    },
  });

  // Refetch user info on mount
  useEffect(() => {
    refetchUserInfo();
  }, [refetchUserInfo]);

  // Handle user suspension
  useEffect(() => {
    if (!isUserProfileLoading && userProfileData) {
      if (userProfileData.profileData?.isSuspended) {
        dispatch(logout());
        Toast.show({
          // type: 'error',
          text1: 'Your Account has been Suspended!',
        });
        navigation.navigate('Login'); // Redirect to login page
      }
    }
  }, [isUserProfileLoading, userProfileData, dispatch, navigation]);

  // Update selected languages
  useEffect(() => {
    if (languagesData && !languageLoading && userData?.languages) {
      const selectedLanguagesNames = languagesData
        .filter((language) => userData.languages.includes(language._id))
        .map((language) => language.name)
        .join(' ');
      setSelectedLanguages(selectedLanguagesNames);
    }
  }, [languagesData, languageLoading, userData?.languages]);

  // Handle search
  const handleSearch = (values) => {
    if (values.searchText.trim()) {
      setSearch(`${values.searchText} language: 'Telugu' 'English' 'Hindi' 'Tamil'`);
    } else {
      setSearch('"popular stories" "top stories" "Comedy and Light-Hearted Tales" "kids stories" "motivation stories"  Language:' + selectedLanguages);
    }
  };

  // Update authors list
  useEffect(() => {
    if (!authorsLoading && authorsInfo) {
      try {
        setAuthorsList(authorsInfo.shows.items);
      } catch (error) {
        // console.log(error);
        setAuthorsList([]);
      }
    }
  }, [authorsLoading, authorsInfo]);

  // Refetch authors when search changes
  useEffect(() => {
    refetchAuthors();
  }, [search, refetchAuthors]);

  return (
    <ScrollView style={styles.container}>
      {/* Search Form */}
      <View style={styles.searchContainer}>
        <Formik initialValues={{ searchText: '' }} onSubmit={handleSearch}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="#999"
                onChangeText={handleChange('searchText')}
                onBlur={handleBlur('searchText')}
                value={values.searchText}
              />
              <TouchableOpacity style={styles.searchButton} onPress={handleSubmit}>
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>

      {/* Loading Spinner */}
      {authorsLoading && <LoadingSpinner />}

      {/* Authors List */}
      {!authorsLoading && (
        <View>
          {authorsList.length === 0 && !authorsInfo ? (
            <Text style={styles.errorText}>Authors not found. Please try again later!</Text>
          ) : (
            <AuthorsList authors={authorsList} />
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  searchContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#FFFFFF',
    backgroundColor: '#1E1E1E',
  },
  searchButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#703fce',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorText: {
    color: 'orange',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AuthorsPage;