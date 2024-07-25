// CartProvider.tsx

import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  addToCart as addToCartService,
  getCartByUserId,
  deleteCartItem,
  clearAllCartItems,
} from "../services/Cart";
import { User } from "../types/User";

interface CartItem {
  IdCartItem: number; // Incluir IdCartItem
  IdProduct: number;
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
  const [user, setUser] = useState<User | null>(null);

  //---------------------------------------------------------------- LOCAL STORAGE
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  //---------------------------------------------------------------- GET PRODUCT
  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        const result = await getCartByUserId(user.IdUser);
        console.log(result.msg);
        if (result.success && result.data) {
          const mappedCart = result.data.map((item) => ({
            IdCartItem: item.IdCartItem,
            IdProduct: item.Product.IdProduct,
            Name: item.Product.Name,
            UrlImage: item.Product.UrlImage,
            Price: item.Product.Price,
            amount: item.Quantity,
          }));
          setCart(mappedCart);
        } else {
          console.error(result.msg);
        }
      };
      fetchCart();
    }
  }, [user]);

  //-----------------------------------TOTAL & QUANTITY
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

  //---------------------------------------------------------------- ADD & UPDATE PRODUCT
  const sendCartUpdate = async (idProduct: number, quantity: number) => {
    if (user) {
      const request = {
        IdUser: user.IdUser,
        IdProduct: idProduct,
        Quantity: quantity,
      };

      try {
        const response = await addToCartService(request);
        console.log(response.msg);
      } catch (error) {
        console.error("Error al actualizar el carrito:", error);
      }
    }
  };
  //-------------------------------------- ADD
  const addToCart = (item: CartItem) => {
    const cartItem = cart.find(
      (cartItem) => cartItem.IdProduct === item.IdProduct
    );

    if (cartItem) {
      const newCart = cart.map((cartItem) =>
        cartItem.IdProduct === item.IdProduct
          ? { ...cartItem, amount: cartItem.amount + item.amount }
          : cartItem
      );
      setCart(newCart);
      sendCartUpdate(item.IdProduct, cartItem.amount + item.amount);
    } else {
      setCart([...cart, item]);
      sendCartUpdate(item.IdProduct, item.amount);
    }
  };

  //---------------------------------------------------------------- DELETE PRODUCT
  const removeFromCart = async (id: number) => {
    const removedItem = cart.find((item) => item.IdProduct === id);

    if (removedItem) {
      const result = await deleteCartItem(removedItem.IdCartItem);
      console.log(result.msg) ;
      if (result.success) {
        const newCart = cart.filter((item) => item.IdProduct !== id);
        setCart(newCart);
      } else {
        console.error(result.msg);
      }
    }
  };

  const clearCart = async () => {
    if (user) {
      const result = await clearAllCartItems(user.IdUser); 
      console.log(result.msg) ;
      if (result.success) {
        setCart([]);
      } else {
        console.error(result.msg);
      }
    }
  };
  //-------------------------------------- UPDATE
  const increaseAmount = (id: number) => {
    const cartItem = cart.find((item) => item.IdProduct === id);
    if (cartItem) {
      const newCart = cart.map((item) =>
        item.IdProduct === id ? { ...item, amount: item.amount + 1 } : item
      );
      setCart(newCart);
      sendCartUpdate(id, cartItem.amount + 1);
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
        sendCartUpdate(id, cartItem.amount - 1);
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
