import React, {useContext} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddGifImage  from '../components/AddGifImage';


import AuthStack from './AuthStack';

import AppStack2 from './AppStack2';
import {AuthContext} from '../context/AuthContext';
const Stack = createNativeStackNavigator();
const AppNav = () => {
  const {isLoading, userToken} = useContext(AuthContext);

  // console.log("userToken",userToken)

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack2 /> : <AuthStack />}
    {/*<AppStack2 />*/}
    </NavigationContainer>
  );
};

export default AppNav;
