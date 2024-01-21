import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from './AuthSlice'
import AuthAdminslice from './AuthAdminslice'

const store = configureStore({
    reducer :{
        auth: AuthReducer,
        admin:AuthAdminslice,
    }
})

export default store