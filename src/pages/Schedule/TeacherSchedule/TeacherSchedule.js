import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ErrorMessage } from '../../../components/Error/ErrorMessage';
import { Spinner } from '../../../components/Spinner';
import { TeacherTable } from '../ScheduleComponents/TeacherTable';
import { ScheduleSelectors } from '../ScheduleComponents/ScheduleSelectors';
import { SessionTable } from '../ScheduleComponents/SessionTable';

import { fetchTeacherSessionSchedule } from '../../../store/scheduleSlice';

import './style.css';

export const TeacherSchedule = () => {
  const {teacherScheduleStatus, teacherScheduleData, teacherScheduleError} = useSelector((state) => state.schedule);

  const teacherName = useSelector((state) => state.selectsData.teacher);
  const scheduleType = useSelector((state) => state.weekData.scheduleType);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeacherSessionSchedule(teacherName));
  }, [teacherName]);

  return (
    <>
      {teacherScheduleStatus === 'loading' && <Spinner type="points" text="Идёт загрузка" />}
      {teacherScheduleError && <ErrorMessage error={teacherScheduleError} />}
      {teacherScheduleStatus !== 'loading' && !teacherScheduleError && (
        <>
          <h3 className="teacher-name-title">{teacherName}</h3>
          <div className="group-selectors-block">
            <ScheduleSelectors forAllWeek={true} />
          </div>
          {
            scheduleType==='ordinary-schedule'
              ?
              <TeacherTable scheduleData={teacherScheduleData} />
              :
              <SessionTable isStudentSession={false}/>
          }
        </>
      )}
    </>
  );
};
