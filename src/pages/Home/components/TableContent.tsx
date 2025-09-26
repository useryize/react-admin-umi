import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useMemo } from 'react';
import supabase from '@/utils/supabase';
import { useModel } from '@umijs/max';

interface BannerData {
  id: string;
  name: string;
  linkUrl: string;
  desc: string;
  imageUrl: number;
}
export default () => {
  const { setState, actionRef } = useModel('Home.home');
  // 配置表格列
  const columns: ProColumns<BannerData>[] = useMemo(() => ([
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '介绍',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: '地址',
      dataIndex: 'link',
      ellipsis: true,
    },
  ]), []);


  return <>
    <ProTable
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        const { data, error = false } = await supabase
          .from('home_banner')
          .select('*')
        return { data: data ?? undefined, total: data?.length, success: true };
      }}
      search={false}
      rowKey="id"
      pagination={{
        pageSize: 10,
      }}
      headerTitle="banner管理"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => setState({ open: true })}
          type="primary"
        >
          新建
        </Button>,
      ]}
    />
  </>
}