import { Controller, FieldValues, SubmitHandler } from 'react-hook-form';
import UMForm from '../../../components/form/UMForm';
import UMInput from '../../../components/form/UMInput';
import { Button, Col, Divider, Form, Input, Row } from 'antd';
import UMSelect from '../../../components/form/UMSelect';
import { bloodGroupOptions, genderOptions } from '../../../constants/global';
import UMDatePicker from '../../../components/form/UMDatePicker';
import {
  useGetAcademicDepartmentsQuery,
  useGetAllSemestersQuery,
} from '../../../redux/features/admin/academicManagement.api';
import { useAddStudentMutation } from '../../../redux/features/admin/userManagement.api';

//! This is only for development
//! should be removed
const studentDefaultValues = {
  name: {
    firstName: 'Mr.Student420',
    middleName: '',
    lastName: 'Good',
  },
  gender: 'male',
  email: 'mrstudent420@gamil.com',
  contactNumber: '234-567-8901',
  emergencyContactNo: '876-543-2109',
  bloodGroup: 'A+',
  presentAddress: '789 Oak St, Uptown, UT 56789',
  permanentAddress: '321 Maple St, Oldtown, OT 54321',
  guardian: {
    fatherName: 'Robert Smith',
    fatherOccupation: 'Architect',
    fatherContactNo: '234-567-8902',
    motherName: 'Linda Smith',
    motherOccupation: 'Nurse',
    motherContactNo: '234-567-8903',
  },
  localGuardian: {
    name: 'Michael Johnson',
    occupation: 'Businessman',
    contactNo: '234-567-8904',
    address: '654 Cedar St, Midtown, MT 67890',
  },
  // admissionSemester: '66580eb542e81c8dd573724b',
  // academicDepartment: '6661df15e7d4c3c5f40417e1',
  // profileImg: 'http://example.com/profile2.jpg',
};

const CreateStudent = () => {
  const [addStudent, { data, error }] = useAddStudentMutation();

  console.log({ data, error });

  const { data: sData, isLoading: sIsLoading } =
    useGetAllSemestersQuery(undefined);

  const { data: dData, isLoading: dIsLoading } =
    useGetAcademicDepartmentsQuery(undefined);

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const studentData = {
      password: 'student123',
      student: data,
    };

    const formData = new FormData();

    formData.append('data', JSON.stringify(studentData));
    formData.append('file', data.image);

    addStudent(formData);

    //! This is for development
    //! Just for checking
    console.log(Object.fromEntries(formData));
  };

  return (
    <Row>
      <Col span={24}>
        <UMForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput type='text' name='name.firstName' label='First Name' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput type='text' name='name.middleName' label='Middle Name' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput type='text' name='name.lastName' label='Last Name' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSelect options={genderOptions} name='gender' label='Gender' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMDatePicker name='dateOfBirth' label='Date Of Birth' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSelect
                options={bloodGroupOptions}
                name='bloodGroup'
                label='Blood Group'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name='image'
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label='Picture'>
                    <Input
                      type='file'
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput type='text' name='email' label='Email' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput type='text' name='contactNumber' label='Contact' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type='text'
                name='emergencyContactNo'
                label='Emergency Contact'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type='text'
                name='presentAddress'
                label='Present Address'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type='text'
                name='permanentAddress'
                label='Permanent Address'
              />
            </Col>
          </Row>
          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type='text'
                name='guardian.fatherName'
                label='Father Name'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type='text'
                name='guardian.fatherOccupation'
                label='Father Occupation'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type='text'
                name='guardian.fatherContactNo'
                label='Father Contact No'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type='text'
                name='guardian.motherName'
                label='Mother Name'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type='text'
                name='guardian.motherOccupation'
                label='Mother Occupation'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type='text'
                name='guardian.motherContactNo'
                label='Mother Contact No'
              />
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput type='text' name='localGuardian.name' label='Name' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type='text'
                name='localGuardian.occupation'
                label='Occupation'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type='text'
                name='localGuardian.contactNo'
                label='Contact No'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type='text'
                name='localGuardian.address'
                label='Address'
              />
            </Col>
          </Row>
          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSelect
                options={semesterOptions}
                disabled={sIsLoading}
                name='admissionSemester'
                label='Admission Semester'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSelect
                options={departmentOptions}
                disabled={dIsLoading}
                name='academicDepartment'
                label='Admission Department'
              />
            </Col>
          </Row>
          <Button htmlType='submit'>Submit</Button>
        </UMForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
