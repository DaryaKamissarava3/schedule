import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTeacherSchedule } from '../../../../store/scheduleSlice';
import { clearGroup, setTeacherFio } from '../../../../store/selectsData';
import { tableHeaderForStudents, tableHeaderForTeacher } from '../../../../assets/utils/arrays';
import {
  generateClassName,
  matchDayOfWeek2,
  matchLessonTime,
  matchLessonTypeAbbreviation,
  shortenName
} from '../../../../assets/utils/functions';
import noLessons from '../../../../assets/images/no-lessons.svg';
import noLessonsSmall from '../../../../assets/images/no-lesson-small.svg';

import './style.css';

export const Table = ({scheduleData, isTeacherSchedule}) => {
  const currentWeekDay = useSelector((state) => state.weekData.weekDay);
  const currentWeekNumber = useSelector((state) => state.weekData.weekNumber);
  const currentWeekName = useSelector((state) => state.weekData.weekName);

  const dispatch = useDispatch();

  const [filteredSchedule, setFilteredSchedule] = useState([]);

  useEffect(() => {
    const data = filterSchedule(currentWeekDay, currentWeekNumber, currentWeekName, scheduleData);
    const data2= mergeObjectsWithSameValues(data);

    setFilteredSchedule(data2);
  }, [currentWeekDay, currentWeekNumber, currentWeekName, scheduleData]);

   const generateTeacherLinks = (teacherNames) => {
     if (teacherNames.includes(',')) {
       const splitNames = teacherNames.split(',');
       return<td className="table-body_row_item teacher_cell">
         {splitNames.map((item,index)=>
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
       return <td>
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

  const filterSchedule = (day, week, name, scheduleArray) => {
    return scheduleArray.filter(item => {
      if (week === 'все') {
        return (item.lessonDay === day);
      } else {
        return (
          item.lessonDay === day &&
          (item.weekNumber === null || item.weekNumber === week) &&
          (item.numerator === null ||
            (name === true ? item.numerator === false : item.numerator === true))
        );
      }
    }).slice().sort((a, b) => a.lessonNumber - b.lessonNumber);
  };

  const mergeObjectsWithSameValues = (schedule) => {
    const mergedSchedule = [];
    schedule.forEach((item) => {
      const existingItem = mergedSchedule.find((mergedItem) => (
        mergedItem.lessonDay === item.lessonDay &&
        mergedItem.lessonNumber === item.lessonNumber &&
        mergedItem.lessonTime === item.lessonTime &&
        mergedItem.typeClassName === item.typeClassName &&
        mergedItem.disciplineName === item.disciplineName &&
        mergedItem.groupName === item.groupName
      ));

      if (existingItem) {
        existingItem.location += `, ${item.location}`;
        existingItem.teacherFio += `, ${item.teacherFio}`;
      } else {
        mergedSchedule.push({...item});
      }
    });

    return mergedSchedule;
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
              <td colSpan="8" className="table-body_row_item no_lessons">
                <img className="no-lesson-img" src={noLessons} alt="Пар нет"/>
              </td>
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
                <td className="table-body_row_item">
                  {tableItem.numerator === false
                    ? 'Знаменатель'
                    : tableItem.numerator === null
                      ? 'Всегда'
                      : 'Числитель'
                  }
                </td>
                <td className="table-body_row_item">{tableItem.frame}-{tableItem.location}</td>
                {isTeacherSchedule ?
                  <td className="table-body_row_item">
                    {tableItem.groupName}
                  </td>
                  :
                  generateTeacherLinks(tableItem.teacherFio)
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
                    <div className="card-text"><span
                      className="card-text-key"><b>День:</b></span>{matchDayOfWeek2(item.lessonDay)}</div>
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
