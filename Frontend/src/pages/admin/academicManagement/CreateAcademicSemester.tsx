import { FieldValues, SubmitHandler } from 'react-hook-form';
import UMForm from '../../../components/form/UMForm';
import { Button, Col, Flex } from 'antd';
import UMSelect from '../../../components/form/UMSelect';
import { semesterOptions } from '../../../constants/semester';
import { monthOptions } from '../../../constants/global';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicSemesterSchema } from '../../../schemas/academicManagement.schema';

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    console.log(semesterData);
  };

  return (
    <Flex justify='center' align='center'>
      <Col span={6}>
        <UMForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <UMSelect label='Name' name='name' options={semesterOptions} />
          <UMSelect label='Year' name='year' options={yearOptions} />
          <UMSelect
            label='Start Month'
            name='startMonth'
            options={monthOptions}
          />
          <UMSelect label='End Month' name='endMonth' options={monthOptions} />

          <Button htmlType='submit'>Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
