import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import AuthorsScreen from "./AuthorsScreen";
import CategoriesScreen from "./CategoriesScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import LibraryScreen from "./LibraryScreen";
import PopularStoriesScreen from "../screens/home/PopularStoriesScreen";
import PlayerScreen from "../screens/PlayerScreen";
import { Image } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    // <Tab.Navigator
    //   screenOptions={{
    //     tabBarShowLabel: false,
    //     headerShown: false,
    //     tabBarStyle: {backgroundColor: '#AD40AF'},
    //     tabBarInactiveTintColor: 'black',
    //     tabBarActiveTintColor: '#fff',
    //   }}>
    //   <Tab.Screen
    //     name="Home2"
    //     component={HomeStack}
    //     options={({route}) => ({
    //       tabBarStyle: {
    //         display: getTabBarVisibility(route),
    //         backgroundColor: '#AD40AF',
    //       },
    //       tabBarIcon: ({color, size}) => (
    //         <Ionicons name="home-outline" color={color} size={size} />
    //       ),
    //     })}
    //   />
    //   <Tab.Screen
    //     name="Categories"
    //     component={CategoriesScreen}
    //     options={{
    //       tabBarIcon: ({color, size}) => (
    //         <Ionicons name="layers-outline" color={color} size={size} />
    //       ),
    //     }}
    //   />

    //   <Tab.Screen
    //     name="Authors"
    //     component={AuthorsScreen}
    //     options={{
    //       tabBarIcon: ({color, size}) => (
    //         <Ionicons name="person-outline" color={color} size={size} />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Library"
    //     component={LibraryScreen}
    //     options={({route}) => ({
    //       tabBarStyle: {
    //         display: getTabBarVisibility(route),
    //         backgroundColor: '#AD40AF',
    //       },
    //       tabBarIcon: ({color, size}) => (
    //         <Ionicons name="library-outline" color={color} size={size} />
    //       ),
    //     })}
    //   />
    // </Tab.Navigator>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#2A0D62" },
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ focused }) => {
            const image = focused
              ? require("../../assets/Images/storytime.png")
              : require("../../assets/Images/storytime.png");
            return (
              <Image
                source={image}
                style={{ height: 23, width: 23, resizeMode: "contain" }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarLabel: "Categories",
          tabBarIcon: ({ focused }) => {
            const image = focused
              ? require("../../assets/Images/category.png")
              : require("../../assets/Images/category.png");
            return <Image source={image} style={{ height: 23, width: 23 }} />;
          },
        }}
      />
      <Tab.Screen
        name="Authors"
        component={AuthorsScreen}
        options={{
          tabBarLabel: "Authors",
          tabBarIcon: ({ focused }) => {
            const image = focused
              ? require("../../assets/Images/Author1.png")
              : require("../../assets/Images/Author1.png");
            return <Image source={image} style={{ height: 23, width: 23 }} />;
          },
        }}
      />

      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: "Library",
          tabBarIcon: ({ focused }) => {
            const image = focused
              ? require("../../assets/Images/Library1.png")
              : require("../../assets/Images/Library1.png");
            return <Image source={image} style={{ height: 23, width: 23 }} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = (route) => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  // console.log(routeName);
  if (routeName === "GameDetails") {
    return "none";
  } else {
    return "flex";
  }
};

export default TabNavigator;
