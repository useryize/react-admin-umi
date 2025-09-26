// 运行时配置

import { matchRoutes, type RunTimeLayoutConfig } from "@umijs/max";


// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    title: 'umi4',
    menu: {
      locale: false,
    },
    layout: 'top',
    contentWidth: 'Fluid',
    fixedHeader: true,
    childrenRender: (children) => {
      return <>
        {children}
      </>
    }
  };
};

/**
 * 在初始加载和路由切换时做一些事情。
 * @param options - 包含路由配置和位置信息的对象
 * @param options.clientRoutes - 客户端路由配置数组
 * @param options.location - 当前位置对象
 */
export const onRouteChange = ({ clientRoutes, location }: { clientRoutes: any[]; location: Location }) => {
  const route: any = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
  if (route) {
    document.title = route?.name
  }
}