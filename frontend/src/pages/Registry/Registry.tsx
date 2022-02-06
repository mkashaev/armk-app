import React from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  StyledContainer,
  StyledToolBarContainer,
  StyledButton,
  StyledSearch,
  StyledTable,
} from './styled';
import { ITableData } from 'common/types/tableData.interface';
import { columns } from './columns';
import { getAllBoxes, IBox } from 'api/box';

const Registry = (): JSX.Element => {
  const [page, setPage] = React.useState<number>(1);
  const [data, setData] = React.useState<ITableData<IBox> | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSearch = (value: string) => {
    console.log({ value });
  };

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const fetch = async (query: any) => {
    try {
      setLoading(true);
      const boxData = await getAllBoxes(query);
      setData(boxData);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const query = {
      page,
      size: 10,
    };
    fetch(query);
  }, [page]);

  return (
    <StyledContainer>
      <StyledToolBarContainer>
        <Link to="/registry/create">
          <StyledButton type="primary" icon={<PlusOutlined />}>
            Добавить
          </StyledButton>
        </Link>
        <StyledSearch placeholder="Найти..." onSearch={onSearch} />
      </StyledToolBarContainer>
      <StyledTable
        columns={columns}
        dataSource={data?.data.map((item) => ({ ...item, key: item.id }))}
        size="middle"
        pagination={false}
        loading={loading}
      />
      <Pagination
        current={data?.page}
        onChange={onChangePage}
        total={data?.count || 10}
        pageSize={data?.size || 10}
      />
    </StyledContainer>
  );
};

export default Registry;
