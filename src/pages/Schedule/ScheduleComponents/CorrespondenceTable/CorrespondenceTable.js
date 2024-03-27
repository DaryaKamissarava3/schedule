import React, {useEffect, useState} from 'react';
import {lessonTimes, tableHeaderForCorrespondence} from "../../../../assets/utils/arrays";
import noLessons from "../../../../assets/images/no-lessons.svg";
import {
  generateClassName,
  matchDayOfWeek,
  matchDayOfWeek2,
  matchLessonTime,
  matchLessonTypeAbbreviation,
  reverseDateForTable,
  shortenName
} from "../../../../assets/utils/functions";
import noLessonsSmall from "../../../../assets/images/no-lesson-small.svg";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {fetchTeacherSchedule} from "../../../../store/scheduleSlice";
import {clearCorrespondenceGroup, clearGroup, setTeacherFio} from "../../../../store/selectsData";

export const CorrespondenceTable = ({scheduleData}) => {
  const currentWeekDay = useSelector((state) => state.weekData.weekDay);
  const currentWeekNumber = useSelector((state) => state.weekData.weekNumber);
  const currentWeekName = useSelector((state) => state.weekData.weekName);

  const dispatch = useDispatch();

  const [filteredSchedule, setFilteredSchedule] = useState([]);

  useEffect(() => {
    const data = filterScheduleByDate(scheduleData);
    const data2 = mergeObjectsByExam(data);

    setFilteredSchedule(data2);
  }, [currentWeekDay, currentWeekNumber, currentWeekName, scheduleData]);

  const filterScheduleByDate = (scheduleArray) => {
    const sss = [...scheduleArray].sort((a, b) => {
      const sortedByDate = new Date(a.startDate) - new Date(b.startDate);

      if (sortedByDate !== 0) {
        return sortedByDate;
      }

      return a.lessonNumber - b.lessonNumber;
    });

    return sss.map((item) => ({
      ...item,
      lessonTime: lessonTimes.find(lesson => lesson.lessonNumber === item.lessonNumber)?.lessonTime || ''
    }));
  }

  const mergeObjectsByExam = (scheduleArray) => {
    const mergedSchedule = [];
    scheduleArray.forEach((item) => {
      const existingItem = mergedSchedule.find((mergedItem) => (
        mergedItem.lessonDay === item.lessonDay &&
        mergedItem.typeClassName === item.typeClassName &&
        mergedItem.startDate === item.startDate &&
        mergedItem.disciplineName === item.disciplineName &&
        mergedItem.teacherFio === item.teacherFio
      ));
      if (existingItem) {
        const lessonTimes = existingItem.lessonTime.split(', ');
        const firstLessonTime = lessonTimes[0].split('-')[0];
        const lastLessonPart = item.lessonTime.split('-')[1];
        existingItem.lessonTime = `${firstLessonTime} - ${lastLessonPart}`;

        const lessonNumbers = existingItem.lessonNumber.toString().split(', ');
        if (!lessonNumbers.includes(item.lessonNumber)) {
          existingItem.lessonNumber += ` - ${item.lessonNumber}`;
        }
      } else {
        mergedSchedule.push({...item});
      }
    });

    return mergedSchedule;
  }

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
            {
              tableHeaderForCorrespondence.map((name, index) => (
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
                <td className={`table-body_row_item ${matchDayOfWeek(tableItem.lessonDay)}`}>
                  {reverseDateForTable(tableItem.startDate)}
                </td>
                <td
                  className={`table-body_row_item ${matchDayOfWeek(tableItem.lessonDay)}`}>{matchDayOfWeek2(tableItem.lessonDay)}</td>
                <td
                  className={`table-body_row_item lesson_number  ${matchDayOfWeek(tableItem.lessonDay)}`}>
                  {tableItem.lessonNumber}
                </td>
                <td
                  className={`table-body_row_item ${matchDayOfWeek(tableItem.lessonDay)}`}>{tableItem.lessonTime}</td>
                <td
                  className={`table-body_row_item ${matchDayOfWeek(tableItem.lessonDay)}`}>{matchLessonTypeAbbreviation(tableItem.typeClassName)}</td>
                <td
                  className={`table-body_row_item ${matchDayOfWeek(tableItem.lessonDay)}`}>{tableItem.disciplineName}</td>
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
                    <div className="card-text">
                      <span
                        className="card-text-key"><b>Дата:</b>
                      </span>
                      {reverseDateForTable(item.startDate)}
                    </div>
                    <div className="card-text">
                      <span
                        className="card-text-key"><b>День:</b></span>{matchDayOfWeek2(item.lessonDay)}
                    </div>
                    <div className="card-text"><span className="card-text-key"><b>Пара:</b></span>{item.lessonNumber}
                    </div>
                    <div className="card-text"><span
                      className="card-text-key"><b>Время:</b></span>{item.lessonTime}</div>
                    <div className="card-text"><span
                      className="card-text-key"><b>Аудитория:</b></span>{item.frame}-{item.location}</div>
                    <div className="card-text"><span className="card-text-key"><b>Группа:</b></span>{item.groupName}
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
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
