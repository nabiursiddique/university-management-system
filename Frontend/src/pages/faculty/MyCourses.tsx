import { Button, Col, Flex } from 'antd';
import UMForm from '../../components/form/UMForm';
import UMSelect from '../../components/form/UMSelect';
import { useGetAllFacultyCoursesQuery } from '../../redux/features/faculty/facultyCourses.api';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const MyCourses = () => {
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);
  const navigate = useNavigate();

  console.log(facultyCoursesData);

  const semesterOptions = facultyCoursesData?.data?.map((item) => ({
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    value: item.semesterRegistration._id,
  }));

  const courseOptions = facultyCoursesData?.data?.map((item) => ({
    label: item.course.title,
    value: item.course._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };

  return (
    <Flex justify='center' align='center'>
      <Col span={6}>
        <UMForm onSubmit={onSubmit}>
          <UMSelect
            options={semesterOptions}
            name='semesterRegistration'
            label='Semester'
          />
          <UMSelect options={courseOptions} name='course' label='Course' />
          <Button htmlType='submit'>Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};

export default MyCourses;
