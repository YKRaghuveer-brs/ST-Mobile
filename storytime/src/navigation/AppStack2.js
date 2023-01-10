import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen1 from "../screens/LoginScreen1";
import RegisterScreen1 from "../screens/RegisterScreen1";
import EmailVerification from "../screens/EmailVerification";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPasswordVerification from "../screens/ResetPasswordVerification";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import ProfileScreen1 from "../screens/ProfileScreen1";
import PlayerScreen from "../screens/PlayerScreen";
import TabNavigator from './TabNavigator';
import HomeScreen from '../screens/HomeScreen';
import PopularStoriesScreen from '../screens/PopularStoriesScreen';
import CategoryScreen from '../screens/CategoryScreen';




const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={TabNavigator} />
              <Stack.Screen name="Popular" component={PopularStoriesScreen} />
              <Stack.Screen name="Player" component={PlayerScreen} />
                                                                                <Stack.Screen name="Category" component={CategoryScreen} />

    </Stack.Navigator>
  );
};

export default AuthStack;
