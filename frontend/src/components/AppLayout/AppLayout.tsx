import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, Dropdown } from 'antd';
import { HomeOutlined, UserOutlined, LeftOutlined } from '@ant-design/icons';
import { useAuth } from 'hooks/useAuth';
import {
  StyledContainer,
  StyledHeader,
  StyledTitle,
  StyledContent,
  UserContainer,
  StyledAvatar,
  StyledText,
  StyledMenu,
  StyledMainLayout,
  ButtonContainer,
  LinkButton,
} from './styled';

const { Sider } = Layout;

const AppLayout = (): JSX.Element => {
  const [user] = React.useState<string>('Marat.Kashaev');
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { signout } = useAuth();

  const menu = React.useMemo(
    () => (
      <Menu>
        <Menu.Item key="0" onClick={() => signout()}>
          Выйти
        </Menu.Item>
      </Menu>
    ),
    [signout],
  );

  return (
    <StyledContainer>
      <Layout>
        <StyledHeader>
          <StyledTitle level={4}>АРМК</StyledTitle>
          <Dropdown overlay={menu}>
            <UserContainer>
              <StyledAvatar icon={<UserOutlined />} />
              <StyledText>{user}</StyledText>
            </UserContainer>
          </Dropdown>
        </StyledHeader>
        <Layout>
          <Sider width={200}>
            <StyledMenu mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to="/registry">Бытовки</Link>
              </Menu.Item>
            </StyledMenu>
          </Sider>
          <StyledMainLayout>
            <ButtonContainer>
              <LinkButton type="link" onClick={goBack} icon={<LeftOutlined />}>
                Назад
              </LinkButton>
            </ButtonContainer>
            <StyledContent>
              {/* Here the content is dropped */}
              <Outlet />
            </StyledContent>
          </StyledMainLayout>
        </Layout>
      </Layout>
    </StyledContainer>
  );
};

export default AppLayout;
