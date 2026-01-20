import ManyBlockSwitch from '@/components/ManyBlockSwitch';
import styles from './index.module.less'
import { Divider } from 'antd';
import G6Graph from './G6Graph'

export default () => {
  const switchList = [{ label: '寄件口径', value: '寄件口径' }, { label: '销售口径', value: '销售口径' }];
  return <div className={styles.chartsAnalysisBox}>
    <div className={styles.chartsTitle}>
      <div className={styles.title}>维度分析</div>
      <div className={styles.navBox}>
        <div className={styles.colorBox}>
          <div className={styles.item}>
            <span className={styles.color}></span>
            <span className={styles.text}>环比恶化</span>
          </div>
        </div>
        <Divider type="vertical" style={{ height: '20px' }} />
        <ManyBlockSwitch
          className={styles.switchBox}
          options={switchList}
          value={'寄件口径'}
          onChange={(value) => { }}
          containerStyle={{ marginLeft: 8 }}
        />
      </div>
    </div>
    <G6Graph />
  </div>
}