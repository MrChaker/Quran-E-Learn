export const meetingSchema = `
  type MeetingType {
    _id: String
    title: String
    teacher: UserType
    date: String
    duration: Int
  }
`;

export const meetingQueries = `
  getMeetings(teachersIDs: [String]): [MeetingType]
  getMeeting(_id: String): MeetingType

`;

export const meetingMutations = `
  planMeeting(title: String, teacherID: String, date: String, duration: Int): MeetingType
  cancelMeeting(_id: String): MeetingType
`;
