import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsPlus, BsEyeFill, BsStarFill } from 'react-icons/bs';
import { CartContext } from '../../contexts/CartContext';

interface ProductProps {
  product: {
    id: number;
    image: string;
    category: string;
    title: string;
    price: number;
  };
}

export const Product: React.FC<ProductProps> = ({ product }) => {
  const { addToCart } = useContext(CartContext)!;
  const { id, image, category, title, price } = product;
  const location = useLocation(); 

  const renderStars = (stars: string) => {
    const starCount = parseInt(stars, 10); 
    return (
      <div className="flex items-center">
        {[...Array(starCount)].map((_, index) => (
          <BsStarFill key={index} className="text-yellow-500 text-sm mr-1" />
        ))}
      </div>
    );
  };

  const handleAddToCart = () => {
    const item = { id, image, category, title, price, amount: 1 };
    addToCart(item); 
  };

  return (
    <div className="border border-gray-100 rounded-lg shadow-md overflow-hidden">
      <div className="relative group transition duration-300 hover:shadow-lg">
        <img
          className="object-contain object-center w-full h-48 transition-transform transform hover:scale-110"
          src={image}
          alt={title}
        />
        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleAddToCart}
            className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
          >
            <BsPlus className="text-2xl" />
          </button>
          <Link
            to={`/product/${id}`}
            className="bg-[#34b7a1] text-[#263D49] rounded-full p-2 hover:bg-[#247366] transition-colors shadow-md hover:shadow-lg"
          >
            <BsEyeFill className="text-2xl" />
          </Link>
        </div>
      </div>
      <div className="p-4">
        {location.pathname === "/" && ( 
          <div className="text-sm text-gray-500 capitalize mb-1">
            {renderStars(category)}
          </div>
        )}
        <Link to={`/product/${id}`} className="block mb-2">
          <h2 className="text-lg font-semibold text-primary hover:text-primary transition-colors">
            {title}
          </h2>
        </Link>
        <div className="text-lg font-semibold text-primary">${price}</div>
      </div>
    </div>
  );
};
