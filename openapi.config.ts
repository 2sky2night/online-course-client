import { generateService } from "@umijs/openapi";

generateService({
  // 文档的json路径
  schemaPath: "http://localhost:3000/docs-json",
  // 请求文件夹路径
  serversPath: "./src/servers",
  // 自定义网络请求函数路径
  requestImportStatement: 'import request from "@request"',
  // 项目文件夹
  projectName: "go_study_server",
});
