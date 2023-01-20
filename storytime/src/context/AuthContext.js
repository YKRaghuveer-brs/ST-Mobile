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

const calculateRemainingExpirationTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const newExpirationTime = new Date(expirationTime).getTime(); //0 incase expTime is empty & we get -ve value
  const remainingTime = newExpirationTime - currentTime;
  return remainingTime;
};

export const AuthContext = createContext();

const spotifyURL = 'https://api.spotify.com/v1/';
const backendURL = 'http://203.193.173.125:6969/';

export const AuthProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedLang, setSelectedLang] = useState([]);
  const [allowedLangages, setAllowedLanguages] = useState([]);
  const [user,setUser] = useState([])

  const testFunction = () => {
    console.log("TIME OUT FOR SPOTIFY TOKEN...");
  }
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
 
    try {
      const response = await axios.post(
        'http://203.193.173.125:6969/login',
        payload,
      );
    
      if (response.status === 200) {
        Toast.success("Logged in successfully !");
        setUserInfo(response.data);
        setUserToken(response.data.token);

        const expirationTime = new Date(
          new Date().getTime() + response.data.usertokenExp * 1000
        );
        const spotifyExpirationTime = new Date(
          new Date().getTime() +
            response.data.spotifytoken.expires_in * 1000
        );

        AsyncStorage.setItem("userToken", response.data.token);
        AsyncStorage.setItem("userExpTime", expirationTime.toISOString());

        const remainingTime = calculateRemainingExpirationTime(expirationTime);
        
        logoutTimer = setTimeout(logout, remainingTime);

        // const remainingSpotifyTime = calculateRemainingExpirationTime(spotifyExpirationTime);
        // console.log("remain time is " + remainingSpotifyTime);
        // spotifyLogoutTimer = setInterval(testFunction, remainingSpotifyTime);

        AsyncStorage.setItem("spotifyToken", response.data.spotifytoken.access_token);
        AsyncStorage.setItem("spotifytokenExp", spotifyExpirationTime.toISOString());

        AsyncStorage.setItem("userInfo", JSON.stringify(response.data));
      }
    } catch (error) {
      Toast.error(error.response.data);
      console.log("eroor", error.response.data);
    }
  };

  const logout = () => {
    // alert("HIi")
    setStickyPlayer(false)
    setSelectedLang([]);
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userExpTime");
    setIsLoading(false);
    setAllowedLanguages([]);
  };

  const refreshTokenHandler = async () => {
    console.log("<<<<<<<<<<TRIGGER REFRESH TOKEN>>>>>>>>>");
    const response = await HttpGet("refreshtoken")
    console.log(response);

    const newToken = response.data.spotifytoken.access_token;
    const newExpTime = response.data.spotifytoken.expires_in;

    const newSpotifyExpirationTime = new Date(new Date().getTime() +newExpTime * 1000);
    await AsyncStorage.setItem("spotifyToken", newToken);
    await AsyncStorage.setItem("spotifytokenExp", newSpotifyExpirationTime.toISOString());
  }

  useEffect(() => {
    async function myfunction (){
      console.log("USER TOKEN UE CALL...");
      if (userToken) {
        const newList = JSON.parse(JSON.stringify(languagesList));
        setAllowedLanguages(newList);
  
        const storedExpirationDate =  await AsyncStorage.getItem("userExpTime");
        const remainingTime = calculateRemainingExpirationTime(storedExpirationDate);
     
        if (remainingTime <= 60000) {
          //less than or equal to 1 min (60000 seconds)
          logout()
        }

        const storedSpotifyExpirationDate =  await AsyncStorage.getItem("spotifytokenExp");
        const remainingSpotifyTime = calculateRemainingExpirationTime(storedSpotifyExpirationDate);
      
        if (remainingSpotifyTime <= 60000) {
          //less than or equal to 1 min (60000 seconds)
          // testFunction()
          await refreshTokenHandler()
        }
      }
    }
    myfunction()
  }, [userToken]);

  // SPOTIFY HTTP METHOD
  const spotifyGet = async (path, params) => {
        const URL = await makeSpotifyUrl(path, params);
     
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
     setUser(user);
  });

   useEffect(() => {
    if (userToken) {
      getUserDetails();
    }
  }, [userToken]);


 const [tracks, setTracks] = useState([
  {
    title: "Stressed Out111",
    artist: "Twenty One Pilots",
    albumArtUrl:
      "http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Love Yourself",
    artist: "Justin Bieber",
    albumArtUrl:
      "http://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "Hotline Bling",
    artist: "Drake",
    albumArtUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
]);

  const [stickyPlayer,setStickyPlayer] = useState(false)
   // const story = {
      const [story, setStory] = useState({

    available_markets: [
      "AD",
      "AE"
    
    ],
    copyrights: [],
    description:
      "Tenali Rama was a poet and an advisor to King Krishna Dev of erstwhile kingdom Vijaya Nagar of 16th Century AD which was situated in modern-day Andhra Pradesh, India. He was quite popular for his wittiness and intelligence and had a funny side to his ways of working which attracted everyone towards him.  This podcast brings to life some of the most popular anecdotes from his life and interactions in the royal courtroom and outside. These stories make for a great listening experience for young and adults alike. If you like the show, support us by becoming a patron on this link: https://www.patreon.com/chimesradio  Visit our website to know more: https://chimesradio.com   All podcast listening links: http://chimesradio.bio.link/ Connect with us on our social handles to get all content updates:https://www.instagram.com/vrchimesradio/  https://www.facebook.com/chimesradio",
    explicit: false,
    external_urls: { spotify: "https://open.spotify.com/show/2FMtBcxm5HsoBNkFdscGZ1" },
    href: "https://api.spotify.com/v1/shows/2FMtBcxm5HsoBNkFdscGZ1",
    html_description:
      '<p>Tenali Rama was a poet and an advisor to King Krishna Dev of erstwhile kingdom Vijaya Nagar of 16th Century AD which was situated in modern-day Andhra Pradesh, India. He was quite popular for his wittiness and intelligence and had a funny side to his ways of working which attracted everyone towards him. </p><br/><p>This podcast brings to life some of the most popular anecdotes from his life and interactions in the royal courtroom and outside. These stories make for a great listening experience for young and adults alike.</p><br/><p>If you like the show, support us by becoming a patron on this link: <a href="https://www.patreon.com/chimesradio" rel="nofollow">https://www.patreon.com/chimesradio</a> </p><br/><p>Visit our website to know more: <a href="https://chimesradio.com" rel="nofollow">https://chimesradio.com </a> </p><br/><p>All podcast listening links: http://chimesradio.bio.link/</p><br/><p>Connect with us on our social handles to get all content updates:<br /><a href="https://www.instagram.com/vrchimesradio/" rel="nofollow">https://www.instagram.com/vrchimesradio/ </a> <br /><a href="https://www.facebook.com/chimesradio/" rel="nofollow">https://www.facebook.com/chimesradio</a></p>',
    id: "2FMtBcxm5HsoBNkFdscGZ1",
    images: [
      {
        height: 640,
        url: "https://i.scdn.co/image/ab6765630000ba8ab8035da8f35e611ff83b6622",
        width: 640,
      },
      {
        height: 300,
        url: "https://i.scdn.co/image/ab67656300005f1fb8035da8f35e611ff83b6622",
        width: 300,
      },
      {
        height: 64,
        url: "https://i.scdn.co/image/ab6765630000f68db8035da8f35e611ff83b6622",
        width: 64,
      },
    ],
    is_externally_hosted: false,
    languages: ["hi"],
    media_type: "audio",
    name: "Tenali Rama - Stories in Hindi",
    publisher: "Chimes Podcasts",
    total_episodes: 11,
    type: "show",
    uri: "spotify:show:2FMtBcxm5HsoBNkFdscGZ1",
  });

        const getEpisodeList = async (story) => {
    // setStory(story);
    // setEpisodeList([]);
    const queryParams = { limit: 50, market: "IN" };
    const response = await spotifyGet(
      `shows/${story.id}/episodes`,
      queryParams
    );
    const episodes = [];
    if (response.items.length > 0 || response.next) {
      response.items.map((episode, index) => {
        let obj = {
          id: index,
          title: episode.name.slice(0, 20),
          artist: "Justin Bieber",
          albumArtUrl: episode.images[0].url,
          audioUrl: episode.audio_preview_url,
        };
        episodes.push(obj);
      });

      // setEpisodeList(episodes);
      setTracks(episodes)
      setStory(story)
    } else {
      return false;
    }

    setStickyPlayer(true);
  };

  return (
    <AuthContext.Provider
      value={{login, logout, spotifySearch,spotifyGet, HttpGet,     selectedLanguages: selectedLang,    selectLanguages: setSelectedLang,  languages: allowedLangages, isLoading, userToken,user,minPlayerTracks:tracks,setTracks,minPlayerStory:story,setStory,stickyPlayer,setStickyPlayer}}>
      {children}
    </AuthContext.Provider>
  );
};
