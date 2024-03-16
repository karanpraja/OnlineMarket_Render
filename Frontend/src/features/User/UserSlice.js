import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserData ,fetchUpdateLoggedInUserData, removeUserInfo } from "./UserApi";
const initialState={
    status:'idle',
    userInfo:null,
};


export const fetchLoggedInUserDataAsync=createAsyncThunk(
    'user/fetchLoggedInUserData',
async()=>{
const  response= await fetchLoggedInUserData()
return response.data
});
export const fetchUpdateLoggedInUserDataAsync=createAsyncThunk(
    'user/fetchUpdateLoggedInUserData',
async(user)=>{
const  response= await fetchUpdateLoggedInUserData(user)
return response.data
});
export const removeUserInfoAsync=createAsyncThunk(
    'user/removeUserInfo',
async()=>{
const  response= await removeUserInfo()
return response.data
})


export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchLoggedInUserDataAsync.pending,(state)=>{
            state.status='loading'
         })
         .addCase(fetchLoggedInUserDataAsync.fulfilled,(state,action)=>{
             state.status='idle'
             state.userInfo=action.payload
             })
             .addCase(fetchUpdateLoggedInUserDataAsync.pending,(state)=>{
                state.status='loading'
             })
             .addCase(fetchUpdateLoggedInUserDataAsync.fulfilled,(state,action)=>{
                 state.status='idle'
                 state.userInfo=action.payload
                 })
                 .addCase(removeUserInfoAsync.pending,(state)=>{
                    state.status='loading'
                 })
                 .addCase(removeUserInfoAsync.fulfilled,(state,action)=>{
                     state.status='idle'
                     state.userInfo=null
                     })
    }

})
export const selectUserInfo=state=>state.user.userInfo
export default userSlice.reducer;