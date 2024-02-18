import React from 'react';
import { useSelector } from 'react-redux';

import { ErrorMessage } from '../../../components/Error/ErrorMessage';
import { ScheduleSelectors } from '../ScheduleComponents/ScheduleSelectors';
import { Spinner } from '../../../components/Spinner';
import { StudentsTable } from '../ScheduleComponents/StudentsTable';

export const StudentsSchedule = () => {
  const {studentsScheduleStatus, studentsScheduleData, studentsScheduleError} = useSelector((state) => state.schedule);

  const groupName = useSelector((state) => state.selectsData.group);

  return (
    <>
      {studentsScheduleStatus === 'loading' && <Spinner type="points" text="Идёт загрузка" />}
      {studentsScheduleError && <ErrorMessage error={studentsScheduleError} />}
      {studentsScheduleStatus !== 'loading' && !studentsScheduleError && (
        <>
          <div className="group-selectors-block">
            <h3 className="group-title">Группа: {groupName}</h3>
            <ScheduleSelectors isCorrespondenceSchedule={false} />
          </div>
          <StudentsTable scheduleData={studentsScheduleData} isCorrespondenceSchedule={false} />
        </>
      )}
    </>
  );
};
