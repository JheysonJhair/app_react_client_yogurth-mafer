import AppLayout from "../layouts/AppLayout";
import { Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { Product } from "../modules/Product/pages/Product";


const appRouter = [
  {
    path: "/",
    element: (
        <AppLayout />
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];

export default appRouter;
