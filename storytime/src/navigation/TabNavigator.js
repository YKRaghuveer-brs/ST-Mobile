/** 
Created: 23.01.2023
Component: Tab Navigator
Description: Renders the bottom navigator
(c) Copyright (c) by Nyros. 
**/

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import AuthorsScreen from '../screens/authors/AuthorsScreen';
import CategoriesScreen from '../screens/categories/CategoriesScreen';
import LibraryScreen from '../screens/library/LibraryScreen';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#2A0D62'},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: '#fff',
      }}>
      <Tab.Screen // Home Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({focused}) => {
            const image = focused
              ? require('../assets/images/storytime.png')
              : require('../assets/images/storytime.png');
            return (
              <Image
                source={image}
                style={{height: 23, width: 23, resizeMode: 'contain'}}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Categories" //Categories Screen
        component={CategoriesScreen}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({focused}) => {
            const image = focused
              ? require('../assets/images/category.png')
              : require('../assets/images/category.png');
            return <Image source={image} style={{height: 23, width: 23}} />;
          },
        }}
      />
      <Tab.Screen
        name="Authors" //Authors Screen
        component={AuthorsScreen}
        options={{
          tabBarLabel: 'Authors',
          tabBarIcon: ({focused}) => {
            const image = focused
              ? require('../assets/images/Author1.png')
              : require('../assets/images/Author1.png');
            return <Image source={image} style={{height: 23, width: 23}} />;
          },
        }}
      />

      <Tab.Screen
        name="Library" // Library Screen
        component={LibraryScreen}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({focused}) => {
            const image = focused
              ? require('../assets/images/Library1.png')
              : require('../assets/images/Library1.png');
            return <Image source={image} style={{height: 23, width: 23}} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
