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
import React, {useContext, useState, useEffect} from 'react';
import {truncateText} from '../utils/common';
import {AuthContext} from '../context/AuthContext';
import tw from 'twrnc';

const CategoriesScreen = ({navigation}) => {
  const {getPopularStories, HttpGet} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    setLoading(true);
    const response = await HttpGet('categories');
    console.log("response",response)
    setCategories(response);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
        <View style={tw`flex-1 bg-[#291F4E] pt-12 text-white`}>

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
        <View style={tw`ml-2`}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 10,
              color:"#fff"
            }}>
            Categories
          </Text>
          <FlatList
            horizontal={false}
            numColumns={2}
            data={categories}
           
            renderItem={({item}) => (
              <View
                style={{
                  width: 180,
                  height: 180,
                  backgroundColor: '#CB1C8D',
                  marginBottom: 10,
                  marginRight: 10,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Category', {item: item})}>
                  <Text style={{fontSize: 18, color: '#fff', padding: 10}}>
                    {item.category}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default CategoriesScreen;
