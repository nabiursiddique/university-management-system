import { FieldValues, SubmitHandler } from 'react-hook-form';
import UMForm from '../../../components/form/UMForm';
import { Button, Col, Flex } from 'antd';
import UMSelect from '../../../components/form/UMSelect';
import { semesterStatusOptions } from '../../../constants/semester';
import { toast } from 'sonner';
import { useGetAllSemestersQuery } from '../../../redux/features/admin/academicManagement.api';
import UMDatePicker from '../../../components/form/UMDatePicker';
import UMInput from '../../../components/form/UMInput';
import { useAddRegisteredSemesterMutation } from '../../../redux/features/admin/courseManagement';
import { TResponse } from '../../../types';

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemester } = useGetAllSemestersQuery([
    { name: 'sort', value: 'year' },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating.....');

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    console.log(semesterData);

    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
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
          <UMSelect
            label='Academic Semester'
            name='academicSemester'
            options={academicSemesterOptions}
          />

          <UMSelect
            label='Status'
            name='status'
            options={semesterStatusOptions}
          />

          <UMDatePicker name='startDate' label='Start Date' />
          <UMDatePicker name='endDate' label='End Date' />
          <UMInput type='text' name='minCredit' label='Min Credit' />
          <UMInput type='text' name='maxCredit' label='Max Credit' />

          <Button htmlType='submit'>Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
