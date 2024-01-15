import React from 'react';
import { useSelector } from 'react-redux';

import { StudentsSchedule } from '../Schedule/StudentsSchedule';
import { TeacherSchedule } from '../Schedule/TeacherSchedule';

import './style.css';

export const Main = () => {
  const selectedTeacher = useSelector((state) => state.selectsData.teacher);
  const selectedGroup = useSelector((state) => state.selectsData.group);

  return (
    <>
      {selectedTeacher && (
        <div>
          <TeacherSchedule/>
        </div>
      )}
      {selectedGroup && (
        <div className="group-block">
          <StudentsSchedule/>
        </div>
      )}
    </>
  );
};
