export interface LessonInterface {
  title?: string;
  chapters?: {
    name: string;
    content: string;
    video: string;
  }[];
  thumbnail?: string;
  teacher?: string;
}
