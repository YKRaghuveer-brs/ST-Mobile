import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect,useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { Alert } from "react-native";
import queryString from "query-string";
import ToastManager, { Toast } from "toastify-react-native";

export const AuthContext = createContext();

const spotifyURL = "https://api.spotify.com/v1/";
const backendURL = "http://203.193.173.125:6969/";

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [user,setUser] = useState([])

  const makeHeaders = async () => {
    let token = await AsyncStorage.getItem("userToken");
    let header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return header;
  };

  const makeSpotifyHeaders = async () => {
    let spotifyToken = await AsyncStorage.getItem("spotifyToken");
    console.log(`SPOTIFY TOKEN IS >> ${spotifyToken}`);
    let header = {
      Accept: "application/json",
      "Content-Type": "application/json",
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

  const makeSpotifyUrl = async (path, params) => {
    let URL = spotifyURL;
    if (path) {
      URL += path;
    }
    if (params) {
      URL += "?" + queryString.stringify(params);
    }
    return URL;
  };

  const makeURL = async (path, params) => {
    let URL = backendURL;
    if (path) {
      URL += path;
    }
    if (params) {
      URL += "?" + queryString.stringify(params);
    }
    return URL;
  };

  const login = async (email, password) => {
    const payload = {
      email,
      password,
    };
    console.log(payload);
    try {
      const response = await axios.post("http://203.193.173.125:6969/login", payload);
      console.log("response", response.data);
      if (response.status === 200) {
        Toast.success("Logged in successfully !");
        setUserInfo(response.data);
        setUserToken(response.data.token);
        AsyncStorage.setItem("userToken", response.data.token);
        AsyncStorage.setItem("spotifyToken", response.data.spotifytoken.access_token);
        AsyncStorage.setItem("userInfo", JSON.stringify(response.data));
      }
    } catch (error) {
      Toast.error(error.response.data);
      console.log("eroor", error.response.data);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  // SPOTIFY HTTP METHOD
  const spotifyGet = async (path, params) => {
    const URL = await makeSpotifyUrl(path, params);
    try {
      const response = await axios.get(URL, {
        headers: await makeSpotifyHeaders(),
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const spotifySearch = async (search, params) => {
    const URL = await makeSpotifySearchURL(search, params);
    try {
      const response = await axios.get(URL, {
        headers: await makeSpotifyHeaders(),
      });
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
      const response = await axios.get(URL, { headers: headers });
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      userInfo = JSON.parse(userInfo);
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

  const getUserDetails = useCallback(async () => {
    const user = await HttpGet("userDetails");
    console.log("user666666666666666666666666666",user)
     setUser(user);
  });

   useEffect(() => {
    if (userToken) {
      getUserDetails();
    }
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{ login, logout, spotifySearch, spotifyGet, HttpGet, isLoading, userToken, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
