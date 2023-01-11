import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import PlayerScreen from "../screens/PlayerScreen";
import PopularStoriesScreen from "../screens/PopularStoriesScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ProfileScreen1 from "../screens/ProfileScreen1";
import Search from "../screens/Search";
import AuthorStories from "../screens/AuthorStories";




const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Popular" component={PopularStoriesScreen} />
      <Stack.Screen name="Player" component={PlayerScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen1} />
                        <Stack.Screen name="Search" component={Search} />
                                                <Stack.Screen name="AuthorStories" component={AuthorStories} />



    </Stack.Navigator>
  );
};

export default AuthStack;
