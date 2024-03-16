import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createProduct } from "./AdminApi"

const initialState={
    updatedProducts:null,
    status:'idle'
}
export const createProductAsync=createAsyncThunk('admin/createProduct',
async(product)=>{
    console.log(product)
const response=await createProduct(product)
return response.data
})
export const adminSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(createProductAsync.pending,(state)=>{
            state.status='loading'
        })
        .addCase(createProductAsync.fulfilled,(action,state)=>{
            state.status='loading'
            state.updatedProducts=action.payload
            console.log('Product Successfully added')
        })
    }

})


export default adminSlice.reducer; 