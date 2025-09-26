import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { message } from 'antd';
import { useModel } from '@umijs/max';
import supabase from '@/utils/supabase';
export default () => {
  const { state, setState, actionRef } = useModel('Home.home');
  // 处理表单提交
  const handleAdd = async (values: any) => {
    try {
      setState({ popLoading: true });
      const { error } = await supabase
        .from('home_banner')
        .insert({
          name: values.name,
          linkUrl: values.linkUrl || '',
          desc: values.desc || '',
          imageUrl: values.imageUrl || 0,
        });

      if (error) {
        message.error('添加失败');
        return false;
      } else {
        setState({ popLoading: false, open: false });
        message.success('添加成功');
        actionRef?.current?.reload?.();
        return true;
      }
    } catch (err) {
      console.error('捕获到异常:', err);
      return false;
    }
  };
  return <>
    <ModalForm
      title="新建"
      width={600}
      open={state?.open}
      onOpenChange={() => setState}
      onFinish={handleAdd}
      layout="horizontal"
      labelCol={{
        span: 6,
      }}

      wrapperCol={{
        span: 16,
      }}
      modalProps={{
        confirmLoading: state.popLoading,
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