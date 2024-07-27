import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/img/logo.png";

export const HeaderPayment: React.FC = () => {
  return (
    <>
      <header
        className={`${"bg-[#F8F8F8] py-6"} fixed w-full z-10 transition-all border-b border-gray-200`}
      >
        <div className="container mx-auto flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <img className="w-[35px]" src={Logo} alt="Logo" />
            <h2 className="text-black uppercase text-xl font-bold">
              Yogurt Mafer
            </h2>
          </div>

          <div className="flex gap-8">
            <div className="absolute right-0 left-0 h-full -bottom-[70px] flex justify-center sm:bg-none sm:relative sm:right-0 sm:bottom-0">
              <Link to={"/"}>Cancelar</Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
