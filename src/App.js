import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import {Main} from "./pages/Main";
import {TeacherSchedule} from "./pages/Schedule/TeacherSchedule";
import {StudentsSchedule} from "./pages/Schedule/StudentsSchedule";
import Layout from "./Layout";

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout/>}>
            <Route path="/"  element={<Main />} />
            <Route path="/schedule/teacher/:teacherName" element={<TeacherSchedule />} />
            <Route path="/schedule/group/:groupName" element={<StudentsSchedule />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
}
