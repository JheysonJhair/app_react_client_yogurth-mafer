import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { HeaderPayment } from "../components/header/HeaderPayment";
import { FaWhatsapp } from "react-icons/fa";

function AppLayout() {
  const location = useLocation();
  const isPaymentPage = location.pathname.startsWith("/payment");

  const whatsappNumber = "983805438";
  const whatsappMessage = "Requiero tus productos Agroindustrias MAFER";
  const whatsappLink = `https://wa.me/51${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="overflow-hidden relative min-h-screen">
      {!isPaymentPage && <Header />}
      {!isPaymentPage && <Sidebar />}
      {isPaymentPage && <HeaderPayment />}
      <Outlet />
      {!isPaymentPage && <Footer />}
      
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp className="text-white" size={30} />
      </a>
    </div>
  );
}

export default AppLayout;
