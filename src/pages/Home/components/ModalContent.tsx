import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { useModel } from '@umijs/max';
import supabase from '@/utils/supabase';
import { error } from 'console';
import { useEffect } from 'react';
export default () => {
  const [form] = Form.useForm<any>();
  const { state, setState, actionRef } = useModel('Home.home');
  // 处理表单提交
  const handleSubmit = async ({ name, linkUrl, desc, imageUrl }: any) => {
    try {
      setState({ popLoading: true });
      let result;
      const params = { name, linkUrl, desc, imageUrl }

      if (state?.edit && state?.editParams?.id) {
        result = await supabase
          .from('home_banner')
          .update(params)
          .eq('id', state?.editParams?.id)
      }


      if (state?.add && !state?.edit) {
        result = await supabase
          .from('home_banner')
          .insert(params);
      }

      message?.[result?.error ? 'error' : 'success'](result?.error ? '添加失败' : '更新失败');
      handleClose()
      !result?.error && actionRef?.current?.reload?.();
    } catch (err) {
      console.error('捕获到异常:', err);
    }
  };

  // 处理弹窗关闭
  const handleClose = () => {
    setState({
      popLoading: false,
      open: false,
      edit: false,
      add: false,
      editParams: {}
    });
  };
  useEffect(() => {
    if (state?.edit) {
      form.setFieldsValue(state?.editParams);
    }
    return () => { }
  }, [state?.editParams])
  return <>
    <ModalForm
      form={form}
      title={state?.edit ? '编辑' : '新建'}
      width={600}
      open={state?.open}
      onFinish={handleSubmit}
      layout="horizontal"
      labelCol={{ span: 6, }}
      wrapperCol={{ span: 16, }}
      modalProps={{
        confirmLoading: state.popLoading,
        onCancel: handleClose,
        destroyOnHidden: true,
      }}
    >
      <ProFormText
        name="name"
        label="名称"
        placeholder="请输入名称"
        rules={[{ required: true, message: '请输入名称' }]}
      />

      <ProFormText
        name="imageUrl"
        label="图片地址"
        placeholder="请输入图片URL"
      />

      <ProFormText
        name="linkUrl"
        label="链接地址"
        placeholder="请输入链接地址"
      />

      <ProFormTextArea
        name="desc"
        label="描述"
        placeholder="请输入描述内容"
        maxLength={200}
        showCount
      />

    </ModalForm>
  </>
}