import { createContext, useContext } from 'react';
import { LessonInterface } from '../../BackEnd/Utils/interfaces/lessonsInterface';

export type Lesson = {
  lesson?: LessonInterface;
  setLesson: (lesson: LessonInterface) => void;
};
export const LessonCentext = createContext<Lesson>({
  lesson: undefined,
  setLesson: () => undefined,
});
export const useLessonContext = () => useContext(LessonCentext);
