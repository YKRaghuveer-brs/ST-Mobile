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

const fruitsArr = [
  {name: 'Apple', key: 'F1'},
  {name: 'Orange', key: 'F2'},
  {name: 'Jackfruit', key: 'F3'},
  {name: 'Pomegranate', key: 'F4'},
  {name: 'Grapes', key: 'F5'},
];

const CategoriesScreen = ({navigation}) => {
  const {getPopularStories, HttpGet} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    setLoading(true);
    const response = await HttpGet('categories');
    setCategories(response);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View
      style={{
        flex: 1,
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
