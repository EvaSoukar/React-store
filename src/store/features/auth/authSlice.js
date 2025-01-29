import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  token: null,
  message: '',
  responseMessage: '',
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      if (response.status === 201) {
        return response.data;
      } else {
        return rejectWithValue('An error occurred');
      }
    } catch (error) {
      return rejectWithValue('An error occured');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.login(userData);
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue('An error occured');
      }
    } catch (error) {
      return rejectWithValue('An error occured');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('Register Fulfilled:', action.payload)
        state.token = action.payload.token;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.message = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.message = '';
      });
  },
});

export default authSlice.reducer;