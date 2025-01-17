import AppLayout from "../layouts/AppLayout";
import { Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { Products } from "../modules/Product/pages/Products";
import { AboutUs } from "../modules/about-us/pages/AboutUs";
import { Contact } from "../modules/contact/pages/Contact";
import { ProductDetails } from "../modules/Product/pages/ProductDetails";
import { Payment } from "../modules/payment/pages/Payment";
import { PaymentCheckout } from "../modules/payment/pages/PaymentCheckout";

const appRouter = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
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
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/payment/checkout/:paymentOption",
        element: <PaymentCheckout />,
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
