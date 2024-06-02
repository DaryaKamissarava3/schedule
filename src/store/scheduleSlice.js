import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStudentsSchedule = createAsyncThunk(
  `schedule/fetchStudentsSchedule`,
  async (group, {rejectWithValue}) => {
    try {
      const response = await axios.get(`https://schedule.vstu.by/api/schedule/group?name=${group}`);

      if (response.status !== 200) {
        throw new Error('Server error!')
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchStudentsSessionSchedule = createAsyncThunk(
  `schedule/fetchStudentsSessionSchedule`,
  async (group, {rejectWithValue}) => {
    try {
      const response = await axios.get(`https://schedule.vstu.by/api/schedule/group/exam?name=${group}`);

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
      const response = await axios.get(`https://schedule.vstu.by/api/schedule/teacherFIO?fio=${teacherFio}`);

      if (response.status !== 200) {
        throw new Error('Server error!')
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTeacherSessionSchedule = createAsyncThunk(
  `schedule/fetchTeacherSessionSchedule`,
  async (teacherFio, {rejectWithValue}) => {
    try {
      console.log(teacherFio)
      const response = await axios.get(`https://schedule.vstu.by/api/schedule/teacherFIO/exam?fio=${teacherFio}`);

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
  studentsScheduleSessionData:[],
  teacherScheduleData: [],
  teacherScheduleSessionData: [],
  studentsScheduleStatus: null,
  studentsScheduleSessionStatus: null,
  teacherScheduleStatus: null,
  teacherScheduleSessionStatus: null,
  studentsScheduleError: null,
  studentsScheduleSessionError: null,
  teacherScheduleError: null,
  teacherScheduleSessionError: null,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    clearSchedule(state) {
      state.studentsScheduleData = [];
      state.studentsScheduleStatus = null;
      state.studentsScheduleSessionData = [];
      state.studentsScheduleSessionStatus = null;
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
      .addCase(fetchStudentsSessionSchedule.pending, (state) => {
        state.studentsScheduleSessionStatus = 'loading';
        state.studentsScheduleSessionError = null;
      })
      .addCase(fetchStudentsSessionSchedule.fulfilled, (state, action) => {
        state.studentsScheduleSessionStatus = 'resolved';
        state.studentsScheduleSessionData = action.payload;
      })
      .addCase(fetchStudentsSessionSchedule.rejected, (state) => {
        state.studentsScheduleSessionStatus = 'rejected';
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
      .addCase(fetchTeacherSessionSchedule.pending, (state) => {
        state.teacherScheduleSessionStatus = 'loading';
        state.teacherScheduleSessionError = null;
      })
      .addCase(fetchTeacherSessionSchedule.fulfilled, (state, action) => {
        state.teacherScheduleSessionStatus = 'resolved';
        state.teacherScheduleSessionData = action.payload;
      })
      .addCase(fetchTeacherSessionSchedule.rejected, (state) => {
        state.teacherScheduleSessionStatus = 'rejected';
      })
  })
});

export const scheduleReducer = scheduleSlice.reducer;
