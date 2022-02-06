import { Card, Typography, Button } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

export const StyledContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #e5e5e5;
`;

export const StyledCard = styled(Card)`
  width: 400px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

export const StyledButton = styled(Button)`
  width: 100%;
`;

export const StyledTitle = styled(Title)`
  text-align: center;
`;
