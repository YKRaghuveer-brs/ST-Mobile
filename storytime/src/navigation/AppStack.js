import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/user/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CustomDrawer from '../screens/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TabNavigator from './TabNavigator';


const Drawer = createDrawerNavigator();

// const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        hederShown: false,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -20,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        component={TabNavigator}
        name="Home"
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={ProfileScreen}
        name="Profile"
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={SettingsScreen}
        name="Settings"
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
