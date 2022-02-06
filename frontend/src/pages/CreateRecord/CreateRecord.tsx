import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Typography, Form, Input, Button, Select, message } from 'antd';
import { createBox, IBoxDto, getBoxById, updateBox } from 'api/box';

const { Title } = Typography;
const { Option } = Select;

interface IForm {
  title: string;
  number: string;
  location: string;
  status: string;
  organization: string;
  endDate: string;
  payDate: string;
  description: string;
  imgUrl: string;
}

const CreateRecord = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    if (id) {
      try {
        setLoading(true);
        const box = await getBoxById(id!);
        form.setFieldsValue({ ...box, imgUrl: box.imgUrls?.[0] });
      } catch (err) {
        console.log(err);
        message.error('Ошибка!');
      } finally {
        setLoading(false);
      }
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const onFinish = async (value: IForm) => {
    const boxDto: IBoxDto = {
      title: value.title,
      number: value.number,
      status: value.status,
      location: value.location,
      description: value.description,
      imgUrls: [value.imgUrl],
    };
    try {
      setLoading(true);
      if (id) {
        await updateBox(id, boxDto);
        message.success('Бытовка отредактированно');
      } else {
        await createBox(boxDto);
        message.success('Бытовка создана');
      }

      navigate('/registry');
    } catch (err) {
      console.log(err);
      message.error('Ошибка!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={4}>{id ? 'Редактирование' : 'Создание'}</Title>
      <Row>
        <Col md={24} lg={18} xl={14}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Название"
              name="title"
              rules={[{ required: true, message: 'Обязательное поле' }]}
            >
              <Input placeholder="Введите название" />
            </Form.Item>

            <Form.Item
              label="Номер"
              name="number"
              rules={[{ required: true, message: 'Обязательное поле' }]}
            >
              <Input placeholder="Введите номер" />
            </Form.Item>

            <Form.Item
              label="Локация"
              name="location"
              rules={[{ required: true, message: 'Обязательное поле' }]}
            >
              <Select placeholder="Выберете город" allowClear>
                <Option value="Москва">Москва</Option>
                <Option value="Санкт Петербург">Санкт Петербург</Option>
                <Option value="Нижний Новгород">Нижний Новгород</Option>
                <Option value="Екантеренбург">Екантеренбург</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Статус"
              name="status"
              rules={[{ required: true, message: 'Обязательное поле' }]}
            >
              <Select placeholder="Выберете статус" allowClear>
                <Option value="Склад">Склад</Option>
                <Option value="Аренда">Аренда</Option>
                <Option value="Ремонт">Ремонт</Option>
              </Select>
            </Form.Item>

            {/* <Form.Item label="Организация" name="organization">
              <Input placeholder="Введите организацию" />
            </Form.Item>

            <Form.Item label="Срок сдачи" name="endDate">
              <Input placeholder="Введите строк сдачи" />
            </Form.Item>

            <Form.Item label="Дата оплаты" name="payDate">
              <Input placeholder="Введите дату оплаты" />
            </Form.Item> */}

            <Form.Item label="Описание" name="description">
              <Input.TextArea placeholder="Введите описание" />
            </Form.Item>

            <Form.Item label="Ссылка на фотографию" name="imgUrl">
              <Input placeholder="Введите ссылку" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {id ? 'Сохранить' : 'Создать'}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default CreateRecord;
