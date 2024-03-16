import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchBrands, fetchCategories, fetchProductbyId, fetchProductsbyFilter,  updateProductById } from './ProductAPI';


const initialState = {
  products: [],
  categories:[],
  brands:[],
  product:null,
  status: 'idle',
  totalItems:null
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchAllProductsAsync= createAsyncThunk(
  'Products/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
// export const fetchProductsbySortAsync= createAsyncThunk(
//   'Products/fetchProductsbySort',
//   async (sort) => {
//     const response = await fetchProductsbySort(sort);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );
export const fetchProductsbyFilterAsync= createAsyncThunk(
  'Products/fetchProductsbyFilter',
  async ({filter,sort,pagination}) => {
    const response = await fetchProductsbyFilter({filter,sort,pagination});
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchCategoriesAsync= createAsyncThunk(
  'Products/fetchCategories',
  async () => {
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchBrandsAsync= createAsyncThunk(
  'Products/fetchBrands',
  async () => {
    const response = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductbyIdAsync= createAsyncThunk(
  'Products/fetchProductbyId',
  async (id) => {
    const response = await fetchProductbyId(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateProductByIdAsync= createAsyncThunk(
  'Products/updateProductById',
  async (Data) => {
    console.log(Data)
    const response = await updateProductById(Data);

    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const productSlice = createSlice({
  name: 'products',
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
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsbyFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsbyFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems=action.payload.totalItems;
      })
      .addCase(fetchCategoriesAsync.pending,(state)=>{
        state.status='loading';
        
      })
      .addCase(fetchCategoriesAsync.fulfilled,(state,action)=>{
        state.status='idle';
        state.categories=action.payload;
      })
      .addCase(fetchBrandsAsync.pending,(state)=>{
        state.status='loading';
        
      })
      .addCase(fetchBrandsAsync.fulfilled,(state,action)=>{
        state.status='idle';
        state.brands=action.payload;
      })
      .addCase(fetchProductbyIdAsync.pending,(state)=>{
        state.status='loading';
        
      })
      .addCase(fetchProductbyIdAsync.fulfilled,(state,action)=>{
        state.status='idle';
        state.product=action.payload;
      })
      .addCase(updateProductByIdAsync.pending,(state)=>{
        state.status='loading';
        
      })
      .addCase(updateProductByIdAsync.fulfilled,(state,action)=>{
        state.status='idle';
        state.product=action.payload;
        console.log('ProductUpdatedSuccessfully')
        
      })
    
      // .addCase(fetchProductsbySortAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchProductsbySortAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.products = action.payload;
      // });
  },
});


export const selectProducts = (state) => state.productxyz.products;
export const selecttotalItems=(state)=>state.productxyz.totalItems;
export const selectCategories=(state)=>state.productxyz.categories;
export const selectBrands=(state)=>state.productxyz.brands;
export const selectProduct=(state)=>state.productxyz.product;
export default productSlice.reducer;