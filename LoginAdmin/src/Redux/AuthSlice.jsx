import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name:"auth",
    initialState:{
        isAuthenticated:false,
        error:null,
        userName:'',
        email:'',
        photoUrl: "",

        
    },
    reducers:{
        LoginSuccess:(state,action)=>{
            state.isAuthenticated=true,
            state.error=null,
            state.userName = action.payload.userName,
            state.email =action.payload.email
        },
        LoginFail:(state,action)=>{
          state.isAuthenticated=false,
            state.error=action.payload,
            state.userName=null
            state.email=null
        },
        UploadPhotoSuccess: (state, action) => {
            state.photoUrl = action.payload;
          },
        Logout:(state)=>{
            state.isAuthenticated=false;
            state.error = null;
            state.userName=null
            state.email=null
        
        }

    }
})

export  const {LoginSuccess,LoginFail,Logout,UploadPhotoSuccess} = AuthSlice.actions
export default AuthSlice.reducer