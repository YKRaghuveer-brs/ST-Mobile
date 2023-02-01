/** 
Created: 23.01.2022
Component: Context provider
Description: It provides the app context and HTTP methods
(c) Copyright (c) by Nyros. 
**/

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect, useCallback} from 'react';
import {Toast} from 'toastify-react-native';
import { HttpGet, HttpPost, refreshTokenHandler } from './httpHelpers';
import { calculateRemainingExpirationTime } from '../utils/common';

let logoutTimer;
let spotifyLogoutTimer;

// List of allowed languages
const languagesList = [
  {
    id: 'l1',
    name: 'Hindi',
    languageCode: 'hi',
    isActive: false,
    bg: 'bg-purple',
  },
  {
    id: 'l2',
    name: 'Tamil',
    languageCode: 'ta',
    isActive: false,
    bg: 'bg-lime-400',
  },
  {
    id: 'l3',
    name: 'Telugu',
    languageCode: 'te',
    isActive: false,
    bg: 'bg-darkBlue',
  },
  {
    id: 'l4',
    name: 'English',
    languageCode: 'en en-US en-AU en-GB',
    isActive: false,
    bg: 'bg-purple',
  },
];

export const AuthContext = createContext();

// context provider
export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [selectedLang, setSelectedLang] = useState([]);
  const [allowedLangages, setAllowedLanguages] = useState([]);
  const [user, setUser] = useState([]);

  const [tracks, setTracks] = useState([]);
  const [stickyPlayer, setStickyPlayer] = useState(false);
  const [story, setStory] = useState({});

  const login = async (email, password) => {
    const payload = {
      email,
      password,
    };

    try {
      const response = await HttpPost('login', payload);
      if (response.status === 200) {
        Toast.success('Logged in successfully !');
        setUserToken(response.data.token);

        const expirationTime = new Date(
          new Date().getTime() + response.data.usertokenExp * 1000,
        );
        const spotifyExpirationTime = new Date(
          new Date().getTime() + response.data.spotifytoken.expires_in * 1000,
        );

        AsyncStorage.setItem('userToken', response.data.token);
        AsyncStorage.setItem('userExpTime', expirationTime.toISOString());

        const remainingTime = calculateRemainingExpirationTime(expirationTime);

        logoutTimer = setTimeout(logout, remainingTime);

        const remainingSpotifyTime = calculateRemainingExpirationTime(
          spotifyExpirationTime,
        );
        spotifyLogoutTimer = setInterval(
          refreshTokenHandler,
          remainingSpotifyTime,
        );

        AsyncStorage.setItem(
          'spotifyToken',
          response.data.spotifytoken.access_token,
        );
        AsyncStorage.setItem(
          'spotifytokenExp',
          spotifyExpirationTime.toISOString(),
        );

        AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
      }
    } catch (error) {
      Toast.error(error.response.data);
    }
  };

  const logout = () => {
    setStickyPlayer(false);
    setSelectedLang([]);
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userExpTime');
    setIsLoading(false);
    setAllowedLanguages([]);
  };

  // To update the Exp time when App is closed and opened
  useEffect(() => {
    async function updateTokenExpirationTime() {
      if (userToken) {
        const newList = JSON.parse(JSON.stringify(languagesList));
        setAllowedLanguages(newList);

        const storedExpirationDate = await AsyncStorage.getItem('userExpTime');
        const remainingTime =
          calculateRemainingExpirationTime(storedExpirationDate);

        if (remainingTime <= 60000) {
          //less than or equal to 1 min (60000 seconds)
          logout();
        }

        const storedSpotifyExpirationDate = await AsyncStorage.getItem(
          'spotifytokenExp',
        );
        const remainingSpotifyTime = calculateRemainingExpirationTime(
          storedSpotifyExpirationDate,
        );

        if (remainingSpotifyTime <= 60000) {
          //less than or equal to 1 min (60000 seconds)
          await refreshTokenHandler();
        }
      }
    }
    updateTokenExpirationTime();
  }, [userToken]);

  // Checks user is logged in or not when app is closed and opened
  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');

      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserToken(userToken);
      
      }
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const getUserDetails = useCallback(async () => {
    const user = await HttpGet('userDetails');
    setUser(user);
  });

  useEffect(() => {
    if (userToken) {
      getUserDetails();
    }
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        selectedLanguages: selectedLang,
        selectLanguages: setSelectedLang,
        languages: allowedLangages,
        isLoading,
        userToken,
        user,
        minPlayerTracks: tracks,
        setTracks,
        minPlayerStory: story,
        setStory,
        stickyPlayer,
        setStickyPlayer,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
