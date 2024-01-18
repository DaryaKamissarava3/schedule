import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {fetchTeacherSchedule} from '../../../../store/scheduleSlice';

import {tableHeaderForStudents, tableHeaderForTeacher} from '../../../../assets/utils/arrays';
import {
  generateClassName, matchDayOfWeek2,
  matchLessonTime,
  matchLessonTypeAbbreviation, matchWeekName,
  shortenDisciplineName,
  shortenName
} from '../../../../assets/utils/functions';

import teacherImg from '../../../../assets/images/avatar.svg';
import './style.css';
import {clearGroup, setTeacherFio} from "../../../../store/selectsData";

export const Table = ({scheduleData, isTeacherSchedule}) => {
  const currentWeekDay = useSelector((state) => state.weekData.weekDay);
  const currentWeekNumber = useSelector((state) => state.weekData.weekNumber);
  const currentWeekName = useSelector((state) => state.weekData.weekName);

  const dispatch = useDispatch();

  const [filteredSchedule, setFilteredSchedule] = useState([]);

  useEffect(() => {
    setFilteredSchedule(filterSchedule(currentWeekDay, currentWeekNumber, currentWeekName, scheduleData));
  }, [currentWeekDay, currentWeekNumber, currentWeekName, scheduleData]);

  const filterSchedule = (day, week, name, scheduleArray) => {
     console.log(scheduleArray);
    return scheduleArray.filter(item => {
      if (week === 'все') {
        return (item.lessonDay === day);
      } else {
        return (
          item.lessonDay === day &&
          (item.weekNumber === null || item.weekNumber === week) &&
          (item.numerator === null ||
            (name === true ? item.numerator === true : item.numerator === false))
        );
      }
    }).slice().sort((a, b) => a.lessonNumber - b.lessonNumber);
  };

  const handleTeacherScheduleNavigate = (teacherFio) => {
    dispatch(fetchTeacherSchedule("'" + teacherFio + "'"));
    dispatch(setTeacherFio(teacherFio));
    dispatch(clearGroup());
  }

  return (
    <>
      <div className="schedule-table-block">
        <table className="schedule-table">
          <thead className="table-header">
          <tr className="table-header_row">
            {isTeacherSchedule ?
              tableHeaderForTeacher.map((name, index) => (
                <th className="table-header_item" key={index}>
                  {name}
                </th>
              ))
              : tableHeaderForStudents.map((name, index) => (
                <th className="table-header_item" key={index}>
                  {name}
                </th>
              ))
            }
          </tr>
          </thead>
          <tbody>
          {filteredSchedule.length === 0 ? (
            <tr>
              <td colSpan="8" className="table-body_row_item no_lessons">Пары отсутствуют</td>
            </tr>
          ) : (
            filteredSchedule.map((tableItem) => (
              <tr className="table-body_row" key={tableItem.id}>
                <td className={`table-body_row_item lesson_number ${generateClassName(tableItem.typeClassName)}`}>
                  {tableItem.lessonNumber}
                </td>
                <td className="table-body_row_item">{matchLessonTime(tableItem.lessonNumber)}</td>
                <td className="table-body_row_item">{matchLessonTypeAbbreviation(tableItem.typeClassName)}</td>
                <td className="table-body_row_item">{tableItem.disciplineName}</td>
                {tableItem.subGroup === 1 || tableItem.subGroup === 2 ? (
                  <td className="table-body_row_item">{tableItem.subGroup}</td>
                ) : (
                  <td className="table-body_row_item">Вся группа</td>
                )}
                <td className="table-body_row_item">
                  {tableItem.numerator === false
                    ? 'знаменатель'
                    : tableItem.numerator === null
                      ? 'Всегда'
                      : 'числитель'
                  }
                </td>
                <td className="table-body_row_item">{tableItem.frame}-{tableItem.location}</td>
                {isTeacherSchedule ?
                  <td className="table-body_row_item">
                    {tableItem.groupName}
                  </td>
                  :
                  <td className="table-body_row_item teacher_cell">
                    <Link
                      to={`/schedule/teacher/${tableItem.teacherFio}`}
                      className="teacher_link"
                      onClick={() => handleTeacherScheduleNavigate(tableItem.teacherFio)}
                    >
                      {shortenName(tableItem.teacherFio)}
                    </Link>
                  </td>
                }
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>
      <div className="schedule-table_mobile">
        <div className="mobile-table-container">
          {filteredSchedule.length === 0 ? (
            <div className="mobile-table-block">
              <h3 className="block_no_lessons">Пары отсутствуют</h3>
            </div>
          ) : (
            filteredSchedule.map((item) => (
              <div className={`mobile-card ${generateClassName(item.typeClassName)}`} key={item.id}>
                <div className="card-inner">
                  <div>
                    <h3 className="card-text discipline-name"><b>{item.disciplineName}</b></h3>
                    <div className="card-text">{item.typeClassName}</div>
                  </div>
                  <span className="card-divider"></span>
                  <div>
                    <div className="card-text"><span className="card-text-key"><b>День:</b></span>{matchDayOfWeek2(item.lessonDay)}</div>
                    <div className="card-text"><span className="card-text-key"><b>Пара:</b></span>{item.lessonNumber}</div>
                    <div className="card-text"><span className="card-text-key"><b>Время:</b></span>{matchLessonTime(item.lessonNumber)}</div>
                    <div className="card-text"><span
                      className="card-text-key"><b>Аудитория:</b></span>{item.frame}-{item.location}</div>
                    <div className="card-text"><span className="card-text-key"><b>Группа:</b></span>{item.groupName}</div>
                    <div className="card-text"><span className="card-text-key"><b>Подгруппа:</b></span>
                      {item.subGroup === 1 || item.subGroup === 2 ? (
                        <span>{item.subGroup}</span>
                      ) : (
                        <span>Вся группа</span>
                      )}
                    </div>
                  </div>
                  <div className="card-text">
                    <span className="card-text-key">
                      <b>Преподаватель:</b>
                    </span>
                    <Link
                      to={`/schedule/teacher/${item.teacherFio}`}
                      onClick={() => handleTeacherScheduleNavigate(item.teacherFio)}
                    >
                      {shortenName(item.teacherFio)}
                    </Link>
                  </div>
                  <span className="card-divider"></span>
                  <div>
                    <div className="card-text">
                      <span className="card-text-key">
                        <b>Неделя:</b>
                      </span>
                      {currentWeekNumber}
                    </div>
                    <div className="card-text">
                      <span className="card-text-key">
                        <b>Числитель/Знаменатель:</b>
                      </span>
                      {matchWeekName(currentWeekName)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
