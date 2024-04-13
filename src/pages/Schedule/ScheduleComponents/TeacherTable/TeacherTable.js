import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearTeacherFio, setGroup } from '../../../../store/selectsData';
import { fetchStudentsSchedule } from '../../../../store/scheduleSlice';

import {
  filterSchedule,
  generateClassName,
  matchLessonTime,
  matchLessonTypeAbbreviation,
  mergeObjectsWithSameValues, reverseDateForTable,
} from '../../../../assets/utils/functions';

import {
  tableHeaderForAllDays,
  tableHeaderForTeacher, tableHeaderForTeacherWithDate,
  tableTeacherHeaderForAllDays
} from '../../../../assets/utils/arrays';

import noLessonsSmall from '../../../../assets/images/no-lesson-small.svg';
import noLessons from '../../../../assets/images/no-lessons.svg';

export const TeacherTable = ({scheduleData}) => {
  const [filteredSchedule, setFilteredSchedule] = useState([]);

  const currentWeekDay = useSelector((state) => state.weekData.weekDay);
  const currentWeekNumber = useSelector((state) => state.weekData.weekNumber);
  const currentWeekName = useSelector((state) => state.weekData.weekName);

  const dispatch = useDispatch();

  useEffect(() => {
    const data = filterSchedule(currentWeekDay, currentWeekNumber, currentWeekName, scheduleData);
    const data2 = mergeObjectsWithSameValues(data, false);

    setFilteredSchedule(data2);
  }, [currentWeekDay, currentWeekNumber, currentWeekName, scheduleData]);

  const generateGroupsLinks = (groupName) => {
    if (groupName.includes(',')) {
      const splitNames = groupName.split(',');
      return <td className="table-body_row_item teacher_cell">
        {splitNames.map((item, index) =>
          <Link
            key={index}
            to={`/schedule/group/${item.trim()}`}
            className="teacher_link"
            onClick={() => handleGroupScheduleNavigate(item.trim())}
          >
            {item}
          </Link>
        )}
      </td>
    } else {
      return <td className="table-body_row_item teacher_cell">
        <Link
          to={`/schedule/group/${groupName}`}
          className="teacher_link"
          onClick={() => handleGroupScheduleNavigate(groupName)}
        >
          {groupName}
        </Link>
      </td>
    }
  };

  const handleGroupScheduleNavigate = (groupName) => {
    dispatch(fetchStudentsSchedule(groupName));
    dispatch(setGroup(groupName));
    dispatch(clearTeacherFio());
  }

  const hasCorrespondenceData = filteredSchedule.some(item => item.correspondence === true);

  return (
    <>
      <div className="schedule-table-block">
        <table className="schedule-table">
          <thead className="table-header">
          <tr className="table-header_row">
            {currentWeekDay === 'ALL' ?
              hasCorrespondenceData ?
                tableTeacherHeaderForAllDays.map((name, index) => (
                  <th className="table-header_item" key={index}>
                    {name}
                  </th>
                )) :
                tableHeaderForAllDays.map((name, index) => (
                  <th className="ааа table-header_item" key={index}>
                    {name}
                  </th>
                ))
              :
              hasCorrespondenceData ?
                tableHeaderForTeacherWithDate.map((name, index) => (
                  <th className="table-header_item" key={index}>
                    {name}
                  </th>
                ))
                :
                tableHeaderForTeacher.map((name, index) => (
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
              <td colSpan="10" className="table-body_row_item no_lessons">
                <img className="no-lesson-img" src={noLessons} alt="Пар нет"/>
              </td>
            </tr>
          ) : (
            filteredSchedule.map((tableItem) => (
              <tr className={`table-body_row_item lesson_number ${generateClassName(tableItem.typeClassName)}`}
                  key={tableItem.id}>
                {
                  currentWeekDay === 'ALL' ? <td className="table-body_row_item">{tableItem.lessonDay}</td> : ''
                }
                {
                  hasCorrespondenceData ?
                    tableItem.correspondence ?
                      <td className="table-body_row_item">{reverseDateForTable(tableItem.startDate)}</td>
                      :
                      <td className="table-body_row_item">Всегда</td>
                    : ''
                }
                <td className="table-body_row">
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
                {generateGroupsLinks(tableItem.groupName)}
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
                      hasCorrespondenceData ?
                        item.correspondence ?
                          <div className="card-text date"><span
                            className="card-text-key"><b>Дата:</b></span>{reverseDateForTable(item.startDate)}</div>
                          :
                          <div className="card-text date"><span className="card-text-key"><b>Дата:</b></span>Всегда
                          </div>
                        : ''
                    }
                    {
                      currentWeekDay === 'ALL' ?
                        <div className="card-text"><span className="card-text-key"><b>День:</b></span>{item.lessonDay}
                        </div>
                        :
                        ''
                    }
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
                      {item.groupName.split(',').map((group, index) => (
                        <span key={index} className="mobile-group-span">
                        <Link
                          to={`/schedule/group/${group.trim()}`}
                          onClick={() => handleGroupScheduleNavigate(group.trim())}
                        >
                          {group}
                        </Link>
                          {index !== item.groupName.split(',').length - 1 && ', '}
                      </span>
                      ))}
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
