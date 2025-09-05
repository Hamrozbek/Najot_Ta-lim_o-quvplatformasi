import React from 'react';
import { Table } from 'antd';

const CustomTable: React.FC<{ columns: any[], data: any[] }> = ({ columns, data }) => {
  const isLoading = !data || data.length === 0;
  return (
    <Table loading={isLoading} columns={columns} dataSource={data} />
  )
};

export default CustomTable;