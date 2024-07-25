import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { pathname } = location;

  const handleNavigation = (path: string) => {
    if (user?.FirstName === undefined) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="flex items-center gap-9 font-medium text-primary">
      <Link
        className={`${
          pathname === "/" ? "text-[#c04751] font-semibold" : "text-black"
        } hover:text-[#c04751] transition`}
        to={"/"}
        onClick={(e) => {
          e.preventDefault();
          handleNavigation("/");
        }}
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
