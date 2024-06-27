import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import AuthorsScreen from '../../screens/AuthorsScreen';
import CategoriesScreen from '../../screens/CategoriesScreen';
import LibraryScreen from '../../screens/LibraryScreen';
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#443280', 
          height: 90, 
          borderTopLeftRadius: 20, 
          borderTopRightRadius: 20, 
          display: 'flex', 
          alignItems: 'center',
          overflow: 'hidden',
          position: 'absolute',
          paddingTop: 20,
          paddingBottom: 20,
          zIndex: 9999,
          border: 0
        },
        tabBarInactiveTintColor: "rgba(255,255,255,0.6)",
        tabBarActiveTintColor: "#fff",
      }}
    >
      <Tab.Screen // Home Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          unmountOnBlur: true,

          tabBarLabel: "Explore",
          tabBarIcon: ({ focused }) => {
            const image = focused
              ? require("../../assets/images/storytime.png")
              : require("../../assets/images/storytime.png");
            return (
              <Image source={image} style={{ height: 23, width: 23, resizeMode: "contain" }} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Categories" //Categories Screen
        component={CategoriesScreen}
        options={{
          unmountOnBlur: true,

          tabBarLabel: "Categories",
          tabBarIcon: ({ focused }) => {
            const image = focused
              ? require("../../assets/images/category.png")
              : require("../../assets/images/category.png");
            return <Image source={image} style={{ height: 23, width: 23 }} />;
          },
        }}
      />
      <Tab.Screen
        name="Authors" //Authors Screen
        component={AuthorsScreen}
        options={{
          unmountOnBlur: true,
          tabBarLabel: "Authors",
          tabBarIcon: ({ focused }) => {
            const image = focused
              ? require("../../assets/images/Author.png")
              : require("../../assets/images/Author.png");
            return <Image source={image} style={{ height: 23, width: 23 }} />;
          },
        }}
      />

      <Tab.Screen
        name="Library" // Library Screen
        component={LibraryScreen}
        options={{
          unmountOnBlur: true,
          tabBarLabel: "Library",
          tabBarIcon: ({ focused }) => {
            const image = focused
              ? require("../../assets/images/Library.png")
              : require("../../assets/images/Library.png");
            return <Image source={image} style={{ height: 23, width: 23 }} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
