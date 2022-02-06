import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Row, Col, message, Skeleton, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ImageCarousel from 'components/ImageCarousel';
import RecordHeader from './RecordHeader';
import RentCard from './RentCard';
import { getBoxById, IBox, deleteBox } from 'api/box';

const { Text } = Typography;
const { confirm } = Modal;

const Record = (): JSX.Element => {
  const { id } = useParams();
  const navigation = useNavigate();
  const [data, setData] = React.useState<IBox | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    if (!id) {
      message.error('Ошибка');
    }
    try {
      setLoading(true);
      const box = await getBoxById(id!);
      setData(box);
    } catch (err) {
      console.log(err);
      message.error('Ошибка!');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const showConfirm = () => {
    confirm({
      title: 'Вы действительно хотите удалить эту бытовку?',
      icon: <ExclamationCircleOutlined />,
      content: `Артикул ${data?.number}`,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      async onOk() {
        if (data?.number) {
          await deleteBox(data?.id);
        }
        message.success('Бытовка удалена');
        navigation('/registry');
      },
      onCancel() {},
    });
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div>
      <RecordHeader data={data} onDelete={showConfirm} />

      <Row>
        <Col span={12}>
          {data?.imgUrls?.length && data?.imgUrls?.length > 0 && (
            <ImageCarousel
              images={data?.imgUrls?.filter(Boolean).map((url, idx) => ({ url, id: idx }))}
            />
          )}
        </Col>
        <Col span={12}>
          {data?.status === 'Аренда' && (
            <RentCard orgName={'ООО Название'} endDate={'30.03.2022'} payDate={'25.01.2022'} />
          )}

          <Text>{data?.description}</Text>
        </Col>
      </Row>
    </div>
  );
};

export default Record;
