import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  checkUser, createUser, loginUser, logoutUser } from './AuthAPI';

const initialState = {
  loggedInUserToken: null,
  status: 'idle',
isUserChecked:false,
  error:null,
  // isAuthenticated: false
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const createUserAsync= createAsyncThunk(
  'auth/createUser',
  async (user) => {
    const response = await createUser(user);
    // The value we return becomes the `fulfilled` action payload
    // const response2=await updateCart()
    return response.data;
  }
);
export const loginUserAsync= createAsyncThunk(
  'auth/loginUserAsync',
  async (user,{rejectWithValue}) => {
    try{
      const response = await loginUser(user);
      // The value we return becomes the `fulfilled` action payload
      console.log(response.data)
      return response.data;
    }catch(error){
      console.log(error)
      return rejectWithValue(error)
    }
   
  }
);
export const logoutUserAsync= createAsyncThunk(
  'auth/logoutUser',
  async () => {
    const response = await logoutUser();
    return response.data;
  }
);
export const checkUserAsync=createAsyncThunk(
  'auth/checkUser',async()=>{
    try{
    const response=await checkUser()
    return response.data
  }catch(error){
  console.log(error) 
  }
});
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
        // state.isAuthenticated = false
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        // state.isAuthenticated = true
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
        // state.isAuthenticated = false

      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        console.log(action)
        state.status = 'idle';
        state.loggedInUserToken = action.payload.token;
        // state.isAuthenticated = true
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        console.log(action.error)
        state.status = 'idle';
        state.error = action.error;
        // state.isAuthenticated = false
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = 'loading';
        // state.isAuthenticated = true
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
        // state.isAuthenticated = false
      })
      .addCase(checkUserAsync.pending,(state)=>{
state.status='loading'
      })
      .addCase(checkUserAsync.fulfilled,(state,action)=>{
        state.status='idle'
        state.loggedInUserToken=action.payload
        state.isUserChecked=true
              })
      .addCase(checkUserAsync.rejected,(state,action)=>{
                state.status='loading'
                state.error=action.payload
                state.isUserChecked=true
})
                
        

  },
});


export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError=(state)=>state.auth.error
export const selectAddresses=(state)=>state.auth.addresses
export const selectUserChecked=(state)=>state.auth.isUserChecked
export default authSlice.reducer;
