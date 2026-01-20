import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';

type ManyBlockSwitchProps = {
  value: string | number;
  onChange?: (value: string | number) => void;
  options: { label: string | React.ReactDOM; value: string | number }[];
  fontSize?: number; // 13px: 大按钮， 12px: 中按钮
  itemStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  className?: string;
};

const ManyBlockSwitch: React.FC<ManyBlockSwitchProps> = ({ value, onChange, options, fontSize = 13, itemStyle, containerStyle = {}, className }) => {
  const [current, setCurrent] = useState<string | number>();
  const [positionMap, setPositionMap] = useState<any>({});
  const [wrapperStyle, setWrapperStyle] = useState<React.CSSProperties>({});
  const blockRef = useRef<any>();

  const onItemClick = (value: string | number) => {
    setCurrent(value);
    onChange && onChange(value);
  };

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  useEffect(() => {
    // 记录item位置和宽度
    let blockList = [...(blockRef?.current.getElementsByClassName(styles['many-block-switch-item']) || [])];
    if (!blockList[0]?.offsetWidth) {
      // 不存在宽度，元素为 display none 的情况下
      const currentLength = blockList.length;
      // @ts-ignore
      blockList = [...document.querySelectorAll(`.${styles['many-block-switch-item']}`)].slice(currentLength);
    }
    const newPositionMap = {};
    options?.forEach(({ value }, index) => {
      const block = blockList[index] || {};
      const width = block.offsetWidth || 0;
      const left = block.offsetLeft || 0;
      newPositionMap[value] = { width, left };
    });
    setPositionMap(newPositionMap);
    // minWidth有时候不准，containerStyle可以重写覆盖
    setWrapperStyle({ minWidth: blockRef?.current?.offsetWidth || 600, ...containerStyle });
  }, [options]);
  return (
    <div ref={blockRef} className={classNames(className, styles['many-block-switch-box'], fontSize == 12 ? styles['many-block-switch-box-medium'] : '')} style={wrapperStyle}>
      {options?.map(({ label, value }) => (
        <div
          key={value}
          className={`many-block-switch-item-common ${styles['many-block-switch-item']} ${fontSize == 12 ? styles['many-block-switch-item-medium'] : ''} ${
            value === current ? styles['high-text'] : ''
          }`}
          style={{ fontSize, ...itemStyle }}
          onClick={() => onItemClick(value)}
        >
          {label}
        </div>
      ))}
      <div className={`${styles['high-block']} ${fontSize == 12 ? styles['high-block-medium'] : ''}`} style={positionMap[current]} />
    </div>
  );
};

export default ManyBlockSwitch;
