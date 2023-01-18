import React, {useContext, useState, useEffect} from 'react';
import {
  Image
} from 'react-native';
import {AuthProvider} from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import SplashScreen from "react-native-splash-screen"; //import SplashScreen



const App = () => {

  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  
  return (
    <AuthProvider>
     
      <AppNav />
    </AuthProvider>
  );
};

export default App;
