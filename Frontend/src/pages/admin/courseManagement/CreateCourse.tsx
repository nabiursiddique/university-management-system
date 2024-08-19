import { FieldValues, SubmitHandler } from 'react-hook-form';
import UMForm from '../../../components/form/UMForm';
import { Button, Col, Flex } from 'antd';
import UMSelect from '../../../components/form/UMSelect';
import UMInput from '../../../components/form/UMInput';
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from '../../../redux/features/admin/courseManagement';
import { TResponse } from '../../../types';
import { toast } from 'sonner';

const CreateCourse = () => {
  const [createCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating.....');

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses?.map((item) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    console.log(courseData);

    try {
      const res = (await createCourse(courseData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success('Semester Created Successfully', { id: toastId });
      }
    } catch (err) {
      toast.error('Something went wrong', { id: toastId });
    }
  };

  return (
    <Flex justify='center' align='center'>
      <Col span={6}>
        <UMForm onSubmit={onSubmit}>
          <UMInput type='text' name='title' label='Title' />
          <UMInput type='text' name='prefix' label='Prefix' />
          <UMInput type='text' name='code' label='Code' />
          <UMInput type='text' name='credits' label='Credits' />
          <UMSelect
            mode='multiple'
            options={preRequisiteCoursesOptions}
            name='preRequisiteCourses'
            label='Prerequisite Courses'
          />

          <Button htmlType='submit'>Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
