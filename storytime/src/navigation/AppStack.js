/** 
Created: 23.01.2023
Component: App Stack component
Description: If the User is logged in then this component is rendered. This component has the navigation control
(c) Copyright (c) by Nyros. 
**/

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import PopularStoriesScreen from '../screens/home/PopularStoriesScreen';
import PlayerScreen from '../screens/player//PlayerScreen';
import CategoryStoriesScreen from '../screens/categories/CategoryStoriesScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import Search from '../screens/search/Search';
import AuthorStories from '../screens/authors/AuthorStories';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Popular" component={PopularStoriesScreen} />
      <Stack.Screen name="Player" component={PlayerScreen} />
      <Stack.Screen name="CategoryStories" component={CategoryStoriesScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="AuthorStories" component={AuthorStories} />
    </Stack.Navigator>
  );
};

export default AuthStack;
