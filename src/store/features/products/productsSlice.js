import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  products: [],
  error: null,
  loading: false
}

export const getProducts = createAsyncThunk('product-list/getAll', async (_, thunkAPI) => {
  try {
    return await productService.getAll();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
})

export const productsSlice = createSlice({
  name: 'product-list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, state => {
        state.loading = true;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload;
      })
  }
})

export default productsSlice.reducer;