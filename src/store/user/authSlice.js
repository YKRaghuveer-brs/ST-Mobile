// import {createSlice} from '@reduxjs/toolkit';

// const initialState = {
//   userData: null,
//   isLoggedIn: false,
//   token: null,
//   spotifyToken: null,
//   stickyPlayerOpen: false,
//   storyInfo: {name: null, id: null},
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.isLoggedIn = true;
//       state.token = action.payload.token;
//       state.spotifyToken = action.payload.spotifyToken.access_token;
//     },
//     logout: (state, action) => {
//       state.userData = null;
//       state.isLoggedIn = false;
//       state.token = null;
//       state.spotifyToken = null;
//       state.isLoggedIn = false;
//     },
//     openStickyPlayer: state => {
      
//       state.stickyPlayerOpen = true;
//     },
//     closeStickyPlayer: state => {
      
//       state.stickyPlayerOpen = false;
//     },
//     setStoryInfo: (state, action) => {
//       (state.storyInfo.id = action.payload.s_id),
//         (state.storyInfo.name = action.payload.s_name);
//     },
//   },
// });

// export const {login, logout, openStickyPlayer, closeStickyPlayer, setStoryInfo} =
//   authSlice.actions;

// export default authSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper function to save data to AsyncStorage
const saveToAsyncStorage = async (key, value) => {
  console.log(`Saving to AsyncStorage: key=${key}, value=${JSON.stringify(value)}`);
  if (value !== undefined && value !== null) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log(`Successfully saved key=${key}`);
    } catch (error) {
      console.error(`Error saving to AsyncStorage (key=${key}):`, error);
    }
  } else {
    console.warn(`Skipping saving to AsyncStorage: key=${key}, value is null/undefined`);
  }
};

// Helper function to remove data from AsyncStorage
const removeFromAsyncStorage = async (key) => {
  console.log(`Removing from AsyncStorage: key=${key}`);
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Successfully removed key=${key}`);
  } catch (error) {
    console.error(`Error removing from AsyncStorage (key=${key}):`, error);
  }
};

const initialState = {
  userData: null,
  isLoggedIn: false,
  token: null,
  spotifyToken: null,
  stickyPlayerOpen: false,
  storyInfo: { name: null, id: null },
  isSuspended: false,
  isAdmin: false,
  isSidebarOpen: false,
  isSidebarMinimized: false,
  libraryList: [], // Add libraryList to the initial state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log('Action: LOGIN', action.payload);
      state.isLoggedIn = true;
      state.token = action.payload.token || '';
      state.spotifyToken = action.payload.spotifyToken?.access_token || '';
      state.isAdmin = action.payload.isAdmin || false;

      if (state.token) saveToAsyncStorage('token', state.token);
      if (state.spotifyToken) saveToAsyncStorage('spotifyToken', state.spotifyToken);
      if (state.isAdmin !== undefined) saveToAsyncStorage('isAdmin', state.isAdmin);
    },
    register: (state, action) => {
      console.log('Action: REGISTER', action.payload);
      state.token = action.payload.message;
    },
    forgotPassword: (state, action) => {
      console.log('Action: FORGOT_PASSWORD', action.payload);
      state.token = action.payload.message;
    },
    setUserProfile: (state, action) => {
      console.log('Action: SET_USER_PROFILE', action.payload);
      if (!action.payload.profileData) {
        console.error('Profile data is null or undefined');
        return;
      }
      state.userData = action.payload.profileData;
      saveToAsyncStorage('userdata', action.payload.profileData);
    },
    toggleLanguageSelection: (state, action) => {
      console.log('Action: TOGGLE_LANGUAGE_SELECTION', action.payload);
      if (!state.userData) {
        console.error('Cannot toggle language selection: userData is null');
        return;
      }
      if (!state.userData.languages) {
        state.userData.languages = [];
      }
      if (state.userData.languages.includes(action.payload)) {
        state.userData.languages = state.userData.languages.filter(
          (language) => language !== action.payload
        );
      } else {
        state.userData.languages.push(action.payload);
      }
    },
    toggleSidebar: (state) => {
      console.log('Action: TOGGLE_SIDEBAR');
      state.isSidebarOpen = true;
      state.isSidebarMinimized = true;
    },
    toggleCloseSidebar: (state) => {
      console.log('Action: TOGGLE_CLOSE_SIDEBAR');
      state.isSidebarOpen = false;
      state.isSidebarMinimized = false;
    },
    toggleSidebarMinimize: (state) => {
      console.log('Action: TOGGLE_SIDEBAR_MINIMIZE');
      state.isSidebarMinimized = !state.isSidebarMinimized;
    },
    
    openStickyPlayer: state => {
      
      state.stickyPlayerOpen = true;
    },
    closeStickyPlayer: state => {
      
      state.stickyPlayerOpen = false;
    },
    setStoryInfo: (state, action) => {
      (state.storyInfo.id = action.payload.s_id),
        (state.storyInfo.name = action.payload.s_name);
    },
    
    updateSpotifyToken: (state, action) => {
      console.log('Action: UPDATE_SPOTIFY_TOKEN', action.payload);
      state.spotifyToken = action.payload.spotifyToken?.access_token || '';
      if (state.spotifyToken) saveToAsyncStorage('spotifyToken', state.spotifyToken);
    },
    logout: (state) => {
      console.log('Action: LOGOUT');
      state.userData = null;
      state.isLoggedIn = false;
      state.token = null;
      state.spotifyToken = null;
      state.isAdmin = false;
      state.isSidebarOpen = false;
      state.isSidebarMinimized = false;
      state.libraryList = []; // Clear libraryList on logout

      removeFromAsyncStorage('token');
      removeFromAsyncStorage('spotifyToken');
      removeFromAsyncStorage('userdata');
      removeFromAsyncStorage('isAdmin');
      removeFromAsyncStorage('libraryList'); // Remove libraryList from AsyncStorage
    },
    
    // closeStickyPlayer: (state) => {
    //   console.log('Action: CLOSE_STICKY_PLAYER');
    //   state.stickyPlayerOpen = false;
    //   state.storyInfo = { name: null, id: null }; // Reset storyInfo
    // },
    addToLibrary: (state, action) => {
      console.log('Action: ADD_TO_LIBRARY', action.payload);
      const newStory = action.payload;
      state.libraryList.push(newStory);
      saveToAsyncStorage('libraryList', state.libraryList); // Save libraryList to AsyncStorage
    },
    removeFromLibrary: (state, action) => {
      console.log('Action: REMOVE_FROM_LIBRARY', action.payload);
      const storyId = action.payload;
      state.libraryList = state.libraryList.filter((story) => story.id !== storyId);
      saveToAsyncStorage('libraryList', state.libraryList); // Save updated libraryList to AsyncStorage
    },
    setLibrary: (state, action) => {
      console.log('Action: SET_LIBRARY', action.payload);
      state.libraryList = action.payload;
    },
  },
});

export const {
  login,
  logout,
  register,
  forgotPassword,
  setUserProfile,
  toggleLanguageSelection,
  toggleSidebar,
  toggleCloseSidebar,
  toggleSidebarMinimize,
  setStoryInfo,
  updateSpotifyToken,
  openStickyPlayer,
  closeStickyPlayer,
  addToLibrary,
  removeFromLibrary, 
  setLibrary,
} = authSlice.actions;

// Load library from AsyncStorage when the app starts
// export const initializeLibrary = () => async (dispatch) => {
//   try {
//     const library = await AsyncStorage.getItem('libraryList');
//     if (library) {
//       dispatch(setLibrary(JSON.parse(library)));
//     }
//   } catch (error) {
//     console.error('Error loading library from AsyncStorage:', error);
//   }
// };
// Load library from AsyncStorage when the app starts

export default authSlice.reducer;