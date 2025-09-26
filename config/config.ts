import { defineConfig } from "@umijs/max";
import defaultSettings from "./defaultSettings";
import routes from "./routes";
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: defaultSettings,
  routes: routes,
  npmClient: "pnpm",
  // Use relative publicPath so built files can be opened from file system or served from any base path
  publicPath: './',
  tailwindcss: {},
});
