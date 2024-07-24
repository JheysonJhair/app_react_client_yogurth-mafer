import React, { useContext } from "react";
// Contexto
import { ProductContext } from "../contexts/ProductContext";
// Componentes
import { Hero } from "./components/Hero";
import { Product } from "../components/sidebar/Product";

export const Home: React.FC = () => {
  const context = useContext(ProductContext);

  if (!context) {
    return <div>Cargando productos...</div>;
  }

  const { products, loading, error } = context;

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredProducts = products.filter(
    (item) => item.category === "5 stars" || item.category === "4 stars"
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
