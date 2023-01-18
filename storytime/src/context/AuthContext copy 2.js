import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect,useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { Alert } from "react-native";
import queryString from "query-string";
import ToastManager, { Toast } from "toastify-react-native";

let logoutTimer;
let spotifyLogoutTimer;

// List of allowed languages
const languagesList = [
  {
    id: "l1",
    name: "Hindi",
    languageCode: "hi",
    isActive: false,
    bg: "bg-purple",
  },
  {
    id: "l2",
    name: "Tamil",
    languageCode: "ta",
    isActive: false,
    bg: "bg-lime-400",
  },
  {
    id: "l3",
    name: "Telugu",
    languageCode: "te",
    isActive: false,
    bg: "bg-darkBlue",
  },
  {
    id: "l4",
    name: "English",
    languageCode: "en en-US en-AU en-GB",
    isActive: false,
    bg: "bg-purple",
  },
];

export const AuthContext = createContext();

const calculateRemainingExpirationTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const newExpirationTime = new Date(expirationTime).getTime(); //0 incase expTime is empty & we get -ve value
  const remainingTime = newExpirationTime - currentTime;
  return remainingTime;
};

const retrieveStoredToken = async () => {
  const storedToken =  await AsyncStorage.getItem("userToken");
  console.log("SSSSSSSSSSS");
  console.log(storedToken);
  const storedExpirationDate =  await AsyncStorage.getItem("userExpTime");
  console.log(storedExpirationDate);
  const remainingTime = calculateRemainingExpirationTime(storedExpirationDate);
  if (remainingTime <= 60000) {
    //less than or equal to 1 min (60000 seconds)
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userExpTime");
    AsyncStorage.removeItem("spotifyToken");
    AsyncStorage.removeItem("spotifytokenExp");
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const retrieveStoredSpotifyToken = async () => {
  const storedToken = await AsyncStorage.getItem("spotifytoken");
  const storedExpirationDate = await AsyncStorage.getItem("spotifytokenExp");
  const remainingTime = calculateRemainingExpirationTime(storedExpirationDate);
  if (remainingTime <= 60000) {
    //less than or equals 1 min (60000 seconds)
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const spotifyURL = 'https://api.spotify.com/v1/';
const backendURL = 'http://192.168.225.155:6969/';

export const AuthProvider = ({ children }) => {


  let initialToken;
  if (retrievedToken) {
    initialToken = retrievedToken.token;
  }

  let initialSpotifyToken;
  if (retrievedSpotifyToken) {
    initialSpotifyToken = retrievedSpotifyToken.token;
  }
  
  const RetrieveStoredToken = async () => {
    const tokenData = await retrieveStoredToken();
    setRetrievedToken(tokenData)
  }

  const RetrieveStoredSpotifyToken = async () => {
    const spotifyTokenData = await retrieveStoredSpotifyToken();
    setRetrievedSpotifyToken(spotifyTokenData)
  }


  
  const [isLoading, setIsLoading] = useState(false);

  const [retrievedToken, setRetrievedToken] = useState(null)
  const [retrievedSpotifyToken, setRetrievedSpotifyToken] = useState(null)

  const [userToken, setUserToken] = useState(initialToken);
  const [spotifyToken, setSpotifyToken] = useState(initialSpotifyToken);

  const [userInfo, setUserInfo] = useState(null);
  const [selectedLang, setSelectedLang] = useState([]);
  const [allowedLangages, setAllowedLanguages] = useState([]);
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
      const response = await axios.post(
        'http://192.168.225.155:6969/login',
        payload,
      );
      console.log("response",response)
      if (response.status === 200) {
        Toast.success("Logged in successfully !");

        setUserInfo(response.data);
        setUserToken(response.data.token);
        setSpotifyToken(response.data.spotifytoken.access_token)

        // console.log(response.data.usertokenExp + " ]]]");
        // console.log(response.data.spotifytoken.expires_in + " [[[");

        const expirationTime = new Date(
          new Date().getTime() + response.data.usertokenExp * 1000
        );
        const spotifyExpirationTime = new Date(
          new Date().getTime() +
            response.data.spotifytoken.expires_in * 1000
        );

        // console.log(expirationTime);
        // console.log(spotifyExpirationTime);
        AsyncStorage.setItem("userToken", response.data.token);
        AsyncStorage.setItem("userExpTime", expirationTime.toISOString());

        AsyncStorage.setItem("spotifyToken", response.data.spotifytoken.access_token);
        AsyncStorage.setItem("spotifytokenExp", spotifyExpirationTime.toISOString());

        AsyncStorage.setItem("userInfo", JSON.stringify(response.data));
      }
    } catch (error) {
      Toast.error(error.response.data);
      console.log("eroor", error.response.data);
    }
    // setIsLoading(false)
  };

  const logout = useCallback(() => {
    setSelectedLang([]);
    setAllowedLanguages([]);
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userInfo");

    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userExpTime");

    AsyncStorage.removeItem("spotifytoken");
    AsyncStorage.removeItem("spotifytokenExp");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
      clearInterval(spotifyLogoutTimer);
    }
    setIsLoading(false);
  }, []);


  const refreshTokenHandler = async () => {
    const response = await HttpGet("refreshtoken");
    console.log("CALL REFRESH TOKEN API...");
    console.log(response);
    const newToken = response.spotifytoken.access_token;
    const newExpTime = response.spotifytoken.expires_in;
    let newSpotifyExpirationTime = new Date(
      new Date().getTime() + newExpTime * 1000
    );
    newSpotifyExpirationTime = newSpotifyExpirationTime.toISOString();
    setSpotifyToken(newToken);
    AsyncStorage.setItem("spotifytoken", newToken);
    AsyncStorage.setItem("spotifytokenExp", newSpotifyExpirationTime);
  };

  useEffect(() => {
    if (userToken) {
      const newList = JSON.parse(JSON.stringify(languagesList));
      setAllowedLanguages(newList);
    }
  }, [userToken]);


  useEffect(() => {
    RetrieveStoredToken()
    RetrieveStoredSpotifyToken()
  }, [])

  useEffect(() => {
    if (retrievedToken) {
      console.log("DURATION IS.........");
      console.log(retrievedToken.duration);
      logoutTimer = setTimeout(logout, retrievedToken.duration);
    }
  }, [retrievedToken, logout]);

  

  useEffect(() => {
    // async function myAPI() {
      if (userToken) {
        const expTime =  AsyncStorage.getItem("spotifytokenExp");
        console.log(expTime);
        const spotifyRemainingTime = calculateRemainingExpirationTime(expTime);
        // spotifyLogoutTimer = setInterval(refreshTokenHandler, 120000); // test with sample duration for logout
        spotifyLogoutTimer = setInterval(
          refreshTokenHandler,
          spotifyRemainingTime
        );
      }
    // }
    // myAPI()
    return () => {
      clearInterval(spotifyLogoutTimer);
    };
  }, [userToken]);

  // SPOTIFY HTTP METHOD
  const spotifyGet = async (path, params) => {
        const URL = await makeSpotifyUrl(path, params);
        console.log("URL",URL)
    // setLoading(true);
    try {
      // return await HttpHelper.SpotifyHttpGet(path, params);
       const response = await axios.get(URL, {
        headers: await makeSpotifyHeaders(),
      });
      return response.data;
    } catch (error) {
            console.log(error.response.data);

    } 
  };

  // static SpotifyHttpGet = async (aFunction, aParams) => {
  //   const URL = HttpHelper.#MakeSpotifyUrl(aFunction, aParams);
  //   const header = await HttpHelper.#MakeSpotifyHeader();
  //   const oResult = await HttpHelper.#HttpCall(HttpMethods.Get, URL, header);
  //   return oResult;
  // };

  // static SpotifySearch = async (search, params) => {
  //   const URL = HttpHelper.#MakeSpotifySearchUrl(search, params);
  //   const header = await HttpHelper.#MakeSpotifyHeader();
  //   const oResult = await HttpHelper.#HttpCall(HttpMethods.Get, URL, header);
  //   return oResult;
  // };

  const spotifySearch = async (search, params) => {
    const URL = await makeSpotifySearchURL(search, params);
    console.log(URL);
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
      value={{login, logout, spotifySearch,spotifyGet, HttpGet, selectedLanguages: selectedLang, selectLanguages: setSelectedLang,  languages: allowedLangages, isLoading, userToken}}>
      {children}
    </AuthContext.Provider>
  );
};
