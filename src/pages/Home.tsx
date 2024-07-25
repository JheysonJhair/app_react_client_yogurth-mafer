import React, { useContext } from "react";

import { ProductContext } from "../contexts/ProductContext";
import { Hero } from "./components/Hero";
import { Product } from "../components/sidebar/Product";

interface Product {
  id: number;
  image: string;
  category: string;
  title: string;
  price: number;
}

export const Home: React.FC = () => {
  const { products } = useContext(ProductContext)!;

  const filteredProducts = products.filter(
    (item: Product) =>
      item.category === "5 stars" || item.category === "4 stars"
  );

  return (
    <>
      <Hero />
      <section className="py-16 bg-[#fff]">
        <div className="container mx-auto">
          <h1 className="uppercase mb-6 font-bold text-2xl text-primary">
            Productos destacados
          </h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
