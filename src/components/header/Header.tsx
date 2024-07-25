import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { SidebarContext } from "../../contexts/SidebarContext";
import { CartContext } from "../../contexts/CartContext";
import { Navbar } from "./NavBar";
import { BsBag } from "react-icons/bs";
import Logo from "../../assets/img/logo.png";
import { Login, User } from "../../types/User";
import { login } from "../../services/Login";
import { registerUser } from "../../services/Usuario";

export const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false); 

  const { isOpen, setIsOpen } = useContext(SidebarContext)!;
  const { itemAmount } = useContext(CartContext)!;

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleShowModal = (type: "login" | "register") => {
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      modalType === "register" &&
      formData.password !== formData.repeatPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    try {
      let response;
      if (modalType === "login") {
        const loginData: Login = {
          UserRequest: formData.email!,
          Password: formData.password!,
        };
        response = await login(loginData);
        if (response.success) {
          localStorage.setItem("user", JSON.stringify(response.data));
          Swal.fire({
            title: "Correcto!",
            text: "Inicio de sesión exitoso.",
            icon: "success",
            confirmButtonText: "Aceptar",
          }).then(() => {
            handleCloseModal();
            window.location.reload();
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: response.msg,
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      } else {
        const userData: User = {
          FirstName: formData.firstName!,
          LastName: formData.lastName!,
          Dni: formData.dni!,
          Address: formData.address,
          Phone: formData.phone,
          Mail: formData.email!,
          Rol: 0,
          Password: formData.password!,
          BirthDate: "",
        };
        response = await registerUser(userData);
        if (response.success) {
          Swal.fire({
            title: "Correcto!",
            text: response.msg,
            icon: "success",
            confirmButtonText: "Aceptar",
          }).then(() => {
            handleCloseModal();
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: response.msg,
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
    Swal.fire({
      title: "Correcto!",
      text: "Has cerrado sesión.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };

  const shouldShowNavMenu = user?.FirstName;

  return (
    <>
      <header
        className={`${
          isActive ? "bg-[#E5E4E2] py-4 shadow-md" : "bg-[#F8F8F8] py-6"
        } fixed w-full z-10 transition-all border-b border-gray-200`}
      >
        <div className="container mx-auto flex items-center justify-between h-full">
          <Link to={"/"}>
            <div className="flex items-center gap-4">
              <img className="w-[35px]" src={Logo} alt="Logo" />
              <h2 className="text-black uppercase text-xl font-bold">
                Yogurt Mafer
              </h2>
            </div>
          </Link>

          <div className="flex gap-8">
            <div className="absolute right-0 left-0 h-full -bottom-[70px] flex justify-center sm:bg-none sm:relative sm:right-0 sm:bottom-0">
              <Navbar />
            </div>
            <div
              className="cursor-pointer flex relative"
              onClick={() => setIsOpen(!isOpen)}
            >
              <BsBag className="text-2xl" />
              <div className="bg-red-500 absolute -right-2 -bottom-0 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                {itemAmount}
              </div>
            </div>
            {shouldShowNavMenu ? (
              <div className="relative">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-primary m-0"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-primary m-0 p-0">{user?.Dni}</h2>
                  </div>
                </div>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <ul className="py-2">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Perfil
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Salir
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-4">
                <button
                  className="border-2 border-primary text-primary px-4 py-1 rounded-md font-bold uppercase hover:bg-[#bf5f65] hover:text-white transition duration-300"
                  onClick={() => handleShowModal("login")}
                >
                  Iniciar sesión
                </button>
                <button
                  className="bg-primary text-white px-4 py-1 rounded-md font-bold uppercase hover:bg-[#bf5f65] transition duration-300"
                  onClick={() => handleShowModal("register")}
                >
                  Registrarse
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={"bg-white min-w-96 mx-4 rounded-lg shadow-lg "}>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {modalType === "login" ? "Login" : "Register"}
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={handleCloseModal}
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {modalType === "login" ? (
                    <>
                      <div className="grid grid-cols-1 gap-6">
                        <div className="mb-4">
                          <label
                            htmlFor="email"
                            className="block text-gray-700"
                          >
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingresa tu correo electrónico"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="password"
                            className="block text-gray-700"
                          >
                            Contraseña
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingresa tu contraseña"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="mb-4">
                        <label
                          htmlFor="firstName"
                          className="block text-gray-700"
                        >
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          placeholder="Ingresa tu nombre"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="lastName"
                          className="block text-gray-700"
                        >
                          Apellido
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="Ingresa tu apellido"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="dni" className="block text-gray-700">
                          DNI
                        </label>
                        <input
                          type="text"
                          id="dni"
                          name="dni"
                          placeholder="Ingresa tu DNI"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="address"
                          className="block text-gray-700"
                        >
                          Dirección
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          placeholder="Ingresa tu dirección"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700">
                          Teléfono
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          placeholder="Ingresa tu teléfono"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Ingresa tu correo "
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="password"
                          className="block text-gray-700"
                        >
                          Contraseña
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Ingresa tu contraseña"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="repeatPassword"
                          className="block text-gray-700"
                        >
                          Repetir Contraseña
                        </label>
                        <input
                          type="password"
                          id="repeatPassword"
                          name="repeatPassword"
                          placeholder="Repite tu contraseña"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  )}
                  {error && <p className="text-red-500">{error}</p>}
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="bg-primary text-white px-4 py-2 rounded-md"
                    >
                      {modalType === "login" ? "Iniciar sesión" : "Registrarse"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
