import { Button, Col, Flex } from 'antd';
import { FieldValues, SubmitHandler } from 'react-hook-form';

import { useState } from 'react';

import moment from 'moment';
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
} from '../../../redux/features/admin/courseManagement';
import {
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
} from '../../../redux/features/admin/academicManagement.api';
import { weekDaysOptions } from '../../../constants/global';
import UMForm from '../../../components/form/UMForm';
import UMSelect from '../../../components/form/UMSelect';
import UMSelectWithWatch from '../../../components/form/UMSelectWithWatch';
import UMInput from '../../../components/form/UMInput';
import UMTimePicker from '../../../components/form/UMTimePicker';

const OfferCourse = () => {
  const [courseId, setCourseId] = useState('');

  const [addOfferedCourse] = useCreateOfferedCourseMutation();

  const { data: semesterRegistrationData } = useGetAllRegisteredSemestersQuery([
    { name: 'sort', value: 'year' },
    { name: 'status', value: 'UPCOMING' },
  ]);

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const { data: academicDepartmentData } =
    useGetAcademicDepartmentsQuery(undefined);

  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  const courseOptions = coursesData?.data?.map(
    (item: { _id: string; title: string }) => ({
      value: item._id,
      label: item.title,
    })
  );

  const facultiesOptions = facultiesData?.data?.faculties?.map(
    (item: { _id: string; fullName: string }) => ({
      value: item._id,
      label: item.fullName,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format('HH:mm'),
      endTime: moment(new Date(data.endTime)).format('HH:mm'),
    };

    const res = await addOfferedCourse(offeredCourseData);
    console.log(res);
  };

  return (
    <Flex justify='center' align='center'>
      <Col span={6}>
        <UMForm onSubmit={onSubmit}>
          <UMSelect
            name='semesterRegistration'
            label='Semester Registrations'
            options={semesterRegistrationOptions}
          />
          <UMSelect
            name='academicFaculty'
            label='Academic Faculty'
            options={academicFacultyOptions}
          />
          <UMSelect
            name='academicDepartment'
            label='Academic Department'
            options={academicDepartmentOptions}
          />
          <UMSelectWithWatch
            onValueChange={setCourseId}
            options={courseOptions}
            name='course'
            label='Course'
          />
          <UMSelect
            disabled={!courseId || fetchingFaculties}
            name='faculty'
            label='Faculty'
            options={facultiesOptions}
          />
          <UMInput type='text' name='section' label='Section' />
          <UMInput type='text' name='maxCapacity' label='Max Capacity' />
          <UMSelect
            mode='multiple'
            options={weekDaysOptions}
            name='days'
            label='Days'
          />
          <UMTimePicker name='startTime' label='Start Time' />
          <UMTimePicker name='endTime' label='End Time' />

          <Button htmlType='submit'>Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
