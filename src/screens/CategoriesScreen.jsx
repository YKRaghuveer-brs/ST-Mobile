import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import tw from 'twrnc';

import LoadingSpinner from '../components/LoadingSpinner';
import {useGetCategoriesQuery} from '../store/category/categoryApiSlice';
import {useGetLanguagesQuery} from '../store/language/languageApiSlice';

const CategoriesScreen = () => {
  const {data: categoriesData, isLoading, error} = useGetCategoriesQuery();
  const {
    data: languages,
    isLoading: isLanguagesLoading,
    error: languagesError,
  } = useGetLanguagesQuery();

  return (
    <>
      <ScrollView style={tw`flex-1 bg-gray-900`}>
        <Text style={tw`text-2xl font-bold text-white m-4`}>Languages</Text>
        {isLanguagesLoading ? (
          <LoadingSpinner />
        ) : languagesError ? (
          <Text style={tw`text-white m-4`}>Unable to load languages. Please try again later</Text>
        ) : (
          <View style={tw`flex-row p-2`}>
            {languages &&
              languages.map(language => (
                <TouchableOpacity
                  key={language._id}
                  style={[
                    tw`flex-1 p-4 m-1 rounded-lg items-center`,
                    language.active ? tw`bg-green-700` : tw`bg-purple-700`,
                  ]}>
                  <Text style={tw`text-white text-center text-lg`}>
                    {language.name}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        )}

        <Text style={tw`text-2xl font-bold text-white m-4`}>Categories</Text>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <View style={tw`flex-row flex-wrap justify-between p-1 mb-25`}>
            {categoriesData.map((category, index) => (
              <TouchableOpacity
                key={category._id}
                style={[tw`w-[48%] h-46 m-1 rounded-lg overflow-hidden`]}>
                <ImageBackground
                  source={require('../assets/images/spiral-edge.png')}
                  style={[
                    tw`flex-1 justify-end p-2`,
                    styles[`bg_${index + 1}`],
                  ]}
                  imageStyle={{borderRadius: 8}}>
                  <Text
                    style={[
                      tw`text-lg font-bold leading-tight px-3 pb-3 text-white`,
                    ]}>
                    {category.category}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  bg_1: {
    backgroundColor: '#2FAA96',
  },
  bg_2: {
    backgroundColor: '#67C8FF',
  },
  bg_3: {
    backgroundColor: '#FF704D',
  },
  bg_4: {
    backgroundColor: '#FFC259',
  },
  bg_5: {
    backgroundColor: '#000080',
  },
  bg_6: {
    backgroundColor: '#FF1493',
  },
});

export default CategoriesScreen;
