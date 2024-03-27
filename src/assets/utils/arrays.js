export const tableHeaderForStudents = ['Пара', 'Время', 'Тип занятия', 'Дисциплина', 'Подгруппа', 'Неделя', 'Числитель / Знаменатель', 'Аудитория', 'Преподаватель'];

export const tableHeaderForTeacher = ['Пара', 'Время', 'Тип занятия', 'Дисциплина', 'Подгруппа', 'Неделя', 'Числитель / Знаменатель', 'Аудитория', 'Группа'];

export const tableHeaderForAllDays = ['\u00A0\u00A0\u00A0\u00A0День\u00A0\u00A0', 'Пара', 'Время', 'Тип занятия', 'Дисциплина', 'Подгруппа', 'Неделя', 'Числитель / Знаменатель', 'Аудитория', 'Преподаватель'];

export const tableHeaderForCorrespondence = ['\u00A0\u00A0Дата\u00A0\u00A0', '\u00A0День\u00A0\u00A0', 'Пара', 'Время', 'Тип занятия', 'Дисциплина', 'Аудитория', 'Преподаватель'];

export const tableHeaderTeacherSession = ['Дата', 'День', 'Время', 'Тип занятий', 'Дисциплина', 'Аудитория', 'Группа'];
export const tableHeaderStudentSession = ['Дата', 'День', 'Время', 'Тип занятий', 'Дисциплина', 'Аудитория', 'Преподаватель'];

export const lessonAbbreviations = [
  {typeClassName: 'Лекция', abbreviation: 'Лекция'},
  {typeClassName: 'Лабораторная работа', abbreviation: 'Лабораторная'},
  {typeClassName: 'Практическая работа', abbreviation: 'Практическая'},
  {typeClassName: 'Экзамен', abbreviation: 'Экзамен'},
  {typeClassName: 'Консультация', abbreviation: 'Консультация'},
  {typeClassName: 'Зачёт', abbreviation: 'Зачёт'},
  {typeClassName: 'Защита курсовой', abbreviation: 'Защита курсовой'},
];

export const lessonTimes = [
  {lessonNumber: 1, lessonTime: '8:00 - 9:35'},
  {lessonNumber: 2, lessonTime: '9:50 - 11:25'},
  {lessonNumber: 3, lessonTime: '11:40 - 13:15'},
  {lessonNumber: 4, lessonTime: '14:00 - 15:35'},
  {lessonNumber: 5, lessonTime: '15:45 - 17:25'},
  {lessonNumber: 6, lessonTime: '17:30 - 19:05'},
  {lessonNumber: 7, lessonTime: '19:15 - 20:50'},
];

export const russianToEnglishWeekdays = [
  {dayInRussian: 'Понедельник', dayInEnglish: 'MONDAY'},
  {dayInRussian: 'Вторник', dayInEnglish: 'TUESDAY'},
  {dayInRussian: 'Среда', dayInEnglish: 'WEDNESDAY'},
  {dayInRussian: 'Четверг', dayInEnglish: 'THURSDAY'},
  {dayInRussian: 'Пятница', dayInEnglish: 'FRIDAY'},
  {dayInRussian: 'Суббота', dayInEnglish: 'SATURDAY'},
  {dayInRussian: 'Воскресенье', dayInEnglish: 'SUNDAY'},
];

export const russianToEnglishScheduleTypes = [
  {typeInRussian: 'Обычное', typeInEnglish: 'ordinary-schedule'},
  {typeInRussian: 'Сессия', typeInEnglish: 'session-schedule'},
];
