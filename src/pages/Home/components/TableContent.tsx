import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { useEffect, useMemo } from 'react';
import supabase from '@/utils/supabase';
import { useModel } from '@umijs/max';

interface BannerData {
  id: string;
  name: string;
  linkUrl: string;
  desc: string;
  imageUrl: number;
  title?: string;
  link?: string;
}
export default () => {
  const { setState, actionRef } = useModel('Home.home');

  // 处理删除操作
  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('home_banner')
        .delete()
        .eq('id', id);
      message?.[error ? 'error' : 'success'](error ? '删除失败' : '删除成功')
      !error && actionRef?.current?.reload?.();
    } catch (err) {
      message.error('删除失败');
    }
  };

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
      dataIndex: 'desc',
      ellipsis: true,
    },
    {
      title: '地址',
      dataIndex: 'linkUrl',
      ellipsis: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => {
        return <>
          <span className='cursor-pointer text-[#1677ff] mr-[10px]' onClick={() => setState({ open: true, edit: true, editParams: record })}>编辑</span>

          <Popconfirm
            key="delete"
            title="确认删除"
            description="确定要删除这条记录吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <span className='cursor-pointer text-[#1677ff]'>删除</span>
          </Popconfirm>
        </>
      },
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
          onClick={() => setState({ open: true, add: true, editParams: {} })}
          type="primary"
        >
          新建
        </Button>,
      ]}
    />
  </>
}