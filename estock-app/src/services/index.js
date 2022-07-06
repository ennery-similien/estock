import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

import loginReducer from './reducers/LoginSlice'

const store = configureStore({
    reducer: {
        loggedUser: loginReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    })
});

export default store;