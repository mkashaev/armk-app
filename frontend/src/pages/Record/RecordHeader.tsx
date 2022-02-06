import { Typography, Tag, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { IBox } from 'api/box';
import { statusMap } from 'common/constants';
import {
  TitleContainer,
  ButtonContainer,
  ToolContainer,
  PlaceContainer,
  PlaceIcon,
  PlaceText,
} from './styled';

const { Title, Text } = Typography;

interface Props {
  data: IBox | null;
  onClickEdit?: () => void;
  onDelete?: () => void;
}

const RecordHeader = ({ data, onDelete }: Props): JSX.Element => {
  const navigation = useNavigate();
  return (
    <div>
      <TitleContainer>
        <Title level={3}>{data?.title}</Title>
        <ButtonContainer>
          <Button
            style={{ marginRight: 16 }}
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigation(`/registry/edit/${data?.id}`)}
          >
            Редактировать
          </Button>

          <Button icon={<DeleteOutlined />} onClick={onDelete}>
            Удалить
          </Button>
        </ButtonContainer>
      </TitleContainer>

      <ToolContainer>
        <div>
          <Tag
            color={(data?.status && statusMap[data.status]) || 'red'}
            key="0"
            style={{ margin: 0 }}
          >
            {data?.status || 'Не определено'}
          </Tag>
        </div>

        {data?.location && (
          <PlaceContainer>
            <PlaceIcon />
            <PlaceText strong>{data?.location}</PlaceText>
          </PlaceContainer>
        )}

        <Text type="secondary">{data?.number}</Text>
      </ToolContainer>
    </div>
  );
};

export default RecordHeader;
