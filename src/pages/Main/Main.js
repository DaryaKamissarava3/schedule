import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {CorrespondenceSchedule} from '../Schedule/CorrespondenceSchedule';
import {StudentsSchedule} from '../Schedule/StudentsSchedule';
import {TeacherSchedule} from '../Schedule/TeacherSchedule';

import './style.css';
import {fetchStudentsSessionSchedule} from "../../store/scheduleSlice";

export const Main = () => {
  const selectedTeacher = useSelector((state) => state.selectsData.teacher);
  const selectedGroup = useSelector((state) => state.selectsData.group);
  const selectedCorrespondenceGroup = useSelector((state) => state.selectsData.correspondenceGroup);

  return (
    <>
      {selectedTeacher && (
        <>
          <TeacherSchedule/>
        </>
      )}
      {selectedGroup && (
        <>
          <StudentsSchedule/>
        </>
      )}
      {selectedCorrespondenceGroup && (
        <>
          <CorrespondenceSchedule/>
        </>
      )}
    </>
  );
};
