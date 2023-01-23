/** 
Created: 23.01.2022
Component: Onboarding Screen
Description: Renders the Initial screen when the App is opened
(c) Copyright (c) by Nyros. 
**/

import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OnboardingScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: '#20315',
            paddingTop: 30,
          }}>
          STORY TIME
        </Text>
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{width: 150, height: 150, marginBottom: 50,resizeMode: "contain"}}
          source={require('../assets/images/misc/logo.png')}
        />
      </View>


      <Text style={{fontSize: 20, fontWeight: '600', marginBottom: 10}}>
        Listen to the best stories from all around the world
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{
          backgroundColor: '#443280',
          padding: 20,
          width: '90%',
          borderRadius: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 50,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            color: '#fff',
            fontFamily: 'Roboto-Black',
          }}>
          Start Listening
        </Text>
        <MaterialIcons
          name="arrow-forward-ios"
          size={22}
          color="#ccc"></MaterialIcons>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
