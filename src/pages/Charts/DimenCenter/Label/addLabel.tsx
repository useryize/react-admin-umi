import { Modal, Select, Button, Space, Avatar } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import styles from './addLabel.module.less'
import { useEffect, useState } from 'react'
import DelectIcon from '../icon/delectIcon.png'
import AddIcon from '../icon/addIcon.svg'

interface DimensionItem {
  id: string
  value: string
}


interface AddLabelModalProps {
  visible: boolean
  onClose: () => void
  onConfirm: (dimensions: DimensionItem[]) => void
  availableDimensions: string[]
}

const DIMENSION_OPTIONS = ['产品板块', '产品名称', '区域类型', '行业', '业务区']


export default function AddLabelModal({
  visible,
  onClose,
  onConfirm,
  availableDimensions = DIMENSION_OPTIONS,
}: AddLabelModalProps) {
  const [dimensions, setDimensions] = useState<DimensionItem[]>([
    { id: '1', value: '' }
  ])

  useEffect(() => {
    if (visible) {
      setDimensions([{ id: '1', value: '' }])
    }
  }, [visible])


  const handleDimensionChange = (id: string, value: string) => {
    setDimensions(prev =>
      prev.map(item => (item.id === id ? { ...item, value } : item))
    )
  }


  const handleAddDimension = () => {
    const newId = String(Math.max(...dimensions.map(d => Number(d.id)), 0) + 1)
    setDimensions([...dimensions, { id: newId, value: '' }])
  }

  const handleRemoveDimension = (id: string) => {
    if (dimensions.length > 1) {
      setDimensions(dimensions.filter(item => item.id !== id))
    }
  }


  const getAvailableOptions = (currentId: string) => {
    const selectedValues = dimensions
      .filter(item => item.id !== currentId)
      .map(item => item.value)
      .filter(Boolean)

    return availableDimensions.filter(item => !selectedValues.includes(item))
  }

  const handleConfirm = () => {
    const hasEmptyValue = dimensions.some(item => !item.value)
    if (hasEmptyValue) {
      alert('请填选所有维度')
      return
    }
    onConfirm(dimensions)
    onClose()
  }


  return (
    <Modal
      title="新增维度"
      open={visible}
      onCancel={onClose}
      width={600}
      okText="确认"
      cancelText="取消"
      onOk={handleConfirm}
    >
      <div className={styles.addLabelContent}>
        <div className={styles.dimensionContainer}>
          {dimensions.map((dimension, index) => (
            <div key={dimension.id} className={styles.dimensionItem}>
              <div className={styles.dimensionCardWrapper}>
                {dimensions.length > 1 && index > 0 && (
                  <Button
                    type="text"
                    danger
                    icon={<Avatar size={14} style={{marginRight: 6}} src={DelectIcon} />}
                    onClick={() => handleRemoveDimension(dimension.id)}
                    className={styles.deleteBtn}
                    title="删除此维度"
                    size="small"
                  />
                )}

                <div className={styles.dimensionCard}>
                  <div className={styles.dimensionHeader}>
                    <span className={styles.dimensionLabel}>维度 {index + 1}</span>
                  </div>
                  <Select
                    placeholder="请选择维度"
                    value={dimension.value}
                    onChange={value => handleDimensionChange(dimension.id, value)}
                    options={getAvailableOptions(dimension.id).map(opt => ({
                      label: opt,
                      value: opt,
                    }))}
                    getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>
          ))}
          {
            dimensions?.length < availableDimensions?.length && <div className={styles.actionArea}>
              <Button
                type="primary"
                icon={<Avatar size={16} src={AddIcon} />}
                onClick={handleAddDimension}
                className={styles.addBtn}
              >
                新增维度
              </Button>
            </div>
          }
        </div>
      </div>
    </Modal>
  )
}
