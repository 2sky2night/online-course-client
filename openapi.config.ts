import { generateService } from "@umijs/openapi";

generateService({
  schemaPath: "http://localhost:3000/docs-json",
  serversPath: "./src/servers",
});
