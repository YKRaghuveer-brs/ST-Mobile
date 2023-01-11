import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
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

const fruitsArr = [
  {name: 'Apple', key: 'F1'},
  {name: 'Orange', key: 'F2'},
  {name: 'Jackfruit', key: 'F3'},
  {name: 'Pomegranate', key: 'F4'},
  {name: 'Grapes', key: 'F5'},
];

const categoriesBg = [ "green", "red", "blue", "magenta",  "violet","coral"]

const CategoriesScreen = ({navigation}) => {
  const {getPopularStories, HttpGet, languages, selectLanguages, selectedLanguages} = useContext(AuthContext);
  console.log(languages);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    setLoading(true);
    const response = await HttpGet('categories');
    const uddatedResponse = response.map((item, index) => {
      return { ...item, background: categoriesBg[index] };
    });
    setCategories(uddatedResponse);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);
  


  const getSelected = () => {
    console.log(selectedLanguages);
  }

  return (
    <View >

    <Text style={{ marginTop: 15, marginLeft: 10, fontSize: 18, fontFamily: 'Roboto-Medium', marginBottom: 10 }}> Languages </Text>
    <View style={{
      flexDirection: "row",
      justifyContent: 'center',
    }}>
      {/* <Button  title='Get Selected' onPress={getSelected}></Button> */}
                    {languages.map((language, index) => {
                      return (
                        <View key={language.id}>
                          {language.isActive ? (
                            <View style={{marginRight: 12, padding: 5}} >
                            <Button
                            color="green"
                            title={language.name}
                            onPress={() => {
                              language.isActive = false;
                              selectLanguages((prevState) =>
                              prevState.filter((item) => {
                                return item.id !== language.id;
                              })
                              );
                            }}
                            >
                            </Button>
                              </View>
                          ) : (
                            <View style={{marginRight: 12, padding: 5}} >
                            <Button
                            color="grey"
                            title={language.name}
                            onPress={() =>
                              selectLanguages((prevState) => {
                                language.isActive = true;
                                return [...prevState, language];
                              })
                            }
                            >
                            </Button>
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
        <ActivityIndicator />
      ) : (
        <View>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 10,
            }}>
            Categories
          </Text>
          <FlatList
            horizontal={false}
            numColumns={2}
            data={categories}
            keyExtractor={item => item.categoryid}
            renderItem={({item, index}) => (
              <View
              style={{
                  width: 180,
                  height: 180,
                  backgroundColor: item.background,
                  marginBottom: 10,
                  marginRight: 10,
                }}>
                   <ImageBackground source={require('../assets/images/spiral-edge.png')} style={{width: 180, height: 180}} resizeMode="cover">
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Category', {item: item})}>
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

const styles = StyleSheet.create({
  container: {
    marginLeft: 60,
    marginTop: 80,
  },
  header: {
    fontWeight: "bold",
    paddingBottom: 15,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 25,
    paddingBottom: 35,
  },
  category: {
    width: "70%",
    marginBottom: 10,
    marginLeft: 50,
  },
  category1: {
    backgroundColor: "yellow"
  },
  category2: {
    backgroundColor: "red"
  },
  category3: {
    backgroundColor: "green"
  },
  category4: {
    backgroundColor: "cyan"
  },
  category5: {
    backgroundColor: "violet"
  },
  category6: {
    backgroundColor: "grey"
  }
});

export default CategoriesScreen;
