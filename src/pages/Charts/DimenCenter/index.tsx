import styles from './index.module.less';
import Label from './Label'
import ChartsAnalysis from './ChartsAnalysis'
export default () => {
  return <div className={styles.dimenBox}>
    <div className={styles.titleBox}>多维分析</div>
    <Label />
    <ChartsAnalysis />
  </div>
}