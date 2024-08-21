import { useGetAllOfferedCoursesQuery } from '../../redux/features/student/studentCourseManagement.api';

const OfferedCourse = () => {
  const { data } = useGetAllOfferedCoursesQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1>This is offered course component</h1>
    </div>
  );
};

export default OfferedCourse;
