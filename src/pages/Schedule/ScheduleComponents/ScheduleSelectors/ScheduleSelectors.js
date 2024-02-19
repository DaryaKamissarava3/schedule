import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomSelect } from '../../../../components/CustomSelect';

import {
  setWeekDay,
  setWeekName,
  setWeekNumber
} from '../../../../store/weekDataSlice';

import { matchDayOfWeek2 } from '../../../../assets/utils/functions';

import './style.css';

const dayOptions = [
  {value: 'MONDAY', label: 'Понедельник'},
  {value: 'TUESDAY', label: 'Вторник'},
  {value: 'WEDNESDAY', label: 'Среда'},
  {value: 'THURSDAY', label: 'Четверг'},
  {value: 'FRIDAY', label: 'Пятница'},
  {value: 'SATURDAY', label: 'Суббота'},
  {value: 'SUNDAY', label: 'Воскресенье'},
  {value: 'ALL', label: 'Все дни'},
];

const weekNumberOptions = [
  {value: 1, label: 1},
  {value: 2, label: 2},
  {value: 3, label: 3},
  {value: 4, label: 4},
  {value: 'все', label: 'все'}
];

export const ScheduleSelectors = ({isCorrespondenceSchedule}) => {
  const weekDay = useSelector((state) => state.weekData.weekDay);
  const currentWeekNumber = useSelector((state) => state.weekData.weekNumber);
  const currentWeekName = useSelector((state) => state.weekData.weekName);

  const [currentWeekDay, setCurrentWeekDay] = useState(matchDayOfWeek2(weekDay));
  const [selectedWeekNumber, setSelectedWeekNumber] = useState(currentWeekNumber);

  const [isCheckedNumerator, setIsCheckedNumerator] = useState(false);
  const [isCheckedDenominator, setIsCheckedDenominator] = useState(false);

  const [isFirstRender, setIsFirstRender] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFirstRender) {
      if (isCorrespondenceSchedule === true) { //для заочников. сначала выводим на всю неделю расписание
        setCurrentWeekDay('Все дни');
        dispatch(setWeekDay('ALL'));
      }

      if (currentWeekName === true) {
        setIsCheckedNumerator(false);
        setIsCheckedDenominator(true);
      } else {
        setIsCheckedNumerator(true);
        setIsCheckedDenominator(false);
      }
      setIsFirstRender(false);
    } else {
      if (currentWeekName === true) {
        setIsCheckedNumerator(false);
        setIsCheckedDenominator(true);
      } else {
        setIsCheckedNumerator(true);
        setIsCheckedDenominator(false);
      }
    }
  }, [currentWeekName]);

  const handleWeekDayChange = (selectedOption) => {
    setCurrentWeekDay(matchDayOfWeek2(selectedOption.value));
    dispatch(setWeekDay(selectedOption.value));
  };

  const handleWeekNumberChange = (selectedOption) => {
    setSelectedWeekNumber(selectedOption.value);
    dispatch(setWeekNumber(selectedOption.value));

    if (selectedOption.value === 'все') {
      setIsCheckedNumerator(false);
      setIsCheckedDenominator(false);
    }
  };

  const handleCheckboxNumerator = () => {
    setIsCheckedNumerator(true);
    setIsCheckedDenominator(false);
    console.log(currentWeekDay)
    dispatch(setWeekName(false));
  }

  const handleCheckboxDenominator = () => {
    setIsCheckedNumerator(false);
    setIsCheckedDenominator(true);
    console.log(currentWeekDay)
    dispatch(setWeekName(true));
  }

  return (
    <div className="schedule-selectors-container">
      <CustomSelect
        options={dayOptions}
        value={{value: currentWeekDay, label: currentWeekDay}}
        onChange={handleWeekDayChange}
        label="Выберите день недели"
      />
      <CustomSelect
        options={weekNumberOptions}
        value={{value: selectedWeekNumber, label: selectedWeekNumber}}
        onChange={handleWeekNumberChange}
        label="Выберите неделю"
        isDisabled={currentWeekDay === 'Все дни'}
      />
      <div className="checkbox-container">
        <label className="checkbox-label_1">
          Числитель/
        </label>
        <input
          className="schedule-checkbox"
          type="checkbox"
          checked={isCheckedNumerator}
          onChange={handleCheckboxNumerator}
          disabled={selectedWeekNumber === 'все' || currentWeekDay === 'Все дни'}
        />
        <label className="checkbox-label_2">
          Знаменатель
        </label>
        <input
          className="schedule-checkbox"
          type="checkbox"
          checked={isCheckedDenominator}
          onChange={handleCheckboxDenominator}
          disabled={selectedWeekNumber === 'все' || currentWeekDay === 'Все дни'}
        />
      </div>
    </div>
  );
};
