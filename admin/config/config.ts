import { defineConfig } from '@umijs/max';
import defaultSettings from './defaultSettings';
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: defaultSettings,
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页asdasd',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'pnpm',
});
