import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStudentsGroups = createAsyncThunk(
  `selectsData/fetchStudentsGroups`,
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(`https://student.vstu.by/api/group/all/daytime`);

      if (response.status !== 200) {
        throw new Error('Server error!')
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCorrespondenceStudentsGroups = createAsyncThunk(
  `selectsData/fetchCorrespondenceStudentsGroups`,
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(`https://student.vstu.by/api/group/all/correspondence`);

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
  correspondenceGroups: [],
  studentsGroups: [],
  teachersFio: [],
  correspondenceGroup: null,
  teacher: null,
  group: null,
  correspondenceGroupsStatus: null,
  studentsGroupsStatus: null,
  teachersFioStatus: null,
  correspondenceGroupsError: null,
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
    setCorrespondenceGroup(state, action) {
      state.correspondenceGroup = action.payload;
    },
    clearTeacherFio(state) {
      state.teacher = null;
    },
    clearGroup(state) {
      state.group = null;
    },
    clearCorrespondenceGroup(state) {
      state.correspondenceGroup = null;
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
      .addCase(fetchCorrespondenceStudentsGroups.pending, (state) => {
        state.correspondenceGroupsStatus = 'loading';
        state.correspondenceGroupsError = null;
      })
      .addCase(fetchCorrespondenceStudentsGroups.fulfilled, (state, action) => {
        state.correspondenceGroupsStatus = 'resolved';
        state.correspondenceGroups = action.payload;
      })
      .addCase(fetchCorrespondenceStudentsGroups.rejected, (state) => {
        state.correspondenceGroupsStatus = 'rejected';
      })
  })
});

export const {
  setCorrespondenceGroup,
  setTeacherFio,
  setGroup,
  clearTeacherFio,
  clearGroup,
  clearCorrespondenceGroup,
} = selectsDataSlice.actions;

export const selectsDataReducer = selectsDataSlice.reducer;
