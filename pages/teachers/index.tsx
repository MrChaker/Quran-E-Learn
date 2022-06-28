import TeachersList from '../../FrontEnd/components/teachers/TeachersList';

const Teachers = ({ ...props }) => {
  if (!props.user) return <></>;
  return <TeachersList user={props.user} />;
};

export default Teachers;
