import React from 'react';
import {useSelector} from 'react-redux';

import {ErrorMessage} from '../../../components/Error/ErrorMessage';
import {Table} from '../ScheduleComponents/Table';
import {Spinner} from '../../../components/Spinner';
import {ScheduleSelectors} from '../ScheduleComponents/ScheduleSelectors';
import {Footer} from "../../../components/Footer";

export const StudentsSchedule = () => {
  const {studentsScheduleStatus, studentsScheduleData, studentsScheduleError} = useSelector((state) => state.schedule);
  const groupName = useSelector((state) => state.selectsData.group);

  return (
    <>
      {studentsScheduleStatus === 'loading' && <Spinner type="points" text="Идёт загрузка"/>}
      {studentsScheduleError && <ErrorMessage error={studentsScheduleError}/>}
      {studentsScheduleStatus !== 'loading' && !studentsScheduleError && (
        <>
          <div className="group-selectors-block">
            <h3 className="group-title">Группа: {groupName}</h3>
            <ScheduleSelectors/>
          </div>
          <Table scheduleData={studentsScheduleData} isTeacherSchedule={false}/>
        </>
      )}
    </>
  );
};
