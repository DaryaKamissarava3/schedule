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
];

const weekNumberOptions = [
  {value: 1, label: 1},
  {value: 2, label: 2},
  {value: 3, label: 3},
  {value: 4, label: 4},
  {value: 'все', label: 'все'}
];

export const ScheduleSelectors = () => {
  const weekDay = useSelector((state) => state.weekData.weekDay);
  const currentWeekNumber = useSelector((state) => state.weekData.weekNumber);
  const currentWeekName = useSelector((state) => state.weekData.weekName);

  const [currentWeekDay, setCurrentWeekDay] = useState(matchDayOfWeek2(weekDay));
  const [selectedWeekNumber, setSelectedWeekNumber] = useState(currentWeekNumber);

  const [isCheckedNumerator, setIsCheckedNumerator] = useState(false);
  const [isCheckedDenominator, setIsCheckedDenominator] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentWeekName === true) {
      setIsCheckedNumerator(true);
      setIsCheckedDenominator(false);
    } else {
      setIsCheckedNumerator(false);
      setIsCheckedDenominator(true);
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
    dispatch(setWeekName(true));
  }

  const handleCheckboxDenominator = () => {
    setIsCheckedNumerator(false);
    setIsCheckedDenominator(true);
    dispatch(setWeekName(false));
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
          disabled={selectedWeekNumber === 'все'}
        />
        <label className="checkbox-label_2">
          Знаменатель
        </label>
        <input
          className="schedule-checkbox"
          type="checkbox"
          checked={isCheckedDenominator}
          onChange={handleCheckboxDenominator}
          disabled={selectedWeekNumber === 'все'}
        />
      </div>
    </div>
  );
};
