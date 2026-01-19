import styles from './index.module.less';
import Label from './Label'
export default () => {
  return <div className={styles.dimenBox}>
    <div className={styles.titleBox}>多维分析</div>
    <Label />
  </div>
}