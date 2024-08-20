import { Button, Col, Flex } from 'antd';
import UMForm from '../../../components/form/UMForm';
import UMInput from '../../../components/form/UMInput';
import { useGetAcademicFacultiesQuery } from '../../../redux/features/admin/academicManagement.api';
import UMSelectWithWatch from '../../../components/form/UMSelectWithWatch';
import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const OfferCourse = () => {
  const [id, setId] = useState('');

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const academicSemesterOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex justify='center' align='center'>
      <Col span={6}>
        <UMForm onSubmit={onSubmit}>
          <UMSelectWithWatch
            onValueChange={setId}
            label='Academic Semester'
            name='academicSemester'
            options={academicSemesterOptions}
          />
          <UMInput disabled={!id} type='text' name='test' label='test' />
          <Button htmlType='submit'>Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
