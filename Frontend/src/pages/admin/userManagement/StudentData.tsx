import { Button, Pagination, Space, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useState } from 'react';
import { TQueryParam, TStudent } from '../../../types';
import { useGetAllStudentsQuery } from '../../../redux/features/admin/userManagement.api';
import { Link } from 'react-router-dom';

export type TTableData = Pick<
  TStudent,
  'fullName' | 'id' | 'email' | 'contactNumber'
>;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: studentData,
    isFetching,
    isLoading,
  } = useGetAllStudentsQuery([
    { name: 'page', value: page },
    { name: 'sort', value: 'id' },
    ...params,
  ]);

  console.log({ isLoading, isFetching });

  const metaData = studentData?.meta;

  const tableData = studentData?.data?.map(
    ({ _id, fullName, id, email, contactNumber }) => ({
      key: _id,
      _id,
      fullName,
      id,
      email,
      contactNumber,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'fullName',
    },
    {
      title: 'Roll No',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'contact No',
      key: 'contactNumber',
      dataIndex: 'contactNumber',
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/student-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: '1%',
    },
  ];

  const onChange: TableProps<TTableData>['onChange'] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === 'filter') {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: 'name', value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: 'year', value: item })
      );
      setParams(queryParams);
    }
  };

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </div>
  );
};

export default StudentData;
