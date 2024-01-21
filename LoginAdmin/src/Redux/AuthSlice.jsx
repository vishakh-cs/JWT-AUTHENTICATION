import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    error: null,
    token:'',
    userId: '',
    userName: '',
    email: '',
    profileImage: "",
  },
  reducers: {
    LoginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.error = null;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.token=action.payload.token;
      state.userId = action.payload.userId;
      state.profileImage= action.payload.profileImage;

      localStorage.setItem('authState', JSON.stringify(state));
    },
    LoginFail: (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload;
      state.userName = null;
      state.email = null;
      state.userId = '';
    },
    UploadPhotoSuccess: (state, action) => {
      console.log("Upload photo success",action.payload);
      state.profileImage = action.payload.profileImage;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    Logout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
      state.userName = null;
      state.email = null;
      state.token='';
      state.userId = '';
      state.profileImage='';
      // Clear the authentication state from localStorage
      localStorage.removeItem('authState');
    },
  },
});

export const { LoginSuccess, LoginFail, Logout, UploadPhotoSuccess } = AuthSlice.actions;

export const logoutUser = () => async (dispatch,getState) => {
  try {
    const { token } = getState().auth;

    const response = await axios.post("http://localhost:5000/logout", { token });

    if (response.data.success) {
     
      dispatch(Logout());
    } else {
    
      console.error("Logout failed:", response.data.message);
    }
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
};

export default AuthSlice.reducer;
