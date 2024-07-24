import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <nav className="flex items-center gap-9 font-medium text-primary">
      <Link
        className={`${
          pathname === "/" ? "text-[#c04751] font-semibold" : "text-black"
        } hover:text-[#c04751] transition`}
        to={"/"}
      >
        Inicio
      </Link>
      <Link
        className={`${
          pathname === "/about-us"
            ? "text-[#c04751] font-semibold"
            : "text-black"
        } hover:text-[#c04751] transition`}
        to={"/about-us"}
      >
        Nosotros
      </Link>
      <Link
        className={`${
          pathname === "/products"
            ? "text-[#c04751] font-semibold"
            : "text-black"
        } hover:text-[#c04751] transition`}
        to={"/products"}
      >
        Productos
      </Link>
      {/* <Link
        className={`${
          pathname === "/blog" ? "text-[#c04751]" : "text-white"
        } hover:text-[#c04751] transition`}
        to={"/blog"}
      >
        Blog
      </Link> */}
      <Link
        className={`${
          pathname === "/contact"
            ? "text-[#c04751] font-semibold"
            : "text-black"
        } hover:text-[#c04751] transition`}
        to={"/contact"}
      >
        Contáctanos
      </Link>
    </nav>
  );
};
