import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { CartContext } from "../../contexts/CartContext";

interface CartItemProps {
  item: {
    IdProduct: number;
    Name: string;
    UrlImage: string;
    Price: number;
    amount: number;
  };
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext)!;

  const { IdProduct, Name, UrlImage, Price, amount } = item;

  return (
    <div className="flex gap-x-4 py-2 lg:px-1 border-b border-[#373739] w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <Link to={`/product/${IdProduct}`}>
          <img className="max-w-[80px]" src={UrlImage} alt={Name} />
        </Link>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            <Link
              to={`/product/${IdProduct}`}
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
            >
              {Name}
            </Link>
            <div
              onClick={() => removeFromCart(IdProduct)}
              className="text-xl cursor-pointer"
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>

          <div className="flex gap-x-2 h-[36px] text-sm">
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              <div
                onClick={() => decreaseAmount(IdProduct)}
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
              >
                <IoMdRemove />
              </div>
              <div className="h-full flex justify-center items-center px-2">
                {amount}
              </div>
              <div
                onClick={() => increaseAmount(IdProduct)}
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
              >
                <IoMdAdd />
              </div>
            </div>

            <div className="flex flex-1 items-center justify-around">
              $ {Price}
            </div>
            <div className="flex-1 flex justify-end items-center text-primary font-medium">
              {`$ ${parseFloat((Price * amount).toFixed(2))}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
