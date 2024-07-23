import { useRoutes } from "react-router-dom";

import appRouter from "./app";

function AppRouter() {
  return useRoutes([ ...appRouter]);
}

export default AppRouter;