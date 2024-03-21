import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Select from 'react-select';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import {
  clearCorrespondenceGroup,
  clearGroup,
  clearTeacherFio,
  fetchCorrespondenceStudentsGroups,
  fetchStudentsGroups,
  fetchTeachersFio,
  setCorrespondenceGroup,
  setGroup,
  setTeacherFio
} from './store/selectsData';
import { fetchStudentsSchedule, fetchTeacherSchedule } from './store/scheduleSlice';
import {clearScheduleType, fetchWeekDay, fetchWeekName, fetchWeekNumber} from './store/weekDataSlice';

const Layout = ({ children }) => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedCorrespondenceGroup, setSelectedCorrespondenceGroup] = useState(null);

  const teachersData = useSelector((state) => state.selectsData.teachersFio);
  const groupsData = useSelector((state) => state.selectsData.studentsGroups);
  const correspondenceGroupsData = useSelector((state) => state.selectsData.correspondenceGroups);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCorrespondenceStudentsGroups());
    dispatch(fetchTeachersFio());
    dispatch(fetchStudentsGroups());
    dispatch(fetchWeekDay());
    dispatch(fetchWeekName());
    dispatch(fetchWeekNumber());
  }, []);

  const handleTeacherChange = (selectedOption) => {
    setSelectedTeacher(selectedOption);
    setSelectedGroup(null);
    setSelectedCorrespondenceGroup(null);
    dispatch(setTeacherFio(selectedOption.value));
    dispatch(fetchTeacherSchedule("'" + selectedOption.value + "'"));
    dispatch(clearGroup());
    dispatch(clearCorrespondenceGroup());
    dispatch(clearScheduleType());
  };

  const handleGroupChange = (selectedOption) => {
    setSelectedGroup(selectedOption);
    setSelectedTeacher(null);
    setSelectedCorrespondenceGroup(null);
    dispatch(setGroup(selectedOption.value));
    dispatch(fetchStudentsSchedule(selectedOption.value));
    dispatch(clearTeacherFio());
    dispatch(clearCorrespondenceGroup());
    dispatch(clearScheduleType());
  };

  const handleCorrespondenceGroupChange = (selectedOption) => {
    setSelectedCorrespondenceGroup(selectedOption);
    setSelectedTeacher(null);
    setSelectedGroup(null);
    dispatch(setCorrespondenceGroup(selectedOption.value));
    dispatch(fetchStudentsSchedule(selectedOption.value));
    dispatch(clearTeacherFio());
    dispatch(clearGroup());
    dispatch(clearScheduleType());
  };

  const sortTeachersFio = (teachersData) => {
    return teachersData.map((teacher) => ({
      value: teacher.fio,
      label: teacher.fio,
    })).sort((a, b) => a.label.localeCompare(b.label));
  };

  const sortGroupsName = (groupsData) => {
    return groupsData.map((group) => ({
      value: group.name,
      label: group.name,
    })).sort((a, b) => a.label.localeCompare(b.label));
  };

  return (
    <div className="container">
      <Header/>
      <div className="selectors">
        <div className="select-container">
          <label htmlFor="teacherSelect" className="select-label">Ф.И.О преподавателя:</label>
          <Select
            id="teacherSelect"
            className="teacher-select"
            options={sortTeachersFio(teachersData)}
            value={selectedTeacher}
            onChange={handleTeacherChange}
            placeholder="Выберите ФИО преподавателя"
          />
        </div>
        <div className="select-container">
          <label htmlFor="groupSelect" className="select-label">Дневная форма обучения (группа):</label>
          <Select
            id="groupSelect"
            className="group-select"
            options={sortGroupsName(groupsData)}
            value={selectedGroup}
            onChange={handleGroupChange}
            placeholder="Выберите группу"
          />
        </div>
        <div className="select-container">
          <label htmlFor="correspondenceGroupSelect" className="select-label">Заочная форма обучения (группа):</label>
          <Select
            id="correspondenceGroupSelect"
            className="group-select"
            options={sortGroupsName(correspondenceGroupsData)}
            value={selectedCorrespondenceGroup}
            onChange={handleCorrespondenceGroupChange}
            placeholder="Выберите группу"
          />
        </div>
      </div>
      <span className="line-break"></span>
      <main className="layout-children">
        {children}
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;