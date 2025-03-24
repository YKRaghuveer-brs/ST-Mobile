// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ImageBackground,
//   ScrollView,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import tw from 'twrnc';

// import LoadingSpinner from '../components/LoadingSpinner';
// import {useGetCategoriesQuery} from '../store/category/categoryApiSlice';
// import {useGetLanguagesQuery} from '../store/language/languageApiSlice';

// const CategoriesScreen = () => {
//   const {data: categoriesData, isLoading, error} = useGetCategoriesQuery();
//   const {
//     data: languages,
//     isLoading: isLanguagesLoading,
//     error: languagesError,
//   } = useGetLanguagesQuery();

//   return (
//     <>
//       <ScrollView style={tw`flex-1 bg-gray-900`}>
//         <Text style={tw`text-2xl font-bold text-white m-4`}>Languages</Text>
//         {isLanguagesLoading ? (
//           <LoadingSpinner />
//         ) : languagesError ? (
//           <Text style={tw`text-white m-4`}>Unable to load languages. Please try again later</Text>
//         ) : (
//           <View style={tw`flex-row p-2`}>
//             {languages &&
//               languages.map(language => (
//                 <TouchableOpacity
//                   key={language._id}
//                   style={[
//                     tw`flex-1 p-4 m-1 rounded-lg items-center`,
//                     language.active ? tw`bg-green-700` : tw`bg-purple-700`,
//                   ]}>
//                   <Text style={tw`text-white text-center text-lg`}>
//                     {language.name}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//           </View>
//         )}

//         <Text style={tw`text-2xl font-bold text-white m-4`}>Categories</Text>

//         {isLoading ? (
//           <LoadingSpinner />
//         ) : (
//           <View style={tw`flex-row flex-wrap justify-between p-1 mb-25`}>
//             {categoriesData.map((category, index) => (
//               <TouchableOpacity
//                 key={category._id}
//                 style={[tw`w-[48%] h-46 m-1 rounded-lg overflow-hidden`]}>
//                 <ImageBackground
//                   source={require('../assets/images/spiral-edge.png')}
//                   style={[
//                     tw`flex-1 justify-end p-2`,
//                     styles[`bg_${index + 1}`],
//                   ]}
//                   imageStyle={{borderRadius: 8}}>
//                   <Text
//                     style={[
//                       tw`text-lg font-bold leading-tight px-3 pb-3 text-white`,
//                     ]}>
//                     {category.category}
//                   </Text>
//                 </ImageBackground>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}
//       </ScrollView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   bg_1: {
//     backgroundColor: '#2FAA96',
//   },
//   bg_2: {
//     backgroundColor: '#67C8FF',
//   },
//   bg_3: {
//     backgroundColor: '#FF704D',
//   },
//   bg_4: {
//     backgroundColor: '#FFC259',
//   },
//   bg_5: {
//     backgroundColor: '#000080',
//   },
//   bg_6: {
//     backgroundColor: '#FF1493',
//   },
// });

// export default CategoriesScreen;
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetCategoriesQuery } from '../store/category/categoryApiSlice';
import { useGetLanguagesQuery } from '../store/language/languageApiSlice';
import { useGetUserProfileAPIQuery, useUpdateLanguageAPIMutation } from '../store/user/userApiSlice';
import { logout, setUserProfile, toggleLanguageSelection } from '../store/user/authSlice';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';

const CategoriesScreen = () => {
  console.log('🔄 CategoriesScreen mounted'); // Logs on component mount

  // Fetching user profile data
  const { data: userProfile, isLoading: isUserLoading, error: userProfileError, refetch: refetchUserInfo } = useGetUserProfileAPIQuery();
  
  console.log('User Profile Data:', userProfile); // Log the fetched user profile data
  console.log('User Profile Error:', userProfileError); // Log any errors
  const { data: categoriesData, isLoading: isCategoriesLoading, error: categoriesError } = useGetCategoriesQuery();
  const { data: languagesData, isLoading: isLanguagesLoading, error: languagesError } = useGetLanguagesQuery();

  const [updateLanguageAPI] = useUpdateLanguageAPIMutation();
  const { userData } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth); // Get the token from Redux state
  console.log('Token in Redux State:', token); // Log the token
  const [selectedLanguages, setSelectedLanguages] = useState(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    // console.log('userData:', userData);
  }, [userData]);

  useEffect(() => {
    if (!isUserLoading && userProfile) {
      console.log('✅ User data fetched:', userProfile);
      dispatch(setUserProfile({ profileData: userProfile })); // Ensure payload is correct
    } else if (userProfileError) {
      // console.error('❌ Error fetching user profile:', userProfileError);
    }
  }, [isUserLoading, userProfile, userProfileError, dispatch]);
  
  useEffect(() => {
    // console.log('userData:', userData); // Log userData whenever it changes
  }, [userData]);

  useEffect(() => {
    const updateLanguages = async () => {
      try {
        if (userData?.languages) {
          console.log('📤 Updating languages:', userData.languages);
          await updateLanguageAPI({ languageIds: userData.languages }).unwrap();
          console.log('✅ Languages updated successfully');
        }
      } catch (error) {
        console.log('❌ Error updating languages:', error);
        Alert.alert('Error', error?.data?.message || 'An error occurred');
      }
    };
    updateLanguages();
  }, [userData?.languages, updateLanguageAPI]);

  const isLanguageSelected = (languageId) => {
    const isSelected = userData?.languages?.includes(languageId) || false;
    console.log(`🔎 Language ID ${languageId} selected: ${isSelected}`);
    return isSelected;
  };
  const handleLanguageClick = (languageId) => {
    if (!userData) {
      console.error('Cannot toggle language selection: userData is null');
      Alert.alert('Error', 'User data is not available. Please try again later.');
      return;
    }
    console.log(`🖱️ Language clicked: ${languageId}`);
    dispatch(toggleLanguageSelection(languageId));
  };
  
  const categoryHandler = (categoryName) => {
    console.log(`➡️ Navigating to category: ${categoryName}`);
    navigation.navigate('App', {
      screen: 'CategoryStories',
      params: { categoryName, selectedLanguages },
    });
  };

  useEffect(() => {
    if (languagesData && userData?.languages) {
      const selectedLanguagesNames = languagesData
        .filter((language) => userData.languages.includes(language._id))
        .map((item) => item.name)
        .join(', ');

      console.log('✅ Selected languages:', selectedLanguagesNames);
      setSelectedLanguages(selectedLanguagesNames);
    }
  }, [languagesData, userData?.languages]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionContainer}>
        {/* Languages Section */}
        {/* <Text style={styles.heading}>Languages</Text>
        {isLanguagesLoading ? (
          <ActivityIndicator size="large" color="#443280" />
        ) : languagesError ? (
          <Text>Unable to load languages. Please try again later.</Text>
        ) : languagesData ? (
          <View style={styles.languageContainer}>
            {languagesData.map((language) => (
              <TouchableOpacity
              key={language._id}
              style={[
                styles.languageButton,
                isLanguageSelected(language._id) && styles.languageSelected,
              ]}
              onPress={() => handleLanguageClick(language._id)}
              disabled={!userData} // Disable button if userData is null
            >
              <Text style={styles.languageText}>{language.name}</Text>
            </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text>No languages available.</Text>
        )} */}

        {/* Categories Section */}
        <Text style={styles.heading}>Categories</Text>
        {isCategoriesLoading ? (
          <ActivityIndicator size="large" color="#443280" />
        ) : categoriesError ? (
          <Text>Unable to load categories. Please try again later.</Text>
        ) : categoriesData ? (
          <View style={styles.categoriesContainer}>
            {categoriesData.map((category) => (
              <TouchableOpacity
                key={category._id}
                style={styles.categoryButton}
                onPress={() => categoryHandler(category.category)}
              >
                <Text style={styles.categoryText}>{category.category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text>No categories available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#443280' },
  sectionContainer: { padding: 20 },
  heading: { fontSize: 24, color: 'white', marginBottom: 10, fontWeight: 'bold' },
  languageContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  languageButton: {
    padding: 10,
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
  languageSelected: { backgroundColor: 'white' },
  languageText: { color: 'white' },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  categoryText: { color: '#443280', fontSize: 18 },
});

export default CategoriesScreen;