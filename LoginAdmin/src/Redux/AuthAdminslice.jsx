import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AdminSlice= createSlice({
    name:'admin',
    initialState:{
        isAuthenticated:false,
        error:null,
        adminEmail:"",
        adminPassword:"",
        userData: null,
        blockedOrNot: {},
       

    },
    reducers:{
        loginSuccess:(state,action)=>{
            state.isAuthenticated = true;
            state.error = null;
            state.adminEmail=action.payload.email;
            state.adminPassword=action.payload.password;
            state.userData = action.payload.userData; 
            

        },
        updateBlockedStatus: (state, action) => {
          state.blockedOrNot[action.payload.userId] = action.payload.isBlocked;


        },
        loginFailed:(state,action) =>{
            state.isAuthenticated=false;
            state.error = action.payload;
            state.userData = null;
        },
        Logout:(state)=>{
            state.isAuthenticated=false;
            state.userData = null;
            state.adminEmail="";
            state.adminPassword="";

        }
    }
})

export const {loginSuccess,loginFailed,Logout} = AdminSlice.actions;

// Redux Thunk for handling asynchronous login
export const adminLogin = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:5000/admin", {
      email,
      password,
    });
    console.log(response);
    if (response.data.success) {
      dispatch(loginSuccess({
        email,
        password,
        userData: response.data.user,
        blockedorNot: response.data.isBlocked, 
      }));
    } else {
      dispatch(loginFailed());
      console.error("Admin Login failed:", response.data.message);
    }
  } catch (error) {
    dispatch(loginFailed());
    console.error("Admin Login failed:", error.message);
  }
};

export default AdminSlice.reducer;