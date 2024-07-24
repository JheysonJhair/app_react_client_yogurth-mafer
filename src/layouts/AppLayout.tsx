import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";

function AppLayout() {
  return (
    <div className="overflow-hidden">
      <Header></Header>
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
