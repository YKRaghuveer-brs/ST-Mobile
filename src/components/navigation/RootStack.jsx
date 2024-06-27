import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import TabNavigator from './TabNavigator';
import StickyPlayer from '../player/StickyPlayer';
import {View, StyleSheet} from 'react-native';
import tw from 'twrnc';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const RootStack = ({isLoggedIn}) => {
  const {stickyPlayerOpen} = useSelector(state => state.auth);
  return (
    <View style={styles.container}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
      {stickyPlayerOpen && <StickyPlayer />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Ensure the container has a relative position
  },
  stickyPlayer: {
    position: 'absolute',
    bottom: 50, // Adjust this value as needed
    left: 0,
    right: 0,
    zIndex: 1000, // Adjust the zIndex as needed
  },
});

export default RootStack;
