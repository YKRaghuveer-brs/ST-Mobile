/** 
Created: 23.01.2022
Component: Context provider
Description: It provides the app context and HTTP methods
(c) Copyright (c) by Nyros. 
**/

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect, useCallback} from 'react';
import {Toast} from 'toastify-react-native';
import {httpGet, httpPost, spotifyGet, spotifySearch} from './httpHelpers';
import {calculateRemainingExpirationTime} from '../utils/common';

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
      email: "gopinath.krm@nyros.com",
      password: "123456",
    };

    try {
      const response = await httpPost('login', payload);
      console.log(response);
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

  // BACKEND HTTP METHODS
  // GET HTTP CALL
  const HttpGetHandler = async (path, params) => {
    setIsLoading(true);
    try {
      return await httpGet(path, params);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  // GET HTTP CALL
  const HttpPostHandler = async (path, params) => {
    setIsLoading(true);
    try {
      return await httpPost(path, params);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  // To Refresh the SPotify Token after 1-Hr
  const refreshTokenHandler = async () => {
    const response = await httpGet('refreshtoken');
    const newToken = response.data.spotifytoken.access_token;
    const newExpTime = response.data.spotifytoken.expires_in;
    const newSpotifyExpirationTime = new Date(
      new Date().getTime() + newExpTime * 1000,
    );
    await AsyncStorage.setItem('spotifyToken', newToken);
    await AsyncStorage.setItem(
      'spotifytokenExp',
      newSpotifyExpirationTime.toISOString(),
    );
  };

  // SPOTIFY HTTP METHOD
  const spotifyGetHandler = async (path, params) => {
    setIsLoading(true);
    try {
      return await spotifyGet(path, params);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const SpotifySearchHandler = async (search, params) => {
    setIsLoading(true);
    try {
      return await spotifySearch(search, params);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
    return false;
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
    const user = await httpGet('userDetails');
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
        HttpGet: HttpGetHandler,
        HttpPost: HttpPostHandler,
        SpotifyGet: spotifyGetHandler,
        SpotifySearch: SpotifySearchHandler,
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
