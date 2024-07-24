import React, { createContext, useState, ReactNode } from "react";

// Define the Product type
interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  amount: number; // Required property
}

// Define the context type
interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseAmount: (id: number) => void;
  decreaseAmount: (id: number) => void;
  clearCart: () => void;
  totalAmount: number; // Change this to the property you need
  totalPrice: number;
}

// Initialize context with default values
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const increaseAmount = (id: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, amount: item.amount + 1 } : item
    ));
  };

  const decreaseAmount = (id: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.amount > 1 ? { ...item, amount: item.amount - 1 } : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.amount, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.amount, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseAmount, decreaseAmount, clearCart, totalAmount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
