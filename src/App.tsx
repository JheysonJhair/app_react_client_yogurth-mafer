import AppRouter from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import ProductProvider from "./contexts/ProductContext";
import SidebarProvider from "./contexts/SidebarContext";
import CartProvider from "./contexts/CartContext";

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
