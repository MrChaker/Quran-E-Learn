const chapter = `
  name: String,
  content: String,
  video: String
`;
export const lessonSchema = `
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
export const lessonQueries = `
  getLessons: [LessonType]
  getLesson(title: String): LessonType
`;
export const lessonMutations = `
  createLesson(title: String, chapters: [ChapterInput], thumbnail: String ,teacherID: String): LessonType
`;
