import React from 'react';
import { useSelector } from 'react-redux';

import { StudentsSchedule } from '../Schedule/StudentsSchedule';
import { TeacherSchedule } from '../Schedule/TeacherSchedule';

import './style.css';
import {Footer} from "../../components/Footer";

export const Main = () => {
  const selectedTeacher = useSelector((state) => state.selectsData.teacher);
  const selectedGroup = useSelector((state) => state.selectsData.group);

  return (
    <>
      {selectedTeacher && (
        <>
          <TeacherSchedule/>
          <Footer />
        </>
      )}
      {selectedGroup && (
        <>
          <StudentsSchedule/>
          <Footer />
        </>
      )}
    </>
  );
};
