import numeral from 'numeral';

const digitLenMap = {
  1: '0.0',
  2: '0.00',
  3: '0.000',
  4: '0.0000',
};
export function formatHundredRate(value?: string | number, len = 2) {
  if (!value) return value;
  return parseFloat((parseFloat(value as string) * 100).toFixed(len));
}
export const parseWan = (val: number) => {
  const after = val / 10000;
  return formatThousands(keepDecimals(after));
};
export const keepDecimals = (val: number | string, len = 2): number | string => {
  if (!val) {
    val = 0;
  }
  return numeral(Number(val)).format(digitLenMap[len]);
};
export const formatThousands: any = (num: any) => {
  if (Number.isNaN(num) || !Number(num)) {
    return '0';
  }
  if (Number(num) < 1000) {
    return num;
  }
  const numStr = num.toString();
  if (numStr.indexOf('.') == -1) {
    return numStr.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  }
  const numArr = numStr.split('.');
  return `${formatThousands(numArr[0])}.${numArr[1]}`;
};
export function isEmpty(a: any) {
  if (a === '') return true; //检验空字符串
  if (a === 'null') return true; //检验字符串类型的null
  if (a === 'undefined') return true; //检验字符串类型的 undefined
  if (!a && a !== 0 && a !== '') return true; //检验 undefined 和 null
  if (Array.prototype.isPrototypeOf(a) && a.length === 0) return true; //检验空数组
  if (Object.prototype.isPrototypeOf(a) && Object.keys(a).length === 0) return true; //检验空对象
  return false;
}
export function isNumber(num: any) {
  return typeof num === 'number' && !Number.isNaN(num);
}
// 兼容null
export const formatThousandsStr: any = (num: any) => {
  const numTemp = +num;
  if (isEmpty(num)) return '--';
  if (numTemp === 0) return numTemp;
  if (isNumber(numTemp)) {
    return formatThousands(num);
  }
  return num;
};
// 处理数据
export function handleNumber(val: any, type: string, unit: string = '', tag: number = 2) {
  if (!val && val !== 0) return '--';
  const value = !isNaN(Number(val)) ? Number(val) : 0;
  switch (type) {
    case 'number':
      if (Math.abs(value) >= 1000000000000) {
        return (
          <>
            {(value / 1000000000000)?.toFixed(2)}
            <span>万亿{unit}</span>
          </>
        );
      }

      if (Math.abs(value) >= 100000000 && Math.abs(value) < 1000000000000) {
        return (
          <>
            {(value / 100000000)?.toFixed(2)}
            <span>亿{unit}</span>
          </>
        );
      }
      if (Math.abs(value) >= 10000 && Math.abs(value) < 100000000) {
        return (
          <>
            {parseWan(value)}
            <span>万{unit}</span>
          </>
        );
      }

      return (
        <>
          {value?.toFixed(tag)}
          <span>{unit}</span>
        </>
      );
    case 'number-thousands':
      if (Math.abs(value) >= 1000000000000) {
        return (
          <>
            {formatThousandsStr((value / 1000000000000)?.toFixed(2))}
            <span>万亿{unit}</span>
          </>
        );
      }

      if (Math.abs(value) >= 100000000 && Math.abs(value) < 1000000000000) {
        return (
          <>
            {formatThousandsStr((value / 100000000)?.toFixed(2))}
            <span>亿{unit}</span>
          </>
        );
      }
      if (Math.abs(value) >= 10000 && Math.abs(value) < 100000000) {
        return (
          <>
            {parseWan(value)}
            <span>万{unit}</span>
          </>
        );
      }

      return (
        <>
          {formatThousandsStr(value?.toFixed(tag))}
          <span>{unit}</span>
        </>
      );
    case 'number-wan':
      return (
        <>
          {value < 0 ? `-${parseWan(Math.abs(value))}` : parseWan(value)}
        </>
      )
    case 'rate':
      return (
        <>
          {formatHundredRate(value)}
          <span>{unit}</span>
        </>
      );
    case 'rate-number':
      return (
        <>
          {value?.toFixed(2)}
          <span>{unit}</span>
        </>
      );
    case 'number-str':
      if (Math.abs(value) >= 1000000000000) {
        return `${(value / 1000000000000)?.toFixed(2)}万亿${unit}`;
      }

      if (Math.abs(value) >= 100000000 && Math.abs(value) < 1000000000000) {
        return `${(value / 100000000)?.toFixed(2)}亿${unit}`;
      }
      if (Math.abs(value) >= 10000 && Math.abs(value) < 100000000) {
        return `${parseWan(value)}万${unit}`;
      }
      return `${value?.toFixed(tag)}${unit}`;
    case 'number-str-thousands':
      if (Math.abs(value) >= 1000000000000) {
        return `${value < 0 ? '-' : ''}${formatThousandsStr((Math.abs(value) / 1000000000000)?.toFixed(2))}万亿${unit}`;
      }

      if (Math.abs(value) >= 100000000 && Math.abs(value) < 1000000000000) {
        return `${value < 0 ? '-' : ''}${formatThousandsStr((Math.abs(value) / 100000000)?.toFixed(2))}亿${unit}`;
      }
      if (Math.abs(value) >= 10000 && Math.abs(value) < 100000000) {
        return `${value < 0 ? '-' : ''}${parseWan(Math.abs(value))}万${unit}`;
      }
      return `${value < 0 ? '-' : ''}${formatThousandsStr(Math.abs(value)?.toFixed(tag))}${unit}`;
    case 'rate-str':
      return `${formatHundredRate(value)}${unit}`;
    case 'reate-number-str':
      return `${value?.toFixed(2)}${unit}`;

    case 'number-tooltip-str':
      if (Math.abs(value) >= 1000000000000) {
        return `${(value / 1000000000000)?.toFixed(2)}<span>万亿${unit}</span>`;
      }

      if (Math.abs(value) >= 100000000 && Math.abs(value) < 1000000000000) {
        return `${(value / 100000000)?.toFixed(2)}<span>亿${unit}</span>`;
      }
      if (Math.abs(value) >= 10000 && Math.abs(value) < 100000000) {
        return `${parseWan(value)}<span>万${unit}</span>`;
      }
      return `${value?.toFixed(tag)}<span>${unit}</span>`;
    case 'rate-tooltip-str':
      return `${formatHundredRate(value)}<span>${unit}</span>`;
    case 'reate-number-tooltip-str':
      return `${value?.toFixed(2)}<span>${unit}</span>`;
  }
}