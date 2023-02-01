/** 
Created: 23.01.2022
Component: Context provider
Description: It provides the app context and HTTP methods
(c) Copyright (c) by Nyros. 
**/

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import {Toast} from 'toastify-react-native';

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

// function to calculate remaining expiration time 
const calculateRemainingExpirationTime = expirationTime => {
  const currentTime = new Date().getTime();
  const newExpirationTime = new Date(expirationTime).getTime(); //0 incase expTime is empty & we get -ve value
  const remainingTime = newExpirationTime - currentTime;
  return remainingTime;
};

export const AuthContext = createContext();

const spotifyURL = 'https://api.spotify.com/v1/';
const backendURL = 'http://203.193.173.125:6969/';

// context provider
export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedLang, setSelectedLang] = useState([]);
  const [allowedLangages, setAllowedLanguages] = useState([]);
  const [user, setUser] = useState([]);

  // Function to create Backend Headers
  const makeHeaders = async () => {
    let token = await AsyncStorage.getItem('userToken');
    let header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return header;
  };

  // Function to create Spotify Headers
  const makeSpotifyHeaders = async () => {
    let spotifyToken = await AsyncStorage.getItem('spotifyToken');
    let header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${spotifyToken}`,
    };
    return header;
  };

  // Function that constructs Spotify URL based on search params passed
  const makeSpotifySearchURL = async (search, params) => {
    let URL = spotifyURL;
    if (search.q && search.keywords) {
      URL += `search?q=${search.q}%20${search.keywords}&`;
    } else {
      URL += `search?q=${search.q}&`;
    }
    if (params) {
      params = queryString.stringify(params);
      URL += params;
    }

    return URL;
  };

  // Function that constructs Spotify URL based on params/path passed
  const makeSpotifyUrl = async (path, params) => {
    let URL = spotifyURL;
    if (path) {
      URL += path;
    }
    if (params) {
      URL += '?' + queryString.stringify(params);
    }
    return URL;
  };

    // Function that constructs Backend URL based on params/path passed
  const makeURL = async (path, params) => {
    let URL = backendURL;
    if (path) {
      URL += path;
    }
    if (params) {
      URL += '?' + queryString.stringify(params);
    }
    return URL;
  };

  const login = async (email, password) => {
    const payload = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        'http://203.193.173.125:6969/login',
        payload,
      );

      if (response.status === 200) {
        Toast.success('Logged in successfully !');
        setUserInfo(response.data);
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

  // To Refresh the SPotify Token after 1-Hr
  const refreshTokenHandler = async () => {
    const response = await HttpGet('refreshtoken');
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

  // SPOTIFY HTTP GET METHOD
  const spotifyGet = async (path, params) => {
    const URL = await makeSpotifyUrl(path, params);
    try {
      const response = await axios.get(URL, {
        headers: await makeSpotifyHeaders(),
      });
      return response.data;
    } catch (error) {}
  };

  //Spotify Search method
  const spotifySearch = async (search, params) => {
    const URL = await makeSpotifySearchURL(search, params);

    try {
      const response = await axios.get(URL, {
        headers: await makeSpotifyHeaders(),
      });
      return response.data;
    } catch (error) {}
  };

  // Backend HTTP GET method
  const HttpGet = async (path, params) => {
    const URL = await makeURL(path, params);

    const headers = await makeHeaders();
    try {
      const response = await axios.get(URL, {headers: headers});
      return response.data;
    } catch (error) {}
  };

  // Checks user is logged in or not when app is closed and opened
  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');

      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
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

  const [tracks, setTracks] = useState([]);
  const [stickyPlayer, setStickyPlayer] = useState(false);
  const [story, setStory] = useState({});

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        spotifySearch,
        spotifyGet,
        HttpGet,
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
