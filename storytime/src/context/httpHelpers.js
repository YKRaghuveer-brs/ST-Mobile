import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import queryString from 'query-string';
import {spotifyURL, backendURL} from '@env';

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

// Backend HTTP GET method
export const httpGet = async (path, params) => {
  const URL = await makeURL(path, params);
  const headers = await makeHeaders();
  try {
    const response = await axios.get(URL, {headers: headers});
    return response.data;
  } catch (error) {
  } finally {
  }
};

// Backend HTTP GET method
export const httpPost = async (path, payload) => {
  const URL = await makeURL(path);
  try {
    const response = await axios.post(URL, payload);
    return response;
  } catch (error) {
  } finally {
  }
};

// Function that constructs Spotify URL based on search params passed
export const makeSpotifySearchURL = async (search, params) => {
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

// SPOTIFY HTTP GET METHOD
export const spotifyGet = async (path, params) => {
  const URL = await makeSpotifyUrl(path, params);
  try {
    const response = await axios.get(URL, {
      headers: await makeSpotifyHeaders(),
    });
    return response.data;
  } catch (error) {}
};

//Spotify Search method
export const spotifySearch = async (search, params) => {
  const URL = await makeSpotifySearchURL(search, params);
  try {
    const response = await axios.get(URL, {
      headers: await makeSpotifyHeaders(),
    });
    return response.data;
  } catch (error) {}
};
