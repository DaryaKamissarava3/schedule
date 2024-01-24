import React from 'react';
import { useSelector } from 'react-redux';

import { ErrorMessage } from '../../../components/Error/ErrorMessage';
import { Footer } from '../../../components/Footer';
import { Spinner } from '../../../components/Spinner';
import { TeacherTable } from '../ScheduleComponents/TeacherTable';

import './style.css';

export const TeacherSchedule = () => {
  const {teacherScheduleStatus, teacherScheduleData, teacherScheduleError} = useSelector((state) => state.schedule);

  return (
    <>
      {teacherScheduleStatus === 'loading' && <Spinner type="points" text="Идёт загрузка" />}
      {teacherScheduleError && <ErrorMessage error={teacherScheduleError} />}
      {teacherScheduleStatus !== 'loading' && !teacherScheduleError && (
        <>
          <TeacherTable scheduleData={teacherScheduleData} />
          <Footer />
        </>
      )}
    </>
  );
};
