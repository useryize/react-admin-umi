import ManyBlockSwitch from '@/components/ManyBlockSwitch';
import styles from './index.module.less'
import { Divider } from 'antd';
import G6Graph from './G6Graph'
import TableContent from './TableContent'
import { useSetState } from 'ahooks';

export default () => {
  const switchList = [{ label: '树状图', value: '树状图' }, { label: '列表', value: '列表' }];
  const [state, setState] = useSetState<any>({
    switchValue: '树状图',
  });
  return <div className={styles.chartsAnalysisBox}>
    <div className={styles.chartsTitle}>
      <div className={styles.title}>维度分析</div>
      <div className={styles.navBox}>
        <div className={styles.colorBox}>
          <div className={styles.item}>
            <span className={styles.color}></span>
            <span className={styles.text}>同比且环比预警</span>
          </div>
          <div className={styles.item}>
            <span className={styles.color}></span>
            <span className={styles.text}>同比或环比恶化</span>
          </div>
        </div>
        <Divider type="vertical" style={{ height: '20px' }} />
        <ManyBlockSwitch
          className={styles.switchBox}
          options={switchList}
          value={state?.switchValue}
          onChange={(value) => setState({ switchValue: value })}
          containerStyle={{ marginLeft: 8 }}
        />
      </div>
    </div>
    {
      state.switchValue === '树状图' ? <G6Graph /> : <TableContent />
    }

  </div>
}