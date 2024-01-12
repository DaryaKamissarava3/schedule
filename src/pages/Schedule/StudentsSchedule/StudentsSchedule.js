import React from 'react';
import { useSelector } from 'react-redux';

import { ErrorMessage } from '../../../components/Error/ErrorMessage';
import { Table } from '../ScheduleComponents/Table';
import { Spinner } from '../../../components/Spinner';
import { ScheduleSelectors } from '../ScheduleComponents/ScheduleSelectors';

export const StudentsSchedule = () => {
  const {studentsScheduleStatus, studentsScheduleData, studentsScheduleError} = useSelector((state) => state.schedule);

  return (
    <>
      {studentsScheduleStatus === 'loading' && <Spinner type="points" text="Идёт загрузка"/>}
      {studentsScheduleError && <ErrorMessage error={studentsScheduleError}/>}
      {studentsScheduleStatus !== 'loading' && !studentsScheduleError && (
        <>
          <ScheduleSelectors/>
          <Table scheduleData={studentsScheduleData} isTeacherSchedule={false}/>
        </>
      )}
    </>
  );
};
