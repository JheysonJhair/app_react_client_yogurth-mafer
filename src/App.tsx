import AppRouter from "./routes";
import { AuthProvider } from "./contexts/AuthContext";


import ProductProvider from "./contexts/ProductContext";

import "./index.css";
import { CartProvider } from "./contexts/CartContext";
import SidebarProvider from "./contexts/SidebarContext";
function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <CartProvider>
          <ProductProvider>
            <AppRouter />
          </ProductProvider>
        </CartProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
