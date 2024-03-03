import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTeacherSchedule } from '../../../../store/scheduleSlice';
import { clearCorrespondenceGroup, clearGroup, setTeacherFio } from '../../../../store/selectsData';
import {
  tableHeaderForAllDays,
  tableHeaderForCorrespondence,
  tableHeaderForStudents,
} from '../../../../assets/utils/arrays';
import {
  filterSchedule,
  generateClassName,
  matchDayOfWeek,
  matchDayOfWeek2,
  matchLessonTime,
  matchLessonTypeAbbreviation,
  mergeObjectsWithSameValues,
  reverseDateForTable,
  shortenName
} from '../../../../assets/utils/functions';
import noLessons from '../../../../assets/images/no-lessons.svg';
import noLessonsSmall from '../../../../assets/images/no-lesson-small.svg';

import './style.css';

export const StudentsTable = ({ scheduleData, isCorrespondenceSchedule }) => {
  const currentWeekDay = useSelector((state) => state.weekData.weekDay);
  const currentWeekNumber = useSelector((state) => state.weekData.weekNumber);
  const currentWeekName = useSelector((state) => state.weekData.weekName);

  const dispatch = useDispatch();
console.log(scheduleData)
  const [filteredSchedule, setFilteredSchedule] = useState([]);

  useEffect(() => {
    const data = filterSchedule(currentWeekDay, currentWeekNumber, currentWeekName, scheduleData);
    const data2 = mergeObjectsWithSameValues(data, true);

    setFilteredSchedule(data2);
  }, [currentWeekDay, currentWeekNumber, currentWeekName, scheduleData]);

  const generateTeacherLinks = (teacherNames, rowDay) => {
    if (teacherNames.includes(',')) {
      const splitNames = teacherNames.split(',');
      return <td className={`table-body_row_item teacher_cell ${matchDayOfWeek(rowDay)}`}>
        {splitNames.map((item, index) =>
          <Link
            key={index}
            to={`/schedule/teacher/${item.trim()}`}
            className="teacher_link"
            onClick={() => handleTeacherScheduleNavigate(item.trim())}
          >
            {shortenName(item)}
          </Link>
        )}
      </td>
    } else {
      return <td className={`table-body_row_item teacher_cell ${matchDayOfWeek(rowDay)}`}>
        <Link
          to={`/schedule/teacher/${teacherNames}`}
          className="teacher_link"
          onClick={() => handleTeacherScheduleNavigate(teacherNames)}
        >
          {shortenName(teacherNames)}
        </Link>
      </td>
    }
  };

  const handleTeacherScheduleNavigate = (teacherFio) => {
    dispatch(fetchTeacherSchedule("'" + teacherFio + "'"));
    dispatch(setTeacherFio(teacherFio));
    dispatch(clearGroup());
    dispatch(clearCorrespondenceGroup());
  }

  return (
    <>
      <div className="schedule-table-block">
        <table className="schedule-table">
          <thead className="table-header">
          <tr className="table-header_row">
            {currentWeekDay === 'ALL' ?
              (isCorrespondenceSchedule ?
                  tableHeaderForCorrespondence.map((name, index) => (
                    <th className="table-header_item" key={index}>
                      {name}
                    </th>
                  ))
                  :
                  tableHeaderForAllDays.map((name, index) => (
                    <th className="table-header_item" key={index}>
                      {name}
                    </th>
                  ))
              )
              :
              tableHeaderForStudents.map((name, index) => (
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
              <td colSpan="9" className="table-body_row_item no_lessons">
                <img className="no-lesson-img" src={noLessons} alt="Пар нет"/>
              </td>
            </tr>
          ) : (
            filteredSchedule.map((tableItem) => (
              <tr key={tableItem.id} className={`table-body_row ${generateClassName(tableItem.typeClassName)}`}>
                {isCorrespondenceSchedule ?
                  <td className={`table-body_row_item ${matchDayOfWeek(tableItem.lessonDay)}`}>
                    {reverseDateForTable(tableItem.startDate)}
                  </td> :
                  ''
                }
                {
                  currentWeekDay === 'ALL' ? <td
                    className={`table-body_row_item ${matchDayOfWeek(tableItem.lessonDay)}`}>{tableItem.lessonDay}</td> : ''
                }
                <td
                  className={`table-body_row_item lesson_number  ${matchDayOfWeek(tableItem.lessonDay)}`}>
                  {tableItem.lessonNumber}
                </td>
                <td
                  className={`table-body_row_item ${matchDayOfWeek(tableItem.lessonDay)}`}>{matchLessonTime(tableItem.lessonNumber)}</td>
                <td
                  className={`table-body_row_item ${matchDayOfWeek(tableItem.lessonDay)}`}>{matchLessonTypeAbbreviation(tableItem.typeClassName)}</td>
                <td
                  className={`table-body_row_item ${matchDayOfWeek(tableItem.lessonDay)}`}>{tableItem.disciplineName}</td>
                {tableItem.subGroup === 1 || tableItem.subGroup === 2 ? (
                  <td className={`table-body_row_item ${matchDayOfWeek(tableItem.lessonDay)}`}>{tableItem.subGroup}</td>
                ) : (
                  <td className={`table-body_row_item ${matchDayOfWeek(tableItem.lessonDay)}`}>Вся группа</td>
                )}
                <td className={`table-body_row_item ${matchDayOfWeek(tableItem.lessonDay)}`}>
                  {tableItem.weekNumber === 1
                    ? '1'
                    : tableItem.weekNumber === 2
                      ? '2'
                      : tableItem.weekNumber === 3
                        ? '3'
                        : tableItem.weekNumber === 4
                          ? '4'
                          : 'Всегда'
                  }
                </td>
                <td className={`table-body_row_item ${matchDayOfWeek(tableItem.lessonDay)}`}>
                  {tableItem.numerator === false
                    ? 'Знаменатель'
                    : tableItem.numerator === null
                      ? 'Всегда'
                      : 'Числитель'
                  }
                </td>
                <td
                  className={`table-body_row_item ${matchDayOfWeek(tableItem.lessonDay)}`}>{tableItem.frame}-{tableItem.location}</td>
                {
                  generateTeacherLinks(tableItem.teacherFio, tableItem.lessonDay)
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
              <img className="no-lesson-img" src={noLessonsSmall} alt="Пар нет"/>
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
                    {
                      currentWeekDay === 'ALL' && isCorrespondenceSchedule ?
                        <>
                          <div className="card-text">
                           <span
                             className="card-text-key"><b>Дата:</b>
                           </span>
                            {reverseDateForTable(item.startDate)}
                          </div>
                          <div className="card-text">
                          <span
                            className="card-text-key"><b>День:</b></span>{matchDayOfWeek2(matchDayOfWeek(item.lessonDay))}
                          </div>
                        </>
                        :
                        currentWeekDay === 'ALL' ?
                          <div className="card-text">
                          <span
                            className="card-text-key"><b>День:</b></span>{matchDayOfWeek2(matchDayOfWeek(item.lessonDay))}
                          </div> :

                          ''
                    }
                    <div className="card-text"><span className="card-text-key"><b>Пара:</b></span>{item.lessonNumber}
                    </div>
                    <div className="card-text"><span
                      className="card-text-key"><b>Время:</b></span>{matchLessonTime(item.lessonNumber)}</div>
                    <div className="card-text"><span
                      className="card-text-key"><b>Аудитория:</b></span>{item.frame}-{item.location}</div>
                    <div className="card-text"><span className="card-text-key"><b>Группа:</b></span>{item.groupName}
                    </div>
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
                    {item.teacherFio.split(',').map((teacher, index) => (
                      <span key={index} className="mobile-teacher-span">
                        <Link
                          to={`/schedule/teacher/${teacher.trim()}`}
                          onClick={() => handleTeacherScheduleNavigate(teacher.trim())}
                        >
                          {shortenName(teacher)}
                        </Link>
                        {index !== item.teacherFio.split(',').length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                  <span className="card-divider"></span>
                  <div>
                    <div className="card-text">
                      <span className="card-text-key">
                        <b>Неделя:</b>
                      </span>
                      {item.weekNumber === 1
                        ? '1'
                        : item.weekNumber === 2
                          ? '2'
                          : item.weekNumber === 3
                            ? '3'
                            : item.weekNumber === 4
                              ? '4'
                              : 'Всегда'
                      }
                    </div>
                    <div className="card-text">
                      <span className="card-text-key">
                        <b>Числитель/Знаменатель:</b>
                      </span>
                      {item.numerator === false
                        ? 'знаменатель'
                        : item.numerator === null
                          ? 'Всегда'
                          : 'числитель'
                      }
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
