import React from 'react';
import { useSelector } from 'react-redux';

import { Spinner } from '../../../components/Spinner';
import { ErrorMessage } from '../../../components/Error/ErrorMessage';
import {CorrespondenceTable} from "../ScheduleComponents/CorrespondenceTable";

export const CorrespondenceSchedule = () => {
  const {studentsScheduleStatus, studentsScheduleData, studentsScheduleError} = useSelector((state) => state.schedule);

  const groupName = useSelector((state) => state.selectsData.correspondenceGroup);

  return (
    <>
      {studentsScheduleStatus === 'loading' && <Spinner type="points" text="Идёт загрузка" />}
      {studentsScheduleError && <ErrorMessage error={studentsScheduleError} />}
      {studentsScheduleStatus !== 'loading' && !studentsScheduleError && (
        <>
          <div className="group-selectors-block">
            <h3 className="group-title">Группа: {groupName}</h3>
          </div>
          <CorrespondenceTable scheduleData={studentsScheduleData}  />
        </>
      )}
    </>
  );
};
