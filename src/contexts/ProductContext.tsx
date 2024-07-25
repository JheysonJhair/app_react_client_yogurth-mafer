import React, { createContext, useState, useEffect, ReactNode } from "react";
import { fetchProducts } from "../services/Product";



interface Product {
  IdProduct: number;
  Name: string;
  Price: number;
  Description: string;
  Category: string;
  UrlImage: string;
}

interface ProductContextType {
  products: Product[];
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;


