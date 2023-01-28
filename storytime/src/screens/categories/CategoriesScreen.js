/** 
Created: 23.01.2023
Component: Categories screen
Description: Renders the list of categories and the languages filter
(c) Copyright (c) by Nyros. 
**/

import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Button,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import tw from 'twrnc';
import {AuthContext} from '../../context/AuthContext';

const categoriesBg = ['green', 'red', 'blue', 'magenta', 'violet', 'coral'];

const CategoriesScreen = ({navigation}) => {
  const {
    HttpGet,
    languages,
    selectLanguages,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // to get the category list
  const getCategories = async () => {
    setLoading(true);
    const response = await HttpGet('categories');
    const uddatedResponse = response.map((item, index) => {
      return {...item, background: categoriesBg[index]};
    });
    setCategories(uddatedResponse);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={tw`flex-1 bg-[#291F4E]`}>
      <Text
        style={{
          marginTop: 15,
          marginLeft: 10,
          fontSize: 18,
          fontFamily: 'Roboto-Medium',
          marginBottom: 10,
        }}>
        Languages
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        {languages.map((language, index) => {
          return (
            <View key={language.id}>
              {language.isActive ? (
                <View style={{marginRight: 12, padding: 5}}>
                  <Button
                    color="green"
                    title={language.name}
                    onPress={() => {
                      language.isActive = false;
                      selectLanguages(prevState =>
                        prevState.filter(item => {
                          return item.id !== language.id;
                        }),
                      );
                    }}></Button>
                </View>
              ) : (
                <View style={{marginRight: 12, padding: 5}}>
                  <Button
                    color="grey"
                    title={language.name}
                    onPress={() =>
                      selectLanguages(prevState => {
                        language.isActive = true;
                        return [...prevState, language];
                      })
                    }></Button>
                </View>
              )}
            </View>
          );
        })}
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 25,
        }}>
        {loading ? (
          <View
            style={{
              position: 'absolute',
              zIndex: 2,
              left: 0,
              right: 0,
              top: 40,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{width: 100, height: 100}}
              source={require('../../assets/images/Spiral_logo_loader.gif')}
            />
          </View>
        ) : (
          <View style={tw`ml-2`}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Roboto-Medium',
                marginBottom: 10,
                color: '#fff',
              }}>
              Categories
            </Text>
            <FlatList
              horizontal={false}
              numColumns={2}
              data={categories}
              renderItem={({item, index}) => (
                <View
                  style={{
                    width: 180,
                    height: 180,
                    backgroundColor: item.background,
                    marginBottom: 10,
                    marginRight: 10,
                  }}>
                  <ImageBackground
                    source={require('../../assets/images/spiral-edge.png')}
                    style={{width: 180, height: 180}}
                    resizeMode="cover">
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('CategoryStories', {item: item})
                      }>
                      <Text style={{fontSize: 18, color: '#fff', padding: 10}}>
                        {item.category}
                      </Text>
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default CategoriesScreen;
