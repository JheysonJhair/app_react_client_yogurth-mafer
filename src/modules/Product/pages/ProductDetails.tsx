import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import { ProductContext } from "../../../contexts/ProductContext";

interface Product {
  IdProduct: number;
  UrlImage: string;
  Category: string;
  Name: string;
  Price: number;
  Description: string;
  NutritionalInformation: string;
}

interface ProductContextType {
  products: Product[];
}

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useContext(ProductContext) as ProductContextType;
  const { addToCart } = useContext(CartContext)!;

  if (!id || isNaN(parseInt(id))) {
    return (
      <section className="h-screen flex justify-center items-center">
        Producto no encontrado
      </section>
    );
  }

  const product = products.find((item) => item.IdProduct === parseInt(id));

  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Cargando...
      </section>
    );
  }
  const {
    IdProduct,
    Name,
    Price,
    Description,
    Category,
    UrlImage,
    NutritionalInformation,
  } = product;

  const handleAddToCart = () => {
    const item = { IdProduct, UrlImage, Category, Name, Price, amount: 1 };
    addToCart(item);
  };
  const formatNutritionalInformation = (info: string) => {
    return info.split(",").map((line, index) => (
      <React.Fragment key={index}>
        {line.trim()}
        <br />
      </React.Fragment>
    ));
  };
  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img className="w-[400px] lg:max-w-4xl" src={UrlImage} alt={Name} />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {Name}
            </h1>
            <div className="text-xl text-red-500 font-medium mb-6">
              $ {Price}
            </div>
            <p className="mb-8 text-[#373739]">{Description}</p>
            <p className="mb-8  text-[#373739]">
              {" "}
              {formatNutritionalInformation(NutritionalInformation)}
            </p>
            <button
              onClick={() => handleAddToCart()}
              className="bg-primary py-4 px-8 text-white"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
