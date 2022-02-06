import { Layout, Typography, Menu, Breadcrumb, Avatar, Button } from 'antd';
import styled from 'styled-components';

const { Title, Text } = Typography;
const { Header, Content } = Layout;

export const StyledContainer = styled(Layout)`
  height: 100vh;
`;

export const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  height: 48px;
`;

export const StyledTitle = styled(Title)`
  display: flex;
  margin-bottom: 0 !important;
  align-items: center;
  color: white !important;
`;

export const StyledContent = styled(Content)`
  padding: 24px;
  margin: 0;
  min-height: 280;
  background-color: white;
  overflow: auto;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const StyledAvatar = styled(Avatar)`
  margin-right: 10px;
`;

export const StyledText = styled(Text)`
  color: white;
`;

export const StyledMenu = styled(Menu)`
  height: 100%;
  border-right: 0;
`;

export const StyledMainLayout = styled(Layout)`
  padding: 0 24px 24px;
`;

export const StyledBreadcrumb = styled(Breadcrumb)`
  margin: 16px 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const LinkButton = styled(Button)`
  padding-left: 0;
  margin: 5px 0;
`;
