import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  tableHeaderStudentSession,
  tableHeaderTeacherSession
} from '../../../../assets/utils/arrays';
import noLessons from '../../../../assets/images/no-lessons.svg';
import {
  generateClassName, matchDayOfWeek, matchDayOfWeek2, matchLessonTime, reverseDateForTable, shortenName,
} from '../../../../assets/utils/functions';
import noLessonsSmall from '../../../../assets/images/no-lesson-small.svg';
import {Link} from "react-router-dom";
import {fetchStudentsSchedule, fetchTeacherSchedule} from "../../../../store/scheduleSlice";
import {
  clearCorrespondenceGroup,
  clearGroup,
  clearTeacherFio,
  setGroup,
  setTeacherFio
} from "../../../../store/selectsData";
import {setScheduleType} from "../../../../store/weekDataSlice";


export const SessionTable = ({isStudentSession}) => {
  const teacherSessionData = useSelector((state) => state.schedule.teacherScheduleSessionData);
  const studentSessionData = useSelector((state) => state.schedule.studentsScheduleSessionData);

  const [filteredSchedule, setFilteredSchedule] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isStudentSession) {
      const data = filterSchedule(studentSessionData);
      setFilteredSchedule(data);
    } else {
      const data = filterSchedule(teacherSessionData);
      setFilteredSchedule(data);
    }
  }, [studentSessionData, teacherSessionData]);

  const filterSchedule = (array) => {
    const sortedArray = [...array].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    return sortedArray;
  };

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
    dispatch(setScheduleType('session-schedule'));
  }
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
    dispatch(setScheduleType('session-schedule'));
  }

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
                <tr key={tableItem.id} className={`table-body_row ${generateClassName(tableItem.typeClassName)}`}>
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
                  {
                    generateTeacherLinks(tableItem.teacherFio, tableItem.lessonDay)
                  }
                </tr>
              ))
              :
              teacherSessionData.map((tableItem) => (
                <tr key={tableItem.id} className={`table-body_row ${generateClassName(tableItem.typeClassName)}`}>
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
                  {generateGroupsLinks(tableItem.groupName)}
                </tr>
              ))
          )}
          </tbody>
        </table>
      </div>
      <div className="schedule-table_mobile">
        <div className="mobile-table-container">
          {!isStudentSession && teacherSessionData.length === 0 ? (
            <div className="mobile-table-block">
              <img className="no-lesson-img" src={noLessonsSmall} alt="Экзаменов нет"/>
            </div>
          ) : (
            isStudentSession ?
              studentSessionData.map((item) => (
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
                        className="card-text-key"><b>Время:</b></span>{matchLessonTime(item.lessonNumber)}</div>
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
              :
              teacherSessionData.map((item) => (
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
                        className="card-text-key"><b>Время:</b></span>{matchLessonTime(item.lessonNumber)}</div>
                      <div className="card-text"><span
                        className="card-text-key"><b>Аудитория:</b></span>{item.frame}-{item.location}</div>
                    </div>
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
                  </div>
                </div>

              ))
          )}
        </div>
      </div>
    </>
  );
};
