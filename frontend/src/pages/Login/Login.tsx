import { Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { StyledContainer, StyledCard, StyledTitle, StyledButton } from './styled';

interface IForm {
  login: string;
  password: string;
  remember: boolean;
}

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, signin } = useAuth();

  const from = (location as any).state?.from?.pathname || '/';

  const onFinish = (values: IForm) => {
    // event.preventDefault();

    // let formData = new FormData(event.currentTarget);
    // let username = formData.get("username") as string;

    const user = {
      email: values.login,
      password: values.password,
    };

    signin(user, () => {
      //   // Send them back to the page they tried to visit when they were
      //   // redirected to the login page. Use { replace: true } so we don't create
      //   // another entry in the history stack for the login page.  This means that
      //   // when they get to the protected page and click the back button, they
      //   // won't end up back on the login page, which is also really nice for the
      //   // user experience.
      navigate(from, { replace: true });
    });
  };

  return (
    <StyledContainer>
      <StyledCard>
        <StyledTitle level={4}>Авторизация</StyledTitle>
        <Form name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="login" rules={[{ required: true, message: 'Введите логин!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Логин" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль!' }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Запомнить</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <StyledButton type="primary" htmlType="submit" loading={loading}>
              Войти
            </StyledButton>
          </Form.Item>
        </Form>
      </StyledCard>
    </StyledContainer>
  );
};

export default Login;
