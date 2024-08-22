import { useParams } from 'react-router-dom';
import {
  useAddMarkMutation,
  useGetAllFacultyCoursesQuery,
} from '../../redux/features/faculty/facultyCourses.api';
import { Button, Modal, Table } from 'antd';
import { useState } from 'react';
import UMForm from '../../components/form/UMForm';
import UMInput from '../../components/form/UMInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const MyStudents = () => {
  const { registerSemesterId, courseId } = useParams();

  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery([
    { name: 'semesterRegistration', value: registerSemesterId },
    { name: 'course', value: courseId },
  ]);

  console.log(facultyCoursesData);

  const tableData = facultyCoursesData?.data?.map(
    ({ _id, student, semesterRegistration, offeredCourse }) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
    })
  );

  const columns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Roll',
      key: 'roll',
      dataIndex: 'roll',
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];
  return <Table columns={columns} dataSource={tableData} />;
};

const AddMarksModal = ({ studentInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarkMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const studentMark = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };
    console.log(studentMark);
    const res = await addMark(studentMark);
    console.log(res);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title='Basic Modal'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <UMForm onSubmit={handleSubmit}>
          <UMInput type='text' name='classTest1' label='Class Test 1' />
          <UMInput type='text' name='classTest2' label='Class Test 2' />
          <UMInput type='text' name='midTerm' label='Mid Term' />
          <UMInput type='text' name='finalTerm' label='Final' />
          <Button htmlType='submit'>Submit</Button>
        </UMForm>
      </Modal>
    </>
  );
};

export default MyStudents;
