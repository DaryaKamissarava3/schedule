import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWeekDay = createAsyncThunk(
  'weekData/fetchWeekDay',
  async (token, {rejectWithValue}) => {
    try {
      const response = await axios.get('https://student.vstu.by/api/schedule/day');

      if (response.status !== 200) {
        throw new Error('Server error!');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWeekNumber = createAsyncThunk(
  'weekData/fetchWeekNumber',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get('https://student.vstu.by/api/schedule/numberOfWeek');

      if (response.status !== 200) {
        throw new Error('Server error!');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const fetchWeekName = createAsyncThunk(
  'weekData/fetchWeekName',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get('https://student.vstu.by/api/schedule/nameOfWeek');

      if (response.status !== 200) {
        throw new Error('Server error!');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  weekDay: null,
  weekNumber: null,
  weekName: null,
  status: null,
  error: null,
};

const weekDataSlice = createSlice({
  name: 'weekData',
  initialState,
  reducers: {
    setWeekDay(state, action) {
      state.weekDay = action.payload;
    },
    setWeekNumber(state, action) {
      state.weekNumber = action.payload;
    },
    setWeekName(state, action) {
      state.weekName = action.payload;
    },
    clearWeekData(state) {
      state.weekDay = null;
      state.weekNumber = null;
      state.weekName = null;
      state.status = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeekDay.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeekDay.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.weekDay = action.payload;
      })
      .addCase(fetchWeekDay.rejected, (state) => {
        state.status = 'rejected';
      })
      .addCase(fetchWeekNumber.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeekNumber.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.weekNumber = action.payload;
      })
      .addCase(fetchWeekNumber.rejected, (state) => {
        state.status = 'rejected';
      })
      .addCase(fetchWeekName.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeekName.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.weekName = action.payload;
      })
      .addCase(fetchWeekName.rejected, (state) => {
        state.status = 'rejected';
      })
  }
});

export const {
  setWeekDay,
  setWeekNumber,
  setWeekName,
  clearWeekData,
} = weekDataSlice.actions;

export const weekDataReducer = weekDataSlice.reducer;
