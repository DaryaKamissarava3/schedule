import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStudentsGroups = createAsyncThunk(
  `selectsData/fetchStudentsSchedule`,
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(`https://student.vstu.by/api/group/all`);

      if (response.status !== 200) {
        throw new Error('Server error!')
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTeachersFio = createAsyncThunk(
  `selectsData/fetchTeachersFio`,
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(`https://student.vstu.by/api/teacher/all`);

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
  studentsGroups: [],
  teachersFio: [],
  teacher: null,
  group: null,
  studentsGroupsStatus: null,
  teachersFioStatus: null,
  studentsGroupsError: null,
  teachersFioError: null,
};

const selectsDataSlice = createSlice({
  name: 'selectsData',
  initialState,
  reducers: {
    setTeacherFio(state, action) {
      state.teacher = action.payload;
    },
    setGroup(state, action) {
      state.group = action.payload;
    },
    clearTeacherFio(state) {
      state.teacher = null;
    },
    clearGroup(state) {
      state.group = null;
    },
  },
  extraReducers: (builder => {
    builder
      .addCase(fetchStudentsGroups.pending, (state) => {
        state.studentsGroupsStatus = 'loading';
        state.studentsGroupsError = null;
      })
      .addCase(fetchStudentsGroups.fulfilled, (state, action) => {
        state.studentsGroupsStatus = 'resolved';
        state.studentsGroups = action.payload;
      })
      .addCase(fetchStudentsGroups.rejected, (state, action) => {
        state.studentsGroupsStatus = 'rejected';
        state.studentsGroupsError = action.payload;
      })
      .addCase(fetchTeachersFio.pending, (state) => {
        state.teachersFioStatus = 'loading';
        state.teacherScheduleError = null;
      })
      .addCase(fetchTeachersFio.fulfilled, (state, action) => {
        state.teachersFioStatus = 'resolved';
        state.teachersFio = action.payload;
      })
      .addCase(fetchTeachersFio.rejected, (state) => {
        state.teachersFioStatus = 'rejected';
      })
  })
});

export const { setTeacherFio, setGroup, clearTeacherFio, clearGroup } = selectsDataSlice.actions;

export const selectsDataReducer = selectsDataSlice.reducer;
