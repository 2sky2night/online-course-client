import type { RouteObject } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import { rootRoutes } from "./routes";

const router = createBrowserRouter(rootRoutes as RouteObject[]);

export default router;
