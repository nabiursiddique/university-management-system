import { Button, Modal, Table } from 'antd';
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from '../../../redux/features/admin/courseManagement';
import { useState } from 'react';
import UMForm from '../../../components/form/UMForm';
import UMSelect from '../../../components/form/UMSelect';
import { useGetAllFacultiesQuery } from '../../../redux/features/admin/userManagement.api';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const Courses = () => {
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix}${code}`,
  }));

  const columns = [
    {
      title: 'Title',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'Code',
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
    />
  );
};

const AddFacultyModal = ({ facultyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [addFaculties] = useAddFacultiesMutation();

  const facultiesOption = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };
    addFaculties(facultyData);
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
          <UMSelect
            mode='multiple'
            options={facultiesOption}
            name='faculties'
            label='Faculty'
          />
          <Button htmlType='submit'>Submit</Button>
        </UMForm>
      </Modal>
    </>
  );
};

export default Courses;
