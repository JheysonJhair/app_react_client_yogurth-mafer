import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// contexts
import { SidebarContext } from "../../contexts/SidebarContext";
import { CartContext } from "../../contexts/CartContext";
// componentes
import { Navbar } from "./NavBar";
// iconos
import { BsBag } from "react-icons/bs";
// logo
import Logo from "../../assets/img/logo.png";

export const Header: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  // Usa SidebarContext con chequeo de tipo
  const sidebarContext = useContext(SidebarContext);
  if (!sidebarContext) {
    throw new Error("SidebarContext must be used within a SidebarProvider");
  }
  const { isOpen, setIsOpen } = sidebarContext;

  // Usa CartContext
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }
  const { totalAmount } = cartContext; // Usa totalAmount en lugar de itemAmount

  // event listener
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        isActive ? "bg-[#E5E4E2] py-4 shadow-md" : "bg-[#F8F8F8] py-6"
      } fixed w-full z-10 transition-all border-b border-gray-200`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        {/* Logo */}
        <Link to={"/"}>
          <div className="flex items-center gap-4">
            <img className="w-[35px]" src={Logo} alt="Logo" />
            <h2 className="text-black uppercase text-xl font-bold">Yogurt Mafer</h2>
          </div>
        </Link>

        {/* Menu */}
        <div className="flex gap-10">
          <div className="absolute right-0 left-0 h-full -bottom-[70px] flex justify-center sm:bg-none sm:relative sm:right-0 sm:bottom-0">
            <Navbar />
          </div>
          {/* Carrito de compra */}
          <div
            className="cursor-pointer flex relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            <BsBag className="text-2xl" />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              {totalAmount} {/* Usa totalAmount en lugar de itemAmount */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
