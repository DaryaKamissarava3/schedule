import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet} from 'react-router-dom';
import Select from 'react-select';

import {
  clearGroup,
  clearTeacherFio,
  fetchStudentsGroups,
  fetchTeachersFio,
  setGroup,
  setTeacherFio
} from './store/selectsData';

import {fetchStudentsSchedule, fetchTeacherSchedule} from './store/scheduleSlice';
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {fetchWeekDay, fetchWeekName, fetchWeekNumber} from "./store/weekDataSlice";

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: 300,
    marginRight: 20,
    marginTop: 13,
    cursor: 'pointer',
  }),
  menu: (provided) => ({
    ...provided,
    width: 300,
    zIndex: 100,
  }),
};

const Layout = ({children}) => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const teachersData = useSelector((state) => state.selectsData.teachersFio);
  const groupsData = useSelector((state) => state.selectsData.studentsGroups);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeachersFio());
    dispatch(fetchStudentsGroups());
    dispatch(fetchWeekDay());
    dispatch(fetchWeekName());
    dispatch(fetchWeekNumber());
  }, []);

  const handleTeacherChange = (selectedOption) => {
    setSelectedTeacher(selectedOption);
    setSelectedGroup(null);
    dispatch(setTeacherFio(selectedOption.value));
    dispatch(fetchTeacherSchedule("'" + selectedOption.value + "'"));
    dispatch(clearGroup());
  };

  const handleGroupChange = (selectedOption) => {
    setSelectedGroup(selectedOption);
    setSelectedTeacher(null);
    dispatch(setGroup(selectedOption.value));
    dispatch(fetchStudentsSchedule(selectedOption.value));
    dispatch(clearTeacherFio());
  };
  return (
    <div className="container">
      <Header/>
      <div className="selectors">
        <div className="select-container">
          <label htmlFor="teacherSelect" className="select-label">Ф.И.О преподавателя:</label>
          <Select
            id="teacherSelect"
            styles={customStyles}
            options={teachersData.map((teacher) => ({value: teacher.fio, label: teacher.fio}))}
            value={selectedTeacher}
            onChange={handleTeacherChange}
            placeholder="Выберите ФИО преподавателя"
          />
        </div>
        <div className="select-container">
          <label htmlFor="groupSelect" className="select-label">Группа:</label>
          <Select
            id="groupSelect"
            styles={customStyles}
            options={groupsData.map((group) => ({value: group.name, label: group.name}))}
            value={selectedGroup}
            onChange={handleGroupChange}
            placeholder="Выберите группу"
          />
        </div>
      </div>
      <span className="line-break"></span>
      <main className="layout-children">
        {children}
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;