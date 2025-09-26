import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef } from 'react';
import { request } from '@umijs/max';


const columns: ProColumns[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'id',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    search: false,
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        return {
          data: [],
          success: true,
        }
      }}
      search={false}
      rowKey="id"
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      headerTitle="banner管理"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          新建
        </Button>,
      ]}
    />
  );
};