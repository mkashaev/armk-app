import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import { statusMap } from 'common/constants';
// import { ColumnsType } from 'antd/es/table';
// import { IBox } from 'api/box';

export const columns = [
  {
    title: 'Код',
    dataIndex: 'number',
    key: 'code',
    render: (text: string, record: any) => <Link to={`/registry/${record.id}`}>{text}</Link>,
  },
  {
    title: 'Название',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Статус',
    key: 'status',
    dataIndex: 'status',
    render: (status: string) => {
      return (
        <Tag color={statusMap[status] || 'error'} key={'123'}>
          {status || 'Без статуса'}
        </Tag>
      );
    },
  },
];

// export const columns = [
//   {
//     title: 'Код',
//     dataIndex: 'code',
//     key: 'code',
//     render: (text: any) => <Link to="/registry/record">{text}</Link>,
//   },
//   {
//     title: 'Название',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: 'Адрес',
//     dataIndex: 'location',
//     key: 'location',
//   },
//   {
//     title: 'Статус',
//     key: 'status',
//     dataIndex: 'status',
//     render: (status: string) => {
//       let color;
//       let title;
//       switch (status) {
//         case 'store':
//           color = 'success';
//           title = 'Склад';
//           break;
//         case 'rent':
//           color = 'processing';
//           title = 'Аренда';
//           break;
//         case 'repair':
//           color = 'error';
//           title = 'Ремонт';
//           break;
//         default:
//           color = 'warring';
//           title = 'Не определенно';
//       }
//       return (
//         <Tag color={color} key={'123'}>
//           {title}
//         </Tag>
//       );
//     },
//   },
//   {
//     title: 'Организация',
//     dataIndex: 'organization',
//     key: 'organization',
//   },
//   {
//     title: 'Оплата',
//     dataIndex: 'payDate',
//     key: 'payDate',
//   },
//   {
//     title: 'Конец',
//     dataIndex: 'endDate',
//     key: 'endDate',
//   },
// ];
