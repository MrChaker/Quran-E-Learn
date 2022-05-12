import { createContext, useContext } from 'react';

export type Lesson = {
  lesson?: string;
  setLesson: (Lesson: string) => void;
};
export const LessonContext = createContext<Lesson>({
  lesson: undefined,
  setLesson: () => undefined,
});
export const useLessonContext = () => useContext(LessonContext);
