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



const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{hederShown: false}}>
      <Stack.Screen component={OnboardingScreen} name="Onboarding" />
      <Stack.Screen component={LoginScreen1} name="Login" />
      <Stack.Screen component={RegisterScreen1} name="Register" />

                <Stack.Screen name="EmailVerify" component={EmailVerification} />
                       <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
       <Stack.Screen name="ResetPasswordVerify" component={ResetPasswordVerification} />
               <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

    </Stack.Navigator>
  );
};

export default AuthStack;
