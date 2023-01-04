import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AuthorsScreen from './AuthorsScreen';
import CategoriesScreen from './CategoriesScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import GameDetailsScreen from '../screens/GameDetailsScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import LibraryScreen from './LibraryScreen';
import PopularStoriesScreen from '../screens/PopularStoriesScreen';
import CategoryScreen from '../screens/CategoryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={GameDetailsScreen}
        name="GameDetails"
        options={({route}) => ({
          title: route.params?.title,
        })}
      />
      <Stack.Screen
        component={PopularStoriesScreen}
        name="Popular"
        // options={({route}) => ({
        //   title: route.params?.title,
        // })}
      />
      <Stack.Screen
        component={CategoryScreen}
        name="Category"
        options={({route}) => ({
          item: route.params?.item,
        })}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {backgroundColor: '#AD40AF'},
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: '#fff',
      }}>
      <Tab.Screen
        name="Home2"
        component={HomeStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#AD40AF',
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="layers-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Authors"
        component={AuthorsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#AD40AF',
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons name="library-outline" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = route => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  // console.log(routeName);
  if (routeName === 'GameDetails') {
    return 'none';
  } else {
    return 'flex';
  }
};

export default TabNavigator;
