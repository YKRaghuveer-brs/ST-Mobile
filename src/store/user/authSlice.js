import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  isLoggedIn: false,
  token: null,
  spotifyToken: null,
  stickyPlayerOpen: false,
  storyInfo: {name: null, id: null},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.spotifyToken = action.payload.spotifyToken.access_token;
    },
    logout: (state, action) => {
      state.userData = null;
      state.isLoggedIn = false;
      state.token = null;
      state.spotifyToken = null;
      state.isLoggedIn = false;
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
  },
});

export const {login, logout, openStickyPlayer, closeStickyPlayer, setStoryInfo} =
  authSlice.actions;

export default authSlice.reducer;
