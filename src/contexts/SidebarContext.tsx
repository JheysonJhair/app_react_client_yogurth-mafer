import React, { createContext, useState, ReactNode } from "react";

// Definir la interfaz para el contexto de la barra lateral
interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
}

// Crear el contexto con un valor por defecto
export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Definir los props para el proveedor del contexto
interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, handleClose }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
