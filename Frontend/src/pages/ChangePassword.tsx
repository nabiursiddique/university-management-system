import { Button, Row } from 'antd';
import UMForm from '../components/form/UMForm';
import UMInput from '../components/form/UMInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useChangePasswordMutation } from '../redux/features/admin/userManagement.api';
import { TResponse } from '../types';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const res = (await changePassword(data)) as TResponse<any>;
    if (res?.data?.success) {
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <Row justify='center' align='middle' style={{ height: '100vh' }}>
      <UMForm onSubmit={onSubmit}>
        <UMInput type='text' name='oldPassword' label='Old Password' />
        <UMInput type='text' name='newPassword' label='New Password' />
        <Button htmlType='submit'>Submit</Button>
      </UMForm>
    </Row>
  );
};

export default ChangePassword;
