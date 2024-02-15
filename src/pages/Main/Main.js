import React from 'react';
import { useSelector } from 'react-redux';

import { StudentsSchedule } from '../Schedule/StudentsSchedule';
import { TeacherSchedule } from '../Schedule/TeacherSchedule';

import './style.css';

export const Main = () => {
  const selectedTeacher = useSelector((state) => state.selectsData.teacher);
  const selectedGroup = useSelector((state) => state.selectsData.group);
  const selectedCorrespondenceGroup=useSelector((state)=>state.selectsData.correspondenceGroup);

  return (
    <>
      {selectedTeacher && (
        <>
          <TeacherSchedule />
        </>
      )}
      {selectedGroup && (
        <>
          <StudentsSchedule />
        </>
      )}
      {selectedCorrespondenceGroup && (
        <>
          <StudentsSchedule />
        </>
      )}
    </>
  );
};
