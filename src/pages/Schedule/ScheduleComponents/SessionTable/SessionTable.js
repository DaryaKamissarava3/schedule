import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {
  tableHeaderStudentSession,
  tableHeaderTeacherSession
} from "../../../../assets/utils/arrays";
import noLessons from "../../../../assets/images/no-lessons.svg";
import {
  generateClassName, matchDayOfWeek2, matchLessonTime, reverseDateForTable,
} from '../../../../assets/utils/functions';
import noLessonsSmall from "../../../../assets/images/no-lesson-small.svg";


export const SessionTable = ({isStudentSession}) => {
  const teacherSessionData = useSelector((state) => state.schedule.teacherScheduleSessionData);
  const studentSessionData = useSelector((state) => state.schedule.studentsScheduleSessionData);

  const [filteredSchedule, setFilteredSchedule] = useState([]);

  useEffect(() => {
    const data = filterSchedule(studentSessionData);
    setFilteredSchedule(data);
  }, [studentSessionData]);

  const filterSchedule = (array) => {
    const sortedArray=[...array].sort((a, b) =>new Date(a.startDate) - new Date(b.startDate));

    return sortedArray;
  };


  return (
    <>
      <div className="schedule-table-block">
        <table className="schedule-table">
          <thead className="table-header">
          <tr className="table-header_row">
            {isStudentSession ?
              tableHeaderStudentSession.map((name, index) => (
                <th className="table-header_item" key={index}>
                  {name}
                </th>
              ))
              :
              tableHeaderTeacherSession.map((name, index) => (
                <th className="table-header_item" key={index}>
                  {name}
                </th>
              ))
            }

          </tr>
          </thead>
          <tbody>
          {!isStudentSession && teacherSessionData.length === 0 ? (
            <tr>
              <td colSpan="10" className="table-body_row_item no_lessons">
                <img className="no-lesson-img" src={noLessons} alt="Экзаменов нет"/>
              </td>
            </tr>
          ) : (
            isStudentSession ?
              filteredSchedule.map((tableItem) => (
                <tr className="table-body_row" key={tableItem.id}>
                  <td className="table-body_row_item">
                    {reverseDateForTable(tableItem.startDate)}
                  </td>
                  <td className="table-body_row_item">
                    {matchDayOfWeek2(tableItem.lessonDay)}
                  </td>
                  <td className="table-body_row_item lesson_number">
                    {matchLessonTime(tableItem.lessonNumber)}
                  </td>
                  <td className="table-body_row_item">{tableItem.typeClassName}</td>
                  <td className="table-body_row_item">{tableItem.disciplineName}</td>
                  <td className="table-body_row_item">{tableItem.frame}-{tableItem.location}</td>
                  <td className="table-body_row_item">{tableItem.teacherFio}</td>
                </tr>
              ))
              :
              teacherSessionData.map((tableItem) => (
                <tr className="table-body_row" key={tableItem.id}>
                  <td className="table-body_row_item">
                    {reverseDateForTable(tableItem.startDate)}
                  </td>
                  <td className="table-body_row_item">
                    {matchDayOfWeek2(tableItem.lessonDay)}
                  </td>
                  <td className="table-body_row_item lesson_number">
                    {matchLessonTime(tableItem.lessonNumber)}
                  </td>
                  <td className="table-body_row_item">{tableItem.typeClassName}</td>
                  <td className="table-body_row_item">{tableItem.disciplineName}</td>
                  <td className="table-body_row_item">{tableItem.frame}-{tableItem.location}</td>
                  <td className="table-body_row_item">{tableItem.groupName}</td>
                </tr>
              ))
          )}
          </tbody>
        </table>
      </div>
      <div className="schedule-table_mobile">
        <div className="mobile-table-container">
          {teacherSessionData.length === 0 ? (
            <div className="mobile-table-block">
              <img className="no-lesson-img" src={noLessonsSmall} alt="Экзаменов нет"/>
            </div>
          ) : (
            teacherSessionData.map((item) => (
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
                    </div>
                    <div className="card-text"><span className="card-text-key"><b>Группа:</b></span>
                      {item.groupName}
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
