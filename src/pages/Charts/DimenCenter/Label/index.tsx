import { Avatar, Tabs } from 'antd'
import styles from './index.module.less'
import { useMemo } from 'react'
import { useSetState } from 'ahooks'
import AddIcon from '../icon/addIcon.svg'
import DelectIcon from '../icon/delectIcon.svg'
import { DownOutlined } from '@ant-design/icons'
import classNames from 'classnames'
export default () => {
  const [state, setState] = useSetState<any>({
    singleTabskey: '',
    manyTabskey: '',
  })
  const singleTabs = useMemo(() => {
    const list = [
      { label: '产品板块', key: '产品板块' },
      { label: '产品名称', key: '产品名称' },
      { label: '区域类型', key: '区域类型' },
      { label: '行业', key: '行业' },
      { label: '业务区', key: '业务区' },
    ]
    list.map((item: any) => {
      item.label = <div className='labelItemBox'>{item?.label}</div>
    })
    return list
  }, [])
  const manyTabs = useMemo(() => {
    // 固定标签
    const fiexList = [
      { label: "产品板块+产品名称+区域类型+重量段", key: '产品板块+产品名称+区域类型+重量段' },
      { label: '产品板块+重量段', key: '产品板块+重量段' },
    ]
    fiexList.map((item: any) => {
      item.label = <div className={'labelItemBox'}>{item?.label}</div>
    })

    // 可删除标签
    const list = [
      { label: '区域类型', key: '区域类型' },
      { label: '产品板块+客层+行业+距离端+重量段', key: '产品板块+客层+行业+距离端+重量段' },
      { label: '业务区+客层+行业+距离端+重量端+产品板块', key: '业务区+客层+行业+距离端+重量端+产品板块' },
      ...(Array.from({ length: 15 }).map((_, index) => ({
        label: `业务区${index}`,
        key: `业务区${index}`,
      })))
    ]
    list.map((item: any) => {
      item.label = <div className={'labelItemBox'}>
        {item?.label}
        <div className='delectBox' onClick={(e) => {
          e.stopPropagation()
        }}><Avatar size={18} src={DelectIcon} /></div>
      </div>
    })
    return [...fiexList, ...list]
  }, [])

  const MoreContent = () => {
    return <div className={styles.moreBox}>
      <span style={{ marginRight: 6, color: '#141222' }} className={styles.name}>更多</span>
      <DownOutlined style={{ color: '#141222', fontSize: '12px' }} />
    </div>
  }
  const AddItemsContent = () => {
    return <div className={styles.addBox}>
      <Avatar size={16} src={AddIcon} />
      <span className={styles.name} style={{ marginLeft: 6, color: '#3355FF' }}>新增维度</span>
    </div>
  }

  return <div className={styles.labelBox}>
    <div className={styles.singleBox}>
      <div className={styles.singleName}>可选维度</div>
      <div className={styles.singleTabs}>
        <Tabs
          items={singleTabs}
          activeKey={state?.singleTabskey}
          moreIcon={<MoreContent />}
          onChange={(value) => setState({ singleTabskey: value, manyTabskey: '' })}
        />
      </div>
    </div>
    <div className={styles.singleBox}>
      <div className={styles.singleName}>维度下钻</div>
      <div className={classNames(styles.singleTabs, styles.manyTabs)}>
        <Tabs
          items={manyTabs}
          activeKey={state?.manyTabskey}
          moreIcon={<MoreContent />}
          tabBarExtraContent={<AddItemsContent />}
          onChange={(value) => setState({ manyTabskey: value, singleTabskey: '' })}
          popupClassName={styles.singleBoxPopup}
        />
      </div>
    </div>
  </div>
}