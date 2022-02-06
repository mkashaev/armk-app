import styled from 'styled-components';
import { Typography, Card } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const ToolContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  & > * {
    margin-right: 16px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const PlaceContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const PlaceIcon = styled(EnvironmentOutlined)`
  font-size: 20px;
  color: #096dd9;
  margin-right: 2px;
`;

export const PlaceText = styled(Text)`
  color: #096dd9;
`;

export const RentInfoCard = styled(Card)`
  background-color: #f5f5f5;
  margin-bottom: 24px;
`;
