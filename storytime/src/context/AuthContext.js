import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import {BASE_URL} from '../config';
import {Alert} from 'react-native';
import queryString from 'query-string';

export const AuthContext = createContext();

const spotifyURL = 'https://api.spotify.com/v1/';
const backendURL = 'http://192.168.225.155:6969/';

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const makeHeaders = async () => {
    let token = await AsyncStorage.getItem('userToken');
    let header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return header;
  };

  const makeSpotifyHeaders = async () => {
    let spotifyToken = await AsyncStorage.getItem('spotifyToken');
    console.log(`SPOTIFY TOKEN IS >> ${spotifyToken}`);
    let header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${spotifyToken}`,
    };
    return header;
  };

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
    console.log(URL);
    return URL;
  };

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
      email : "gopinathkrm@gmail.com",
      password : "123456",
    };
    console.log(payload);
    try {
      const response = await axios.post(
        'http://192.168.225.155:6969/login',
        payload,
      );
      if (response.status === 200) {
        console.log(response);
        // console.log(response.status);
        // console.log(response.data.token);
        setUserInfo(response.data);
        setUserToken(response.data.token);
        AsyncStorage.setItem('userToken', response.data.token);
        AsyncStorage.setItem(
          'spotifyToken',
          response.data.spotifytoken.access_token,
        );
        AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
      }
    } catch (error) {
      alert(error.response.data);
      console.log(error.response.data);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const spotifySearch = async (search, params) => {
    const URL = await makeSpotifySearchURL(search, params);
    console.log(URL);
    try {
      const response = await axios.get(URL, {
        headers: await makeSpotifyHeaders(),
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // GET Categories list
  const HttpGet = async (path, params) => {
    const URL = await makeURL(path, params);
    console.log(URL);
    const headers = await makeHeaders();
    try {
      const response = await axios.get(URL, {headers: headers});
      return response.data
    } catch (error) { 
      console.log(error.response);
    }
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      userInfo = JSON.parse(userInfo);
      console.log(userInfo);
      console.log(userToken);
      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(`isLogged In ${error}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{login, logout, spotifySearch, HttpGet, isLoading, userToken}}>
      {children}
    </AuthContext.Provider>
  );
};
