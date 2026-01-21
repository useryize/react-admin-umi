import { useCallback, useEffect, useRef } from 'react';
import styles from './index.module.less';
import { ExtensionCategory, Graph, GraphEvent, register, treeToGraphData } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react'
import { chartsData, getChartsData } from './const';
import { useMemoizedFn, useSetState } from 'ahooks';
import { Avatar, Spin } from 'antd';
import { handleNumber } from '@/utils';
import RateRender from '@/components/RateRender';
import chartsIcon from '../icon/charts.svg'
import expandIcon from '../icon/expand.png'
register(ExtensionCategory.NODE, 'react-node', ReactNode);


const GraphItem = (node: any) => {
  const RateRenderStyle = { fontFamily: 'DIN Pro Regular', alignItems: 'baseline' }
  return <div className={styles.graphItem}>
    <div className={styles.title}>
      <span>{node.title}+ {node?.index} + {node?.depth}</span>
    </div>
    <div className={styles.rightIcon}>
      <Avatar size={14} src={chartsIcon} />
      <Avatar onClick={() => node?.updateGraph(node?.id)} size={12} src={expandIcon} />
    </div>
    <div className={styles.valueBox}>
      <div className={styles.value}>{handleNumber(node?.value, 'number', '元', 0)}</div>
    </div>
    <div className={styles.numberBox}>
      <div className={styles.number}>
        <span>同比:</span>
        <span className={styles.num}>
          <RateRender value={handleNumber(0.124, 'number-str', '') as string} afterFix={'%'} style={RateRenderStyle} />
        </span>
      </div>
      <div className={styles.number}>
        <span>环比:</span>
        <span className={styles.num}>
          <RateRender value={handleNumber(0.1254, 'number-str', '') as string} afterFix={'%'} style={RateRenderStyle} />
        </span>
      </div>
    </div>
  </div>
}


export default () => {
  const refGraph = useRef<Graph | null>(null);
  const refContainer = useRef<any>(null)
  const refNavTitle = useRef<any>(null)
  const [state, setState] = useSetState<any>({
    chartsData: {},
    loading: false,
    garphTitleList: [],
  })
  const initGraph = () => {
    if (refGraph.current) return
    const graph = new Graph({
      container: refContainer.current,
      animation: false,
      x: 0,
      y: 0,
      padding: 0,
      node: {
        animation: false,
        type: 'react-node',
        style: {
          draggable: true,
          port: true,
          ports: [
            { key: 'right', placement: 'right' },
            { key: 'left', placement: 'left' }
          ],
          size: [245, 110],
          component: (node: any) => {
            return <GraphItem {...node} updateGraph={updateGraph} />
          }
        }
      },
      edge: {
        type: 'cubic-horizontal',
        animation: {
          enter: false
        },
        style: {
          stroke: 'rgba(20, 18, 34, 0.1)',
          lineWidth: 2
        }
      },
      behaviors: ['drag-canvas'],
    });
    refGraph.current = graph;
  }


  // 获取id对应层级
  const getfilterDataDepth = ({ id, data, level = 0 }: { id: any; data: any; level?: number }): number => {
    for (const item of data) {
      if (item.id === id) {
        return level;
      }
      if (item.children && item.children.length > 0) {
        const result = getfilterDataDepth({ id, data: item.children, level: level + 1 });
        if (result !== -1) {
          return result;
        }
      }
    }
    return -1;
  };

  // 检查数据中是否包含目标 id
  const hasTargetKey = ({ data, targetId }: { data: any; targetId: string }): boolean => {
    if (!data || !Array.isArray(data)) return false;
    for (const item of data) {
      if (item.id === targetId) return true;
      if (item.children && hasTargetKey({ data: item.children, targetId })) return true;
    }
    return false;
  };

  // 过滤展示数据
  const filterDataFun = ({ id, data, currentDepth = 0, targetDepth = -1 }: { id: any; data: any; currentDepth?: number; targetDepth?: number }) => {

    if (targetDepth === -1) {
      targetDepth = getfilterDataDepth({ id, data });
    }

    return data.map((item: any, index: any) => {
      let children = [];

      if (currentDepth < targetDepth) {
        // 还未到达目标层，只保留通往目标的路径
        if (item.id === id || (item.children && hasTargetKey({ data: item.children, targetId: id }))) {
          children = item.children ? filterDataFun({ id, data: item.children, currentDepth: currentDepth + 1, targetDepth }) : [];
        } else {
          children = [];
        }
      } else if (currentDepth === targetDepth) {
        // 在目标层，只保留 id 的 children，同层其他的为 []
        if (item.id === id) {
          children = item.children ? filterDataFun({ id, data: item.children, currentDepth: currentDepth + 1, targetDepth }) : [];
        } else {
          children = [];
        }
      } else {
        // 在目标层之下，使用老逻辑（只保留第一个元素的子节点）
        if (index === 0 && item.children) {
          children = filterDataFun({ id, data: item.children, currentDepth: currentDepth + 1, targetDepth });
        } else {
          children = [];
        }
      }
      return {
        ...item,
        children: item?.children?.length ? children : []
      };
    });
  };


  // 获取深度
  const getFilterDataLength = (list: any[]) => {
    // 计算有多少层
    const getMaxDepth = (data: any, depth = 0): number => {
      let maxDepth = depth;
      for (const item of data) {
        if (item.children && item.children.length > 0) {
          maxDepth = Math.max(maxDepth, getMaxDepth(item.children, depth + 1));
        }
      }
      return maxDepth;
    };

    // 计算最大子层级 children长度最大
    const getMaxChildrenLength = (data: any): number => {
      let maxLength = 0;
      for (const item of data) {
        if (item.children && item.children.length > 0) {
          maxLength = Math.max(maxLength, item.children.length);
          maxLength = Math.max(maxLength, getMaxChildrenLength(item.children));
        }
      }
      return maxLength;
    };

    const widthNum = getMaxDepth(list) + 1; // +1因为从0开始
    const heightNum = getMaxChildrenLength(list);

    return { widthNum, heightNum };
  }


  const updateGraph = useMemoizedFn((id: string) => {
    if (!refGraph.current) return;
    const graph = refGraph.current;
    graph.clear();
    const chartsData = [...state?.chartsData]
    const filterData = filterDataFun({ id, data: chartsData })
    graph.setData(treeToGraphData(filterData?.[0]));
    const grapgconfig = getFilterDataLength(filterData)
    const widthNum = grapgconfig.widthNum
    const heightNum = grapgconfig.heightNum
    const width = widthNum * 245 + (widthNum - 1) * 40 + 40
    const height = heightNum * 110 + (heightNum - 1) * 40 + 40

    const clientWidth = refContainer.current.clientWidth
    const clientHeight = refContainer.current.clientHeight

    // 设置graph表头宽度
    if (refNavTitle.current) {
      const navDiv = refNavTitle.current.querySelector(`.${styles.nav}`);
      if (navDiv) {
        navDiv.style.width = `${(width > clientWidth ? width : clientWidth) + 6}px`;
      }
    }

    graph.setOptions({
      width: width > clientWidth ? width : clientWidth,
      height: height > clientHeight ? height : clientHeight,
      autoResize: false,
      layout: {
        type: 'grid',
        begin: [-142.5, -75],
        rows: heightNum, // 设置行数
        cols: widthNum, // 设置列数
        sortBy: 'value',
        nodeSpacing: 40,
        preventOverlap: true, // 确保节点不重叠
        preventOverlapPadding: 0, // 将内边距设为0
        condense: true,
        preLayout: false,
        position: node => {
          return { row: node?.data?.index, col: node?.data?.depth }
        },
      }
    })
    graph.translateTo([0, 0])
    graph.render();
  })
  const getChartsDataInit = async () => {
    try {
      setState({ loading: true })
      const config = getFilterDataLength([...chartsData])
      setState({ garphTitleList: Array.from({ length: config.widthNum }).map(item => '文案') })
      const res = await getChartsData()
      setState({ chartsData: res })
    } finally {
      setState({ loading: false })
    }

  }


  useEffect(() => {
    getChartsDataInit()
  }, [])

  useEffect(() => {
    updateGraph('g1')
  }, [state?.chartsData])

  useEffect(() => {
    if (!refContainer.current) return;
    initGraph();
  }, [refContainer?.current])

  // 监听refContainer和refNavTitle滚动事件，双向同步
  useEffect(() => {
    const container = refContainer.current;
    const navTitle = refNavTitle.current;
    if (!container || !navTitle) return;

    let isScrollingByContainer = false;
    let isScrollingByNavTitle = false;

    const handleContainerScroll = () => {
      if (isScrollingByNavTitle) return;
      isScrollingByContainer = true;
      navTitle.scrollLeft = container.scrollLeft;
      isScrollingByContainer = false;
    };

    const handleNavTitleScroll = () => {
      if (isScrollingByContainer) return;
      isScrollingByNavTitle = true;
      container.scrollLeft = navTitle.scrollLeft;
      isScrollingByNavTitle = false;
    };

    container.addEventListener('scroll', handleContainerScroll);
    navTitle.addEventListener('scroll', handleNavTitleScroll);

    return () => {
      container.removeEventListener('scroll', handleContainerScroll);
      navTitle.removeEventListener('scroll', handleNavTitleScroll);
    };
  }, []);

  return <div className={styles.graphBox}>
    {state?.loading && <div className={styles.loading}><Spin /></div>}
    <div className={styles.navBox} ref={refNavTitle}>
      <div className={styles.nav}>
        {state?.garphTitleList?.map((item: any) => (
          <div className={styles.item}>{item}</div>
        ))}
      </div>

    </div>
    <div ref={refContainer} className={styles.graph}></div>
  </div>
}