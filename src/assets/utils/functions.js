import {lessonAbbreviations, lessonTimes, russianToEnglishScheduleTypes, russianToEnglishWeekdays} from './arrays';

export const reverseDateForTable = (date) => {
  if (date === null) {
    return '';
  }

  return date.split('-').reverse().join('.');
}

export const filterSchedule = (day, week, name, scheduleArray) => {
  if (day === 'ALL') {
    const dayOrder = {};
    russianToEnglishWeekdays.forEach((day, index) => {
      dayOrder[day.dayInRussian] = index + 1;
    });

    return scheduleArray
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
  } else {
    return scheduleArray.filter(item => {
      if (week === 'все') {
        return (item.lessonDay === day);
      } else {
        return (
          item.lessonDay === day &&
          (item.weekNumber === null || item.weekNumber === week) &&
          (item.numerator === null ||
            (name === true ? item.numerator === false : item.numerator === true))
        );
      }
    }).slice().sort((a, b) => a.lessonNumber - b.lessonNumber);
  }
};

export const mergeObjectsWithSameValues = (schedule, studentSchedule) => {//обьединение обьектов с одинаковыми полями(разные аудитории и преподаватели)
  const mergedSchedule = [];
  if (studentSchedule) {
    schedule.forEach((item) => {
      const existingItem = mergedSchedule.find((mergedItem) => (
        mergedItem.lessonDay === item.lessonDay &&
        mergedItem.lessonNumber === item.lessonNumber &&
        mergedItem.lessonTime === item.lessonTime &&
        mergedItem.typeClassName === item.typeClassName &&
        mergedItem.disciplineName === item.disciplineName &&
        mergedItem.groupName === item.groupName
      ));

      if (existingItem) {
        const locations = existingItem.location.split(', ');
        if (!locations.includes(item.location)) {
          existingItem.location += `, ${item.location}`;
        }

        const teachers = existingItem.teacherFio.split(', ');
        if (!teachers.includes(item.teacherFio)) {
          existingItem.teacherFio += `, ${item.teacherFio}`;
        }
      } else {
        mergedSchedule.push({...item});
      }
    });
  } else {
    schedule.forEach((item) => {
      const existingItem = mergedSchedule.find((mergedItem) => (
        mergedItem.lessonDay === item.lessonDay &&
        mergedItem.lessonNumber === item.lessonNumber &&
        mergedItem.lessonTime === item.lessonTime &&
        mergedItem.typeClassName === item.typeClassName &&
        mergedItem.disciplineName === item.disciplineName &&
        mergedItem.frame === item.frame &&
        mergedItem.location === item.location
      ));

      if (existingItem) {
        const groups = existingItem.groupName.split(', ');
        if (!groups.includes(item.groupName)) {
          existingItem.groupName += `, ${item.groupName}`;
        }
      } else {
        mergedSchedule.push({...item});
      }
    });
  }

  return mergedSchedule;
};

export const shortenName = (fullName) => {
  const splitName = fullName.trim().split(' ');
  const lastName = splitName[0];
  const firstName = splitName[1].charAt(0);
  const fatherName = splitName[2].charAt(0);
  return `${lastName} ${firstName}.${fatherName}.`;
};

export const generateClassName = (typeClassName) => {
  switch (typeClassName) {
    case 'Лекция':
      return 'lecture_row';
    case 'Лабораторная работа':
      return 'lab_work_row';
    case 'Практическая работа':
      return 'practice_row';
    case 'Консультация':
      return 'consultation_row';
    case 'Экзамен':
      return 'exam_row';
  }
};

export const matchScheduleType=(scheduleType)=>{
  const match = russianToEnglishScheduleTypes.find((item) => item.typeInEnglish === scheduleType);
  return match ? match.typeInRussian : '';
}

export const matchDayOfWeek = (lessonDay) => {
  const match = russianToEnglishWeekdays.find((item) => item.dayInRussian === lessonDay);
  return match ? match.dayInEnglish : '';
}

export const matchDayOfWeek2 = (lessonDay) => {
  const match = russianToEnglishWeekdays.find((item) => item.dayInEnglish === lessonDay);
  return match ? match.dayInRussian : 'Все дни';
}

export const matchLessonTypeAbbreviation = (typeClassName) => {
  const match = lessonAbbreviations.find((item) => item.typeClassName === typeClassName);
  return match ? match.abbreviation : '';
};

export const matchLessonTime = (lessonNumber) => {
  const match = lessonTimes.find((item) => item.lessonNumber === lessonNumber);
  return match ? match.lessonTime : '';
}

export const matchWeekName = (weekName) => {
  return weekName === true ? 'Числитель' : 'Знаменатель';
}

export const shortenDisciplineName = (fullName) => {
  const splitName = fullName.split(" ");
  return splitName.map((word) => word.charAt(0).toUpperCase()).join("");
}

export const matchSelectScheduleType = (type) => {
  return type === 'ordinary-schedule' ? 'Обычное' : 'Сессия';
}
