import React from 'react';
import { useSelector } from 'react-redux';

import { ErrorMessage } from '../../../components/Error/ErrorMessage';
import { Spinner } from '../../../components/Spinner';
import { TeacherTable } from '../ScheduleComponents/TeacherTable';
import { ScheduleSelectors } from '../ScheduleComponents/ScheduleSelectors';

import './style.css';

export const TeacherSchedule = () => {
  const {teacherScheduleStatus, teacherScheduleData, teacherScheduleError} = useSelector((state) => state.schedule);

  const teacherName = useSelector((state) => state.selectsData.teacher);

  return (
    <>
      {teacherScheduleStatus === 'loading' && <Spinner type="points" text="Идёт загрузка" />}
      {teacherScheduleError && <ErrorMessage error={teacherScheduleError} />}
      {teacherScheduleStatus !== 'loading' && !teacherScheduleError && (
        <>
          <h3 className="teacher-name-title">{teacherName}</h3>
          <div className="group-selectors-block">
            <ScheduleSelectors isCorrespondenceSchedule={true} />
          </div>
          <TeacherTable scheduleData={teacherScheduleData} />
        </>
      )}
    </>
  );
};
