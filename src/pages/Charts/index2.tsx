import { Rect as GRect, Text as GText } from '@antv/g';
import {
  Badge,
  CommonEvent,
  ExtensionCategory,
  Graph,
  GraphEvent,
  iconfont,
  Label,
  Rect,
  register,
  treeToGraphData,
} from '@antv/g6';
import { useEffect, useRef } from 'react';
import { ReactNode } from '@antv/g6-extension-react'



export default () => {
  const ref = useRef(null)
  const init = () => {
    register(ExtensionCategory.NODE, 'react-node', ReactNode);
    fetch('https://assets.antv.antgroup.com/g6/decision-tree.json')
      .then((res) => res.json())
      .then((data) => {
        const graph = new Graph({
          container: ref.current,
          data: treeToGraphData(data),
          y: 0,
          x: 0,
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

        graph.once(GraphEvent.AFTER_RENDER, () => {
          // graph.fitView();
        });

        graph.render();
      });
  }
  useEffect(() => {
    init()
  }, [])
  return <div ref={ref} style={{ width: '1200px', height: '600px', position: 'relative' }}></div>
}