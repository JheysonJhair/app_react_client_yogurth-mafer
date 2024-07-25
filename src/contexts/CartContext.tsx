import React, { createContext, useState, useEffect, ReactNode } from "react";

interface CartItem {
  IdProduct: any;
  Name: string;
  UrlImage: string;
  Price: number;
  amount: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseAmount: (id: number) => void;
  decreaseAmount: (id: number) => void;
  itemAmount: number;
  total: any;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [itemAmount, setItemAmount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.Price * currentItem.amount;
    }, 0);
    setTotal(total);
  }, [cart]);

  useEffect(() => {
    const amount = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.amount;
    }, 0);
    setItemAmount(amount);
  }, [cart]);

  const addToCart = (item: CartItem) => {
    const cartItem = cart.find((cartItem) => cartItem.IdProduct === item.IdProduct);

    if (cartItem) {
      const newCart = cart.map((cartItem) =>
        cartItem.IdProduct === item.IdProduct
          ? { ...cartItem, amount: cartItem.amount + item.amount }
          : cartItem
      );
      setCart(newCart);
    } else {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id: number) => {
    const newCart = cart.filter((item) => item.IdProduct !== id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseAmount = (id: number) => {
    const cartItem = cart.find((item) => item.IdProduct === id);
    if (cartItem) {
      addToCart({ ...cartItem, amount: 1 });
    }
  };

  const decreaseAmount = (id: number) => {
    const cartItem = cart.find((item) => item.IdProduct === id);
    if (cartItem) {
      if (cartItem.amount < 2) {
        removeFromCart(id);
      } else {
        const newCart = cart.map((item) =>
          item.IdProduct === id ? { ...item, amount: item.amount - 1 } : item
        );
        setCart(newCart);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
