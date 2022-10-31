import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LaunchScreen from "./src/screens/LaunchScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";


const AppNavigator = createStackNavigator(
{
  LaunchScreen: LaunchScreen,
  Home:HomeScreen,
  Login: LoginScreen,
  Register: RegisterScreen,
},
// {
//   defaultNavigationOptions: {
//   headerStyle: {
//     backgroundColor: "#006600",
//   },
//   headerTintColor: "#FFF",
//   },
// }
 // {headerMode: 'none'}
  {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        initialRouteName: 'LaunchScreen'
    }
);

const Navigator = createAppContainer(AppNavigator);

export default function App() {
return (
  <Navigator>
  </Navigator>
);
}
