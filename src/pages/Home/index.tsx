import Guide from '@/components/Guide';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return <>{name}</>
};

export default HomePage;
