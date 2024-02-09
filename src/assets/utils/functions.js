import {lessonAbbreviations, lessonTime, russianToEnglishWeekdays} from "./arrays";


export const shortenName = (fullName) => {
  if (fullName.includes(',')) {
    const splitNames = fullName.split(',');
    const shortenedNames = splitNames.map(nameSegment => {
      const splitName = nameSegment.trim().split(' ');
      const lastName = splitName[0];
      const firstName = splitName[1].charAt(0);
      const fatherName = splitName[2].charAt(0);
      return `${lastName} ${firstName}.${fatherName}.`;
    });
    return shortenedNames.join(', ');
  } else {
    const splitName = fullName.trim().split(' ');
    const lastName = splitName[0];
    const firstName = splitName[1].charAt(0);
    const fatherName = splitName[2].charAt(0);
    return `${lastName} ${firstName}.${fatherName}.`;
  }
};

export const generateClassName = (typeClassName) => {
  switch (typeClassName) {
    case 'Лекция':
      return 'lecture_row';
    case 'Лабораторная работа':
      return 'lab_work_row';
    case 'Практическая работа':
      return 'practice_row';
  }
};

export const matchDayOfWeek = (lessonDay) => {
  const match = russianToEnglishWeekdays.find((item) => item.dayInRussian === lessonDay);
  return match ? match.dayInEnglish : '';
}

export const matchDayOfWeek2 = (lessonDay) => {
  const match = russianToEnglishWeekdays.find((item) => item.dayInEnglish === lessonDay);
  return match ? match.dayInRussian : '';
}

export const matchLessonTypeAbbreviation = (typeClassName) => {
  const match = lessonAbbreviations.find((item) => item.typeClassName === typeClassName);
  return match ? match.abbreviation : '';
};

export const matchLessonTime = (lessonNumber) => {
  const match = lessonTime.find((item) => item.lessonNumber === lessonNumber);
  return match ? match.lessonTime : '';
}

export const matchWeekName = (weekName) => {
  return weekName === true ? 'Числитель' : 'Знаменатель';
}

export const shortenDisciplineName = (fullName) => {
  const splitName = fullName.split(" ");
  return splitName.map((word) => word.charAt(0).toUpperCase()).join("");
}