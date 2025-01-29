import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from "./ordersService";

const initialState = {
  orders: [],
  status: 'idle',
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { getState }) => {
  const { token } = getState().auth;
  const response = await orderService.getOrders(token);
  console.log('history', response)
  return response.data;
});

export const createOrder = createAsyncThunk('orders/createOrder', async (orderData, { getState }) => {
  const { token } = getState().auth;
  const response = await orderService.createOrder(orderData, token);
  return response.data;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      });
  },
});

export default ordersSlice.reducer;