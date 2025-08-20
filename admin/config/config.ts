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
  tailwindcss: {},
});
