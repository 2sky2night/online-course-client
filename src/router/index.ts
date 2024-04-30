import { createBrowserRouter } from "react-router-dom";
import { rootRoutes } from "./routes";
import type { RouteObject } from "react-router-dom";

const router = createBrowserRouter(rootRoutes as RouteObject[]);

export default router;
