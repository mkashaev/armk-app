import { Button, Table, Input } from 'antd';
import styled from 'styled-components';

const { Search } = Input;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledToolBarContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

export const StyledButton = styled(Button)`
  margin-right: 10px;
`;

export const StyledSearch = styled(Search)`
  width: 100%;
`;

export const StyledTable = styled(Table)`
  margin-bottom: 16px;
`;
