/** 
Created: 23.01.2023
Component: App Stack component
Description: If the User is not logged in then this component is rendered.
(c) Copyright (c) by Nyros. 
**/

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/user/LoginScreen";
import RegisterScreen from "../screens/user/RegisterScreen";
import EmailVerification from "../screens/user/EmailVerification";
import ForgotPassword from "../screens/user/ForgotPassword";
import ResetPasswordVerification from "../screens/user/ResetPasswordVerification";
import ResetPasswordScreen from "../screens/user/ResetPasswordScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ hederShown: false }}>
      <Stack.Screen options={{headerShown: false}} component={OnboardingScreen} name="Onboarding" />
      <Stack.Screen component={LoginScreen} name="Login" />
      <Stack.Screen component={RegisterScreen} name="Register" />
      <Stack.Screen component={EmailVerification} name="EmailVerify" />
      <Stack.Screen component={ForgotPassword} name="ForgotPassword" />
      <Stack.Screen component={ResetPasswordVerification} name="ResetPasswordVerify"/>
      <Stack.Screen component={ResetPasswordScreen} name="ResetPassword" />
    </Stack.Navigator>
  );
};

export default AuthStack;
