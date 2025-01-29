import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import contactService from './contactService'

const initialState = {
  name: '',
  email: '',
  message: '',
  status: 'idle',
  responseMessage: '',
  error: null
}

export const sendMessage = createAsyncThunk(
  'contact/sendMessage',
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await contactService.sendMessage(contactData);
      if (response.status === 200) {
        return response.data.message; // Assuming the API returns a message in the response
      } else {
        return rejectWithValue('An error occurred');
      }
    } catch (error) {
      return rejectWithValue('An error occurred');
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.responseMessage = action.payload;
        state.name = '';
        state.email = '';
        state.message = '';
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setName, setEmail, setMessage } = contactSlice.actions;
export default contactSlice.reducer;