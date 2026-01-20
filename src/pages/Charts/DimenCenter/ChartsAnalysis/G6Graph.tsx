import { useEffect, useRef } from 'react';
import styles from './index.module.less';
import { ExtensionCategory, Graph, GraphEvent, register, treeToGraphData } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react'
import { chartsData, getChartsData } from './const';
import { useSetState } from 'ahooks';
register(ExtensionCategory.NODE, 'react-node', ReactNode);

export default () => {
  const refGraph = useRef<Graph | null>(null);
  const ref = useRef<any>(null)
  const [state, setState] = useSetState<any>({
    chartsData: {}
  })
  const initGraph = () => {
    const graph = new Graph({
      container: ref.current,
      x: 0,
      y: 0,
      animation: false,
      node: {
        animation: {
          update: 'fade' // 使用平移动画
        },
        type: 'react-node',
        style: {
          draggable: true,
          port: true,
          ports: [
            { key: 'right', placement: 'right' },
            { key: 'left', placement: 'left' }
          ],
          component: node => {
            return <>123465</>
          }
        }
      },
      edge: {
        type: 'cubic-horizontal',
        style: {
          stroke: '#CED4D9',
        },
        animation: {
          enter: false
        },
      },
      layout: {
        type: 'indented',
        direction: 'LR',
        dropCap: false,
        indent: 300,
        getHeight: () => 60,
        preLayout: false,
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
    });
    refGraph.current = graph;
  }
  const getChartsDataInit = async () => {
    const res = await getChartsData()
    console.error(res)
    setState({
      chartsData: res
    })
  }

  useEffect(() => {
    getChartsDataInit()
  }, [])

  useEffect(() => {
    if (!refGraph.current) return;
    const { chartsData } = state
    const graph = refGraph.current;
    graph.setData(treeToGraphData(chartsData));
    graph.render();
  }, [chartsData, refGraph?.current])



  useEffect(() => {
    if (!ref.current) return;
    initGraph();
  }, [ref?.current])
  return <div ref={ref} className={styles.graphBox}></div>
}