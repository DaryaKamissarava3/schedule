import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {clearTeacherFio, setGroup} from '../../../../store/selectsData';
import {fetchStudentsSchedule} from '../../../../store/scheduleSlice';

import {
  generateClassName,
  matchLessonTime,
  matchLessonTypeAbbreviation,
} from '../../../../assets/utils/functions';

import {
  russianToEnglishWeekdays,
  tableHeaderForTeacher
} from '../../../../assets/utils/arrays';

import noLessonsSmall from '../../../../assets/images/no-lesson-small.svg';
import noLessons from '../../../../assets/images/no-lessons.svg';

export const TeacherTable = ({scheduleData}) => {
  const [filteredSchedule, setFilteredSchedule] = useState([]);

  const dispatch = useDispatch();

  const teacherName = useSelector((state) => state.selectsData.teacher);

  useEffect(() => {
    const data = filterAndSortSchedule(scheduleData);
    setFilteredSchedule(data);
  }, [scheduleData]);

  const filterAndSortSchedule = (schedule) => {
    const dayOrder = {};
    russianToEnglishWeekdays.forEach((day, index) => {
      dayOrder[day.dayInRussian] = index + 1;
    });

    return schedule
      .map(item => ({
        ...item,
        lessonDay: russianToEnglishWeekdays.find(day => day.dayInEnglish === item.lessonDay)?.dayInRussian,
        lessonTime: matchLessonTime(item.lessonNumber)
      }))
      .filter(item => item.lessonDay)
      .sort((a, b) => {
        if (dayOrder[a.lessonDay] === dayOrder[b.lessonDay]) {
          return a.lessonNumber - b.lessonNumber;
        }
        return dayOrder[a.lessonDay] - dayOrder[b.lessonDay];
      });
  };

  const handleGroupScheduleNavigate = (groupName) => {
    dispatch(fetchStudentsSchedule(groupName));
    dispatch(setGroup(groupName));
    dispatch(clearTeacherFio());
  }

  return (
    <>
      <h3 className="teacher-name-title">{teacherName}</h3>
      <div className="schedule-table-block">
        <table className="schedule-table">
          <thead className="table-header">
          <tr className="table-header_row">
            {tableHeaderForTeacher.map((name, index) => (
              <th className="table-header_item" key={index}>
                {name}
              </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {filteredSchedule.length === 0 ? (
            <tr>
              <td colSpan="10" className="table-body_row_item no_lessons">
                <img className="no-lesson-img" src={noLessons} alt="Пар нет"/>
              </td>
            </tr>
          ) : (
            filteredSchedule.map((tableItem) => (
              <tr className="table-body_row" key={tableItem.id}>
                <td className={`table-body_row_item lesson_number ${generateClassName(tableItem.typeClassName)}`}>
                  {tableItem.lessonNumber}
                </td>
                <td className="table-body_row_item">{tableItem.lessonDay}</td>
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
                    ? 'Знаменатель'
                    : tableItem.numerator === null
                      ? 'Всегда'
                      : 'Числитель'
                  }
                </td>
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
                <td className="table-body_row_item">{tableItem.frame}-{tableItem.location}</td>
                <td className="table-body_row_item">
                  <Link
                    to={`/schedule/group/${tableItem.groupName}`}
                    className="teacher_link"
                    onClick={() => handleGroupScheduleNavigate(tableItem.groupName)}
                  >
                    {tableItem.groupName}
                  </Link>
                </td>
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>
      <div className="schedule-table_mobile">
        {/*<div>*/}
        {/*  <span className="card-text-key">*/}
        {/*      <b>Числитель/Знаменатель:</b>*/}
        {/*  </span>*/}
        {/*  {currentWeekName === true*/}
        {/*    ? 'знаменатель'*/}
        {/*    : currentWeekName === null*/}
        {/*      ? 'Всегда'*/}
        {/*      : 'числитель'*/}
        {/*  }*/}
        {/*</div>*/}
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
                    <div className="card-text"><span className="card-text-key"><b>День:</b></span>{item.lessonDay}</div>
                    <div className="card-text"><span className="card-text-key"><b>Пара:</b></span>{item.lessonNumber}
                    </div>
                    <div className="card-text"><span className="card-text-key"><b>Время:</b></span>{item.lessonTime}
                    </div>
                    <div className="card-text"><span
                      className="card-text-key"><b>Аудитория:</b></span>{item.frame}-{item.location}</div>
                    <div className="card-text">
                      <span className="card-text-key">
                        <b>Группа:</b>
                      </span>
                      <Link
                        to={`/schedule/group/${item.groupName}`}
                        onClick={() => handleGroupScheduleNavigate(item.groupName)}
                      >
                        {item.groupName}
                      </Link>
                    </div>
                    <div className="card-text"><span className="card-text-key"><b>Подгруппа:</b></span>
                      {item.subGroup === 1 || item.subGroup === 2 ? (
                        <span>{item.subGroup}</span>
                      ) : (
                        <span>Вся группа</span>
                      )}
                    </div>
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
