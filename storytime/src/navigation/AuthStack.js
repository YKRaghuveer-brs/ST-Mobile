import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen1 from "../screens/user/LoginScreen1";
import RegisterScreen1 from "../screens/user/RegisterScreen1";
import EmailVerification from "../screens/user/EmailVerification";
import ForgotPassword from "../screens/user/ForgotPassword";
import ResetPasswordVerification from "../screens/user/ResetPasswordVerification";
import ResetPasswordScreen from "../screens/user/ResetPasswordScreen";
import ProfileScreen1 from "../screens/user/ProfileScreen1";
import PlayerScreen from "../screens/PlayerScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ hederShown: false }}>
      <Stack.Screen component={OnboardingScreen} name="Onboarding" />
      <Stack.Screen component={LoginScreen1} name="Login" />
      <Stack.Screen component={RegisterScreen1} name="Register" />
      <Stack.Screen component={EmailVerification} name="EmailVerify" />
      <Stack.Screen component={ForgotPassword} name="ForgotPassword" />
      <Stack.Screen component={ResetPasswordVerification} name="ResetPasswordVerify"/>
      <Stack.Screen component={ResetPasswordScreen} name="ResetPassword" />
    </Stack.Navigator>
  );
};

export default AuthStack;
