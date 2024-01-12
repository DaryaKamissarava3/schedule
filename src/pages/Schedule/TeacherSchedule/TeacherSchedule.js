import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import {
  generateClassName,
  matchLessonTime,
  matchLessonTypeAbbreviation, shortenDisciplineName,
  shortenName
} from '../../../assets/utils/functions';

import { russianToEnglishWeekdays, tableHeaderForTeacher } from '../../../assets/utils/arrays';
import { fetchStudentsSchedule } from '../../../store/scheduleSlice';
import teacherImg from '../../../assets/images/avatar.svg';

import './style.css';

export const TeacherSchedule = () => {
  const [filteredSchedule, setFilteredSchedule] = useState([]);

  const dispatch = useDispatch();

  const scheduleData = useSelector((state) => state.schedule.teacherScheduleData);

  useEffect(() => {
    setFilteredSchedule(filterAndSortSchedule(scheduleData));
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
  }

  return (
    <>
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
              <td colSpan="9" className="table-body_row_item no_lessons">Пары отсутствуют</td>
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
                  <td className="table-body_row_item">{tableItem.subGroup}п.</td>
                ) : (
                  <td className="table-body_row_item"></td>
                )}
                <td className="table-body_row_item">
                  {tableItem.numerator === false
                    ? 'знаменатель'
                    : tableItem.numerator === null
                      ? 'всегда'
                      : 'числитель'
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
        <div className="mobile-table-container">
          {filteredSchedule.length === 0 ? (
            <div className="mobile-table-block">
              <h3 className="block_no_lessons">Пары отсутствуют</h3>
            </div>
          ) : (
            filteredSchedule.map((item) => (
              <div className={`mobile-table-block ${generateClassName(item.typeClassName)}`} key={item.id}>
                <div className="table-block_inner">
                  <div className="block_inner_description">
                    <div className="block_description_name">
                      <h4 className="description_lesson_name">{shortenDisciplineName(item.disciplineName)}</h4>
                      <p className="description_lesson_type">({matchLessonTypeAbbreviation(item.typeClassName)})</p>
                      {item.subGroup === 1 || item.subGroup === 2 ? (
                        <p className="description_lesson_subGroup">{item.subGroup}п.</p>
                      ) : (
                        <p className="description_lesson_subGroup"></p>
                      )}
                    </div>
                    <p className="description_lesson_time">Время: {matchLessonTime(item.lessonNumber)}</p>
                    <p className="description_lesson_location">{item.frame}-{item.location} ауд.</p>
                  </div>

                  <div>
                    {item.groupName}
                  </div>
                  :
                  <Link to={`/schedule/teacher/${item.teacherFio}`} className="block_teacher_information">
                    <img className="teacher_cell_img mobile" src={teacherImg} alt="Teacher image"/>
                    <p className="block_teacher_name">{shortenName(item.teacherFio)}</p>
                  </Link>

                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
