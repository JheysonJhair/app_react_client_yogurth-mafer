import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <nav className="flex items-center gap-9 font-medium text-primary">
      <Link
        className={`${
          pathname === "/" ? "text-[#FBC450]" : "text-white"
        } hover:text-[#FBC450] transition`}
        to={"/"}
      >
        Inicio
      </Link>
      <Link
        className={`${
          pathname === "/about" ? "text-[#FBC450]" : "text-white"
        } hover:text-[#FBC450] transition`}
        to={"/about"}
      >
        Nosotros
      </Link>
      <Link
        className={`${
          pathname === "/products" ? "text-[#FBC450]" : "text-white"
        } hover:text-[#FBC450] transition`}
        to={"/products"}
      >
        Cursos
      </Link>
      <Link
        className={`${
          pathname === "/contact" ? "text-[#FBC450]" : "text-white"
        } hover:text-[#FBC450] transition`}
        to={"/contact"}
      >
        Contáctanos
      </Link>
    </nav>
  );
};
