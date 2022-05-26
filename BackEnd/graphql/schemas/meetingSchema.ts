export const meetingSchema = `
  type MeetingType {
    _id: String
    title: String
    teacher: UserType
    data: String
  }
`;

export const meetingQueries = `
  getMeetings(teacherID: String): [MeetingType]
  getMeeting(_id: String): MeetingType

`;

export const meetingMutations = `
  planMeeting(title: String, teacherID: String, date: String): MeetingType
`;
