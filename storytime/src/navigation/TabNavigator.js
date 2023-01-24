/** 
Created: 23.01.2023
Component: Tab Navigator
Description: Renders the bottom navigator
(c) Copyright (c) by Nyros. 
**/

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import AuthorsScreen from './AuthorsScreen';
import CategoriesScreen from './CategoriesScreen';
import LibraryScreen from './LibraryScreen';
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
              ? require('../../assets/Images/storytime.png')
              : require('../../assets/Images/storytime.png');
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
              ? require('../../assets/Images/category.png')
              : require('../../assets/Images/category.png');
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
              ? require('../../assets/Images/Author1.png')
              : require('../../assets/Images/Author1.png');
            return <Image source={image} style={{height: 23, width: 23}} />;
          },
        }}
      />

      <Tab.Screen
        name="Library" // Library Screen
        component={LibraryScreen}
        // listeners={{
        //   tabPress: (e) => {
        //     e.preventDefault();
        //     console.log("tabPress tabTwo");
        //   },
        // }}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({focused}) => {
            const image = focused
              ? require('../../assets/Images/Library1.png')
              : require('../../assets/Images/Library1.png');
            return <Image source={image} style={{height: 23, width: 23}} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
