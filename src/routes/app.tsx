import AppLayout from "../layouts/AppLayout";
import { Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { Products } from "../modules/Product/pages/Products";
import { AboutUs } from "../modules/about-us/pages/AboutUs";
import { Blog } from "../modules/bloc/pages/Blog";
import { Contact } from "../modules/contact/pages/Contact";


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
        path: "/login",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];

export default appRouter;
