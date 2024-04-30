import { resolve } from "node:path";
import { defineConfig, UserConfig, ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }: ConfigEnv) => {
  const { default: entryConfig } = await import(`./${mode}.config.js`);
  const config: UserConfig = {
    plugins: [
      react(),
      eslintPlugin({
        include: [
          "src/**/*.ts",
          "src/**/*.tsx",
          "src/*.tsx",
          "src/*.ts",
          "src/**/*.js",
          "src/**/*.jsx",
          "src/*.jsx",
          "src/*.js",
        ],
      }),
    ],
    // 环境变量路径
    envDir: resolve(__dirname, "../env"),
    // 修改项目根路径
    root: resolve(__dirname, "../src"),
    // 打包路径
    build: {
      outDir: resolve(__dirname, `../${entryConfig.outDir}`),
    },
    // 路径别名
    resolve: {
      alias: {
        "@": resolve(__dirname, "../src"),
        "@request": resolve(__dirname, "../src/utils/request/index.ts"),
      },
    },
    // 定义全局变量
    define: {
      "import.meta.env.HTML_TITLE": JSON.stringify(entryConfig.title),
    },
  };
  if (command === "serve") {
    config.server = entryConfig.devServer;
    return config;
  } else {
    return config;
  }
});
