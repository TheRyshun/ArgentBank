import { configureStore } from '@reduxjs/toolkit'
import userConnectReducer from './userlogin.jsx'
import userAccountReducer from './useraccount.jsx'
import userUpdateReducer from './profilupdate.jsx'
const store = configureStore({
    reducer: {
        user: userConnectReducer,
        userAccount: userAccountReducer,
        userUpdate : userUpdateReducer,
    }

})

export default store;