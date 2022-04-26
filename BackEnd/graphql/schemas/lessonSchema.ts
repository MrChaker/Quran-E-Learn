export const lessonSchema = `
  type LessonType{
    title: String!,
    chapter: [String],
    thumbnail: String!
    teacher: UserType
  }
`;
export const lessonQueries = `
  getLessons: [LessonType]
  getLesson(title: String): LessonType
`;
export const lessonMutations = `
  createLesson(title: String, chapter: String, thumbnail: String ,teacherID: String): LessonType
`;
