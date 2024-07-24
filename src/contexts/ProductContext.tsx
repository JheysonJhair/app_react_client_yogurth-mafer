import React, { createContext, useState, useEffect, ReactNode } from "react";

// Definir la interfaz para la calificación del producto
interface Rating {
  rate: number;
  count: number;
}

// Definir la interfaz para el producto
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
  amount: number; // Asegúrate de que esta propiedad esté incluida si es necesaria
}

// Definir la interfaz para el contexto del producto
interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Crear el contexto con un valor por defecto
export const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Definir los props para el proveedor del contexto
interface ProductProviderProps {
  children: ReactNode;
}

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Datos estáticos de productos
    const data: Product[] = [
      {
        id: 1,
        title: "Curso de JavaScript",
        price: 29.99,
        description: "Aprende JavaScript desde cero hasta avanzado.",
        category: "5 stars",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgMp5Cpjy96WghzX5L-VX7veRkXk3W43hR_A&s",
        rating: {
          rate: 4.5,
          count: 120
        },
        amount: 1 // Agrega un valor predeterminado para amount
      },
      {
        id: 2,
        title: "Curso de React",
        price: 39.99,
        description: "Domina React y construye aplicaciones web modernas.",
        category: "5 stars",
        image: "https://i.ytimg.com/vi/H1QR9MvQeNA/maxresdefault.jpg",
        rating: {
          rate: 4.7,
          count: 150
        },
        amount: 1 // Agrega un valor predeterminado para amount
      },
      {
        id: 3,
        title: "Curso de Node.js",
        price: 34.99,
        description: "Desarrolla aplicaciones del lado del servidor con Node.js.",
        category: "5 stars",
        image: "https://i.ytimg.com/vi/BhvLIzVL8_o/maxresdefault.jpg",
        rating: {
          rate: 4.6,
          count: 100
        },
        amount: 1 // Agrega un valor predeterminado para amount
      },
      {
        id: 9,
        title: "Curso de SQL",
        price: 24.99,
        description: "Domina SQL para manejar bases de datos eficientemente.",
        category: "database",
        image: "https://i.ytimg.com/vi/Pope-m4nuNc/maxresdefault.jpg",
        rating: {
          rate: 4.6,
          count: 120
        },
        amount: 1 // Agrega un valor predeterminado para amount
      },
      {
        id: 13,
        title: "Curso de Git",
        price: 19.99,
        description: "Control de versiones eficiente con Git.",
        category: "4 stars",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIsz8ImWvfDInJmcwLx_LAzSyiA8D5SJE-QQ&s",
        rating: {
          rate: 4.6,
          count: 140
        },
        amount: 1 // Agrega un valor predeterminado para amount
      },
      {
        id: 14,
        title: "Curso de TypeScript",
        price: 29.99,
        description: "Mejora tu JavaScript con TypeScript.",
        category: "4 stars",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJjl1gAaG-v5oFQj4Xm2pREUcewyMcdCBEEg&s",
        rating: {
          rate: 4.5,
          count: 100
        },
        amount: 1 // Agrega un valor predeterminado para amount
      },
      {
        id: 15,
        title: "Curso de Swift",
        price: 39.99,
        description: "Desarrolla aplicaciones iOS con Swift.",
        category: "mobile",
        image: "https://i.blogs.es/b72c12/hero/1366_2000.jpeg",
        rating: {
          rate: 4.7,
          count: 80
        },
        amount: 1 // Agrega un valor predeterminado para amount
      },
      {
        id: 16,
        title: "Curso de Kotlin",
        price: 34.99,
        description: "Desarrolla aplicaciones Android con Kotlin.",
        category: "mobile",
        image: "https://hackaprende.com/wp-content/uploads/2020/06/logo-curso.002.jpeg",
        rating: {
          rate: 4.6,
          count: 95
        },
        amount: 1 // Agrega un valor predeterminado para amount
      },
    ];
    
    setProducts(data);
    setLoading(false); // Cambia el estado de loading después de establecer los productos
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
