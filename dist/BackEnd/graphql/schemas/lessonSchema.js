"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonMutations = exports.lessonQueries = exports.lessonSchema = void 0;
const chapter = `
  name: String,
  content: String,
  video: String
`;
exports.lessonSchema = `
  type ChapterType {
    ${chapter}
  }
  input ChapterInput {
    ${chapter}
  }
  type LessonType{
    title: String,
    chapters: [ChapterType],
    thumbnail: String
    teacher: UserType
  }
`;
exports.lessonQueries = `
  getLessons(userID: String, forTeacher: Boolean): [LessonType]
  getLesson(title: String chapter: Int): LessonType
  getChapters(title: String): LessonType
`;
exports.lessonMutations = `
  createLesson(title: String, chapters: [ChapterInput], thumbnail: String ,teacherID: String): LessonType
  deleteLesson(title: String): LessonType
`;
