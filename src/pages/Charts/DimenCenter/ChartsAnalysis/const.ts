import { request } from '@umijs/max';

export const chartsData = [{
  "id": "g1",
  title: '收入',
  value: 5461,
  tb: 0.123,
  hb: 0.1125,
  index: 0,
  children: ['时效板块', '电商板块'].map((item, index) => ({
    id: item + index,
    title: item,
    value: 5461,
    tb: 0.123,
    hb: 0.1125,
    index,
    children: ['顺丰特快', '顺丰标快'].map((item2, index2) => ({
      id: `${item}_${item2}_${index2}`,
      title: item2 + index2,
      value: 5461,
      tb: 0.123,
      hb: 0.1125,
      index: index2,
      children: (index2 === 0 ? ['深莞区', '上海区', '北京区'] : ['深莞区', '上海区', '北京区', '北京区33', '上海33', 'sadfqw', 'fdfgw', 'asda', 'asdasd', 'asdad']).map((item3, index3) => ({
        id: `${item}_${item2}_${item3}_${index3}`,
        title: item3 + index3,
        value: 5461,
        tb: 0.123,
        hb: 0.1125,
        index: index3,
        children: ['深莞区2', '上海区2', '北京区2'].map((item4, index4) => ({
          id: `${item}_${item2}_${item3}_${item4}_${index4}`,
          title: item4 + index4,
          value: 5461,
          tb: 0.123,
          hb: 0.1125,
          index: index4,
          children: ['深莞区3', '上海区3', '北京区3'].map((item5, index5) => ({
            id: `${item}_${item2}_${item3}_${item4}_${item5}_${index5}`,
            title: item5 + index5,
            value: 5461,
            tb: 0.123,
            hb: 0.1125,
            index: index5,
            children: ['深莞区4', '上海区4', '北京区4', '北京区4',].map((item6, index6) => ({
              id: `${item}_${item2}_${item3}_${item4}_${item5}_${item6}_${index6}`,
              title: item6 + index6,
              value: 5461,
              tb: 0.123,
              hb: 0.1125,
              index: index6
            }))
          }))
        }))
      }))
    }))
  }))
}]



// 数图数据
export async function getChartsData(data?: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(chartsData);
    }, 50)
  });
}