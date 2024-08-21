import { Button, Row } from 'antd';
import { FieldValues } from 'react-hook-form';
import { useAppDispatch } from '../redux/hooks';
import { setUser, TUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import authApi from '../redux/features/auth/authApi';
import UMForm from '../components/form/UMForm';
import UMInput from '../components/form/UMInput';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     userId: "A-0001",
  //     password: "admin123",
  //   },
  // });

  const defaultValues = {
    userId: '2031020002',
    password: 'student1234',
  };

  const [login] = authApi.useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading('Logging In');
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success('Logged In', { id: toastId, duration: 2000 });

      if (res.data.needsPasswordChange) {
        navigate(`/change-password`);
      } else {
        navigate(`/${user.role}/dashboard`);
      }
    } catch (err) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify='center' align='middle' style={{ height: '100vh' }}>
      <UMForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <UMInput type='text' name='userId' label='ID:' />
        <UMInput type='text' name='password' label='Password' />
        <Button htmlType='submit'>Submit</Button>
      </UMForm>
    </Row>
  );
};

export default Login;
