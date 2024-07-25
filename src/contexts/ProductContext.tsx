import React, { createContext, useState, useEffect, ReactNode } from "react";

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface ProductContextType {
  products: Product[];
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      
      const data: Product[] = [
        {
          id: 1,
          title: "Yogurt Griego Natural",
          price: 2.99,
          description: "Yogurt griego natural sin azúcares añadidos. Ideal para un desayuno saludable.",
          category: "5 stars",
          image: "https://montefino.pe/wp-content/uploads/2023/08/yogurt-fresa-1.png",
          rating: {
            rate: 4.8,
            count: 150
          }
        },
        {
          id: 2,
          title: "Yogurt con Frutos Rojos",
          price: 3.49,
          description: "Delicioso yogurt con una mezcla de frutos rojos y un toque de miel.",
          category: "5 stars",
          image: "https://montefino.pe/wp-content/uploads/2023/08/yogurt-fresa-1.png",
          rating:  {
            rate: 4.7,
            count: 200
          }
        },
        {
          id: 3,
          title: "Yogurt Natural Descremado",
          price: 2.49,
          description: "Yogurt descremado con un sabor suave y bajo en grasa. Perfecto para una dieta equilibrada.",
          category: "Descremado",
          image: "https://montefino.pe/wp-content/uploads/2023/08/yogurt-fresa-1.png",
          rating: {
            rate: 4.6,
            count: 120
          }
        },
        {
          id: 4,
          title: "Yogurt con Miel",
          price: 3.29,
          description: "Yogurt cremoso con un toque dulce de miel natural.",
          category: "5 stars",
          image: "https://montefino.pe/wp-content/uploads/2023/08/yogurt-fresa-1.png",
          rating: {
            rate: 4.5,
            count: 90
          }
        },
        {
          id: 5,
          title: "Yogurt con Granola",
          price: 3.99,
          description: "Yogurt con granola crujiente y frutas. Ideal para un desayuno energético.",
          category: "Granola",
          image: "https://montefino.pe/wp-content/uploads/2023/08/yogurt-fresa-1.png",
          rating: {
            rate: 4.8,
            count: 180
          }
        },
        {
          id: 6,
          title: "Yogurt de Coco",
          price: 3.59,
          description: "Yogurt cremoso con sabor a coco, sin azúcares añadidos.",
          category: "Exótico",
          image: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/tottusPE/42703127_1/w=800,h=800,fit=pad",
          rating: {
            rate: 4.7,
            count: 140
          }
        },
        {
          id: 7,
          title: "Yogurt con Manzana y Canela",
          price: 3.39,
          description: "Yogurt con sabor a manzana y un toque de canela, perfecto para cualquier momento del día.",
          category: "5 stars",
          image: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/tottusPE/42703127_1/w=800,h=800,fit=pad",
          rating: {
            rate: 4.6,
            count: 110
          }
        },
        {
          id: 8,
          title: "Yogurt Vegano",
          price: 4.19,
          description: "Yogurt vegano a base de leche de almendras, sin lactosa y sin azúcares añadidos.",
          category: "5 stars",
          image: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/tottusPE/42703127_1/w=800,h=800,fit=pad",
          rating: {
            rate: 4.5,
            count: 95
          }
        }
      ];
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;


