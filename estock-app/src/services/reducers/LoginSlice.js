import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import DataProvider from "../provider";

export const signIn = createAsyncThunk("/user/login", async (data) => {
    try{
        return await DataProvider.post("/user/login", data);
    }catch (error) {
        return await error.response
    }

});

const initialState = {
    response:{},
    loading: false
}

const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
    },
    extraReducers:{
        [signIn.pending]:(state = initialState, action) =>{
            state.loading = true;
        },
        [signIn.fulfilled]:(state = initialState, action) =>{
            state.loading = false;
            state.response = action.payload.data
        },
        [signIn.rejected]:(state = initialState, action) =>{
            state.loading = false;
        },

    }
});

export default LoginSlice.reducer;