import { FieldValues, SubmitHandler } from 'react-hook-form';
import UMForm from '../../../components/form/UMForm';
import UMInput from '../../../components/form/UMInput';
import { Button } from 'antd';

const studentData = {
  password: 'student123',
  student: {
    name: {
      firstName: 'Mr.Student778',
      middleName: '',
      lastName: 'Good',
    },
    gender: 'male',
    dateOfBirth: '1998-05-15',
    email: 'mrstudent778@gamil.com',
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
    admissionSemester: '66580eb542e81c8dd573724b',
    academicDepartment: '6661df15e7d4c3c5f40417e1',
    profileImg: 'http://example.com/profile2.jpg',
  },
};

const CreateStudent = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);

    const formData = new FormData();

    formData.append('data', JSON.stringify(data));

    //! This is for development
    //! Just for checking
    console.log(Object.fromEntries(formData));
  };

  return (
    <UMForm onSubmit={onSubmit}>
      <UMInput type='text' name='name' label='Name' />
      <Button htmlType='submit'>Submit</Button>
    </UMForm>
  );
};

export default CreateStudent;
