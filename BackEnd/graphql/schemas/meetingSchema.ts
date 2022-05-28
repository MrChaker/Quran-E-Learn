export const meetingSchema = `
  type MeetingType {
    _id: String
    title: String
    teacher: UserType
    date: String
  }
`;

export const meetingQueries = `
  getMeetings(teachersIDs: [String]): [MeetingType]
  getMeeting(_id: String): MeetingType

`;

export const meetingMutations = `
  planMeeting(title: String, teacherID: String, date: String): MeetingType
  cancelMeeting(_id: String): MeetingType
`;
