import React, { createContext, useState, useEffect, ReactNode } from "react";
import { addToCart as addToCartService } from "../services/Cart"; 
import { User } from "../types/User";

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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.Price * currentItem.amount;
    }, 0);
    setTotal(total);
    console.log("Total actualizado:", total);
  }, [cart]);

  useEffect(() => {
    const amount = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.amount;
    }, 0);
    setItemAmount(amount);
    console.log("Cantidad de artículos actualizada:", amount);
  }, [cart]);

  useEffect(() => {
    console.log("Carrito actualizado:", cart);
  }, [cart]);

  const sendCartUpdate = async (idProduct: number, quantity: number) => {
    if (user) {
      const request = {
        IdUser: user?.IdUser,
        IdProduct: idProduct,
        Quantity: quantity,
      };

      try {
        console.log("envando"+request);
        const response = await addToCartService(request);
        console.log(response)
      } catch (error) {
        console.error("Error al actualizar el carrito:", error);
      }
    } else {
      console.log("No hay usuario autenticado");
    }
  };

  const addToCart = (item: CartItem) => {
    const cartItem = cart.find((cartItem) => cartItem.IdProduct === item.IdProduct);

    if (cartItem) {
      const newCart = cart.map((cartItem) =>
        cartItem.IdProduct === item.IdProduct
          ? { ...cartItem, amount: cartItem.amount + item.amount }
          : cartItem
      );
      setCart(newCart);
      console.log("Cantidad aumentada para el artículo:", item.IdProduct, "Nueva cantidad:", cartItem.amount + item.amount, "Artículo actualizado:", newCart.find(i => i.IdProduct === item.IdProduct));
      sendCartUpdate(item.IdProduct, cartItem.amount + item.amount); // Envía la actualización a la API
    } else {
      setCart([...cart, item]);
      console.log("Artículo nuevo añadido al carrito:", item);
      sendCartUpdate(item.IdProduct, item.amount); // Envía la adición a la API
    }
  };

  const removeFromCart = (id: number) => {
    const removedItem = cart.find((item) => item.IdProduct === id);
    const newCart = cart.filter((item) => item.IdProduct !== id);
    setCart(newCart);
    if (removedItem) {
      console.log("Artículo eliminado del carrito:", removedItem);
    } else {
      console.log("Artículo no encontrado en el carrito:", id);
    }
  };

  const clearCart = () => {
    setCart([]);
    console.log("Carrito vaciado");
  };

  const increaseAmount = (id: number) => {
    const cartItem = cart.find((item) => item.IdProduct === id);
    if (cartItem) {
      const newCart = cart.map((item) =>
        item.IdProduct === id ? { ...item, amount: item.amount + 1 } : item
      );
      setCart(newCart);
      console.log("Cantidad aumentada para el artículo:", id, "Detalles del artículo nuevo:", newCart.find(i => i.IdProduct === id));
      sendCartUpdate(id, cartItem.amount + 1); // Envía la actualización a la API
    } else {
      console.log("Artículo no encontrado en el carrito para aumentar:", id);
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
        console.log("Cantidad disminuida para el artículo:", id, "Detalles del artículo nuevo:", newCart.find(i => i.IdProduct === id));
        sendCartUpdate(id, cartItem.amount - 1); // Envía la actualización a la API
      }
    } else {
      console.log("Artículo no encontrado en el carrito para disminuir:", id);
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
