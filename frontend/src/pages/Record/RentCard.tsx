import { Typography } from 'antd';
import { RentInfoCard } from './styled';

const { Text } = Typography;

interface Props {
  orgName: string;
  endDate: string;
  payDate: string;
}

const RentCard = ({ orgName, endDate, payDate }: Props): JSX.Element => {
  return (
    <RentInfoCard>
      <div>
        <Text strong>Организация</Text>: <span>{orgName}</span>
      </div>
      <div>
        <Text strong>Срок сдачи</Text>: <span>{endDate}</span>
      </div>
      <div>
        <Text strong>Дата оплаты</Text>: <span>{payDate}</span>
      </div>
    </RentInfoCard>
  );
};

export default RentCard;
