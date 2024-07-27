import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { HeaderPayment } from "../components/header/HeaderPayment";

function AppLayout() {
  const location = useLocation();
  const isPaymentPage = location.pathname.startsWith("/payment");

  return (
    <div className="overflow-hidden">
      {!isPaymentPage && <Header />}
      {!isPaymentPage && <Sidebar />}
      {isPaymentPage && <HeaderPayment />}
      <Outlet />
      {!isPaymentPage && <Footer />}
    </div>
  );
}

export default AppLayout;
