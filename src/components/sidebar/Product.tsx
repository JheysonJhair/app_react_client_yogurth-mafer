import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsPlus, BsEyeFill, BsStarFill } from "react-icons/bs";
import { CartContext } from "../../contexts/CartContext";

// Define the types for product props
interface ProductProps {
  id: number;
  image: string;
  category: string;
  title: string;
  price: number;
  amount: number;
}

// Define the type for the component props
interface ProductComponentProps {
  product: ProductProps;
}

export const Product: React.FC<ProductComponentProps> = ({ product }) => {
  const context = useContext(CartContext);

  // Ensure context is defined
  if (!context) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const { addToCart } = context;
  const { id, image, category, title, price } = product;
  const location = useLocation(); // Get current location

  // Function to render stars based on rating
  const renderStars = (stars: string) => {
    const starCount = parseInt(stars, 10); // Convert text to number
    return (
      <div className="flex items-center">
        {[...Array(starCount)].map((_, index) => (
          <BsStarFill key={index} className="text-yellow-500 text-sm mr-1" />
        ))}
      </div>
    );
  };

  return (
    <div className="border border-gray-100 rounded-lg shadow-md overflow-hidden">
      {/* Image and buttons */}
      <div className="relative group transition duration-300 hover:shadow-lg">
      <img
          className="bject-containw-full h-48 transition-transform transform hover:scale-110"
          src={image}
          alt={title}
        />
        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => addToCart(product)}
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
      {/* Product information */}
      <div className="p-4">
        {location.pathname === "/" && ( // Check if the route is "/"
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
