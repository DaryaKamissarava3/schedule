import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStudentsSchedule = createAsyncThunk(
  `schedule/fetchStudentsSchedule`,
  async (group, {rejectWithValue}) => {
    try {
      const response = await axios.get(`https://student.vstu.by/api/schedule/group?name=${group}`);

      if (response.status !== 200) {
        throw new Error('Server error!')
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTeacherSchedule = createAsyncThunk(
  `schedule/fetchTeacherSchedule`,
  async (teacherFio, {rejectWithValue}) => {
    try {
      const response = await axios.get(`https://student.vstu.by/api/schedule/teacherFIO?fio=${teacherFio}`);

      if (response.status !== 200) {
        throw new Error('Server error!')
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  studentsScheduleData: [],
  teacherScheduleData: [],
  studentsScheduleStatus: null,
  teacherScheduleStatus: null,
  studentsScheduleError: null,
  teacherScheduleError: null,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    clearSchedule(state) {
      state.studentsScheduleData = [];
      state.studentsScheduleStatus = null;
      state.teacherScheduleData = [];
      state.teacherScheduleStatus = null;
    },
  },
  extraReducers: (builder => {
    builder
      .addCase(fetchStudentsSchedule.pending, (state) => {
        state.studentsScheduleStatus = 'loading';
        state.studentsScheduleError = null;
      })
      .addCase(fetchStudentsSchedule.fulfilled, (state, action) => {
        state.studentsScheduleStatus = 'resolved';
        state.studentsScheduleData = action.payload;
      })
      .addCase(fetchStudentsSchedule.rejected, (state) => {
        state.studentsScheduleStatus = 'rejected';
      })
      .addCase(fetchTeacherSchedule.pending, (state) => {
        state.teacherScheduleStatus = 'loading';
        state.teacherScheduleError = null;
      })
      .addCase(fetchTeacherSchedule.fulfilled, (state, action) => {
        state.teacherScheduleStatus = 'resolved';
        state.teacherScheduleData = action.payload;
      })
      .addCase(fetchTeacherSchedule.rejected, (state) => {
        state.teacherScheduleStatus = 'rejected';
      })
  })
});

export const { clearSchedule } = scheduleSlice.actions;

export const scheduleReducer = scheduleSlice.reducer;
