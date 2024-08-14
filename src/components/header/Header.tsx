import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import Swal from "sweetalert2";

import { SidebarContext } from "../../contexts/SidebarContext";
import { CartContext } from "../../contexts/CartContext";
import { Navbar } from "./NavBar";

import { Login, User } from "../../types/User";
import { login } from "../../services/Login";
import {
  registerUser,
  sendVerificationEmail,
  updatePasswordUser,
  verifyCode,
} from "../../services/Usuario";

import {
  validateRequiredField,
  validateDNI,
  validateEmail,
  validatePhoneNumber,
  validatePassword,
} from "../../utils/validations";

import Logo from "../../assets/img/logo.png";

export const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"login" | "register" | "reset">(
    "login"
  );

  const [formData, setFormData] = useState<any>({});

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const [step, setStep] = useState<number>(0);

  const { isOpen, setIsOpen } = useContext(SidebarContext)!;
  const { itemAmount } = useContext(CartContext)!;

  //---------------------------------------------------------------- GET USER LOCAL STORAGE
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  //---------------------------------------------------------------- SCROLL
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //----------------------- LOGIN? REGISTER?
  const handleShowModal = (type: "login" | "register" | "reset") => {
    setModalType(type);
    setShowModal(true);
    if (type === "register" || type === "reset") {
      setStep(0);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  //----------------------- CHANGE INPUT
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //----------------------- VALIDATE FORM
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const requiredFields = ["email", "password"];

    if (modalType === "register") {
      requiredFields.push(
        "firstName",
        "lastName",
        "dni",
        "address",
        "phone",
        "repeatPassword"
      );
    }

    requiredFields.forEach((field) => {
      const error = validateRequiredField(formData[field]);
      if (error) newErrors[field] = error;
    });

    if (formData.email) {
      const emailError = validateEmail(formData.email);
      if (emailError) newErrors.email = emailError;
    }

    if (formData.dni) {
      const dniError = validateDNI(formData.dni);
      if (dniError) newErrors.dni = dniError;
    }

    if (formData.phone) {
      const phoneError = validatePhoneNumber(formData.phone);
      if (phoneError) newErrors.phone = phoneError;
    }

    if (formData.password) {
      const passwordError = validatePassword(formData.password);
      if (passwordError) newErrors.password = passwordError;
    }

    if (
      (modalType === "register" &&
        formData.password !== formData.repeatPassword) ||
      (modalType === "reset" && formData.password !== formData.repeatPassword)
    ) {
      newErrors.repeatPassword = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //---------------------------------------------------------------- SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

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
        setFormData({});
      }
      if (modalType === "register") {
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
        setFormData({});
      }
      if (modalType === "reset") {
        const userData = {
          Email: formData.mail!,
          Password: formData.password!,
        };
        response = await updatePasswordUser(userData);
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
        setFormData({});
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Opps, algo salió mal",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  //---------------------------------------------------------------- LOGOUT - DELETE LS
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

  //---------------------------------------------------------------- POST SEND MAIL
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    if (!formData.email) {
      Swal.fire({
        title: "Campo requerido!",
        text: "Ingrese el código de verificación",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }
    setErrors({});
    try {
      console.log(formData.email);
      await sendVerificationEmail(formData.email);
      Swal.fire({
        title: "Correo Enviado!",
        text: "Hemos enviado un código de verificación a su correo.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      setStep(1);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Opps, algo salió mal",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  //---------------------------------------------------------------- POST VERIFICATE CODE
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code) {
      Swal.fire({
        title: "Campo requerido!",
        text: "Ingrese el código de verificación",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    setErrors({});
    try {
      const response = await verifyCode(formData.email, formData.code);
      if (response.value) {
        Swal.fire({
          title: "Éxito!",
          text: response.msg,
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          setStep(2);
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: response.msg,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Opps, algo salió mal",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
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

            {shouldShowNavMenu ? (
              <>
                {" "}
                <div
                  className="cursor-pointer flex relative"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <BsBag className="text-2xl" />
                  <div className="bg-red-500 absolute -right-2 -bottom-0 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                    {itemAmount}
                  </div>
                </div>
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
                      <h2 className="text-primary m-0 p-0">
                        {user?.FirstName}
                      </h2>
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
              </>
            ) : (
              <div className="flex gap-4">
                <button
                  className="border-2 border-primary text-primary px-4 py-1 rounded-md font-bold uppercase hover:bg-[#c34e54] hover:text-white transition duration-300"
                  onClick={() => handleShowModal("login")}
                >
                  Iniciar sesión
                </button>
                <button
                  className="bg-primary text-white px-4 py-1 rounded-md font-bold uppercase hover:bg-[#f25e65] transition duration-300"
                  onClick={() => handleShowModal("register")}
                >
                  Regístrate
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={"bg-white min-w-96 mx-4 rounded-lg shadow-lg "}>
            <div className="p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {modalType === "login"
                    ? "INICIAR SESIÓN"
                    : modalType === "register"
                    ? "REGISTRARSE"
                    : modalType === "reset"
                    ? "RECUPERAR CONTRASEÑA"
                    : ""}
                </h2>
                <button
                  className="text-gray-800 hover:text-gray-500"
                  onClick={handleCloseModal}
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                {modalType === "login" && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-gray-700 font-medium"
                        >
                          Correo electrónico
                        </label>

                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Ingresa tu correo electrónico"
                          className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          onChange={handleChange}
                        />
                        {errors.email && (
                          <p className="mt-1 text-red-500 text-sm">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-gray-700 font-medium"
                        >
                          Contraseña
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Ingresa tu contraseña"
                          className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          onChange={handleChange}
                        />
                        {errors.password && (
                          <p className="mt-1 text-red-500 text-sm">
                            {errors.password}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <a
                          onClick={() => handleShowModal("register")}
                          className="text-sm font-medium text-primary cursor-pointer hover:underline"
                        >
                          Regístrate aquí!
                        </a>
                        <a
                          onClick={() => handleShowModal("reset")}
                          className="text-sm font-medium text-primary cursor-pointer hover:underline"
                        >
                          ¿Olvidaste tu contraseña?
                        </a>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <button
                        type="submit"
                        className="bg-primary hover:bg-[#f25e65] text-white px-5 py-3 rounded-md font-medium transition duration-150 ease-in-out"
                      >
                        Iniciar sesión
                      </button>
                    </div>
                  </form>
                )}
                {modalType === "register" && (
                  <>
                    {step === 0 && (
                      <form onSubmit={handleSendEmail}>
                        <div className="mb-3">
                          {" "}
                          <p style={{ color: "#786463" }}>
                            Te vamos enviar un codigo de verificación para
                            verificar que eres tú!
                          </p>
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
                            value={formData.email || ""}
                            onChange={handleChange}
                          />
                          {errors.email && (
                            <p className="  text-red-500">{errors.email}</p>
                          )}
                        </div>
                        <div className="flex justify-end mb-4">
                          <a
                            onClick={() => handleShowModal("login")}
                            className="text-sm font-medium text-primary cursor-pointer hover:underline"
                          >
                            ¿Ya tienes cuenta? Iniciar sesión
                          </a>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <button
                            className="bg-primary  hover:bg-[#f25e65] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                          >
                            Recibir Código
                          </button>
                        </div>
                      </form>
                    )}
                    {step === 1 && (
                      <form onSubmit={handleVerifyCode}>
                        <div className="mb-3">
                          {" "}
                          <p style={{ color: "#786463" }}>
                            Para completar con la verificación, ingrese el
                            código de 6 dígitos.
                          </p>
                          <label htmlFor="code" className="block text-gray-700">
                            Código de Verificación
                          </label>
                          <input
                            maxLength={6}
                            id="code"
                            type="text"
                            name="code"
                            placeholder="000000"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            value={formData.code || ""}
                            onChange={handleChange}
                          />
                          {errors.code && (
                            <p className="  text-red-500">{errors.code}</p>
                          )}
                        </div>
                        <div className="flex justify-end mb-4">
                          <a
                            onClick={() => handleShowModal("login")}
                            className="text-sm font-medium text-primary cursor-pointer hover:underline"
                          >
                            ¿Ya tienes cuenta? Iniciar sesión
                          </a>
                        </div>
                        <div className="flex items-center justify-between">
                          <button
                            className="bg-primary  hover:bg-[#f25e65] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                          >
                            Verificar Código
                          </button>
                        </div>
                      </form>
                    )}
                    {step === 2 && (
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
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
                            />
                            {errors.firstName && (
                              <p className="text-red-500">{errors.firstName}</p>
                            )}
                          </div>
                          <div>
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
                            />
                            {errors.lastName && (
                              <p className="text-red-500">{errors.lastName}</p>
                            )}
                          </div>
                          <div>
                            <label
                              htmlFor="dni"
                              className="block text-gray-700"
                            >
                              DNI
                            </label>
                            <input
                              type="text"
                              id="dni"
                              name="dni"
                              placeholder="Ingresa tu DNI"
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                              onChange={handleChange}
                            />
                            {errors.dni && (
                              <p className="text-red-500">{errors.dni}</p>
                            )}
                          </div>
                          <div>
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
                            {errors.address && (
                              <p className="text-red-500">{errors.address}</p>
                            )}
                          </div>
                          <div>
                            <label
                              htmlFor="phone"
                              className="block text-gray-700"
                            >
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
                            {errors.phone && (
                              <p className="text-red-500">{errors.phone}</p>
                            )}
                          </div>
                          <div>
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
                              placeholder="Ingresa tu correo "
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                              value={formData.email || ""}
                              disabled
                            />
                            {errors.email && (
                              <p className="text-red-500">{errors.email}</p>
                            )}
                          </div>
                          <div>
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
                            />
                            {errors.password && (
                              <p className="text-red-500">{errors.password}</p>
                            )}
                          </div>
                          <div>
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
                            />

                            {errors.repeatPassword && (
                              <p className="text-red-500">
                                {errors.repeatPassword}
                              </p>
                            )}
                          </div>
                          <a
                            onClick={() => handleShowModal("login")}
                            className="text-[#1B1B1C] cursor-pointer"
                          >
                            ¿Ya tienes cuenta? Iniciar sesión
                          </a>
                        </div>
                        <div className="flex justify-end mt-4">
                          <button
                            type="submit"
                            className="bg-primary  hover:bg-[#f25e65]  text-white px-4 py-2 rounded-md"
                          >
                            Registrarse
                          </button>
                        </div>
                      </form>
                    )}
                  </>
                )}
                {modalType === "reset" && (
                  <>
                    {step === 0 && (
                      <form onSubmit={handleSendEmail}>
                        <div className="mb-3">
                          {" "}
                          <p style={{ color: "#786463" }}>
                            Te vamos enviar un codigo de verificación para
                            verificar que eres tú!
                          </p>
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
                            value={formData.email || ""}
                            onChange={handleChange}
                          />
                          {errors.email && (
                            <p className="  text-red-500">{errors.email}</p>
                          )}
                        </div>
                        <div className="flex justify-end mb-4">
                          <a
                            onClick={() => handleShowModal("login")}
                            className="text-sm font-medium text-primary cursor-pointer hover:underline"
                          >
                            ¿Ya tienes cuenta? Iniciar sesión
                          </a>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <button
                            className="bg-primary  hover:bg-[#f25e65] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                          >
                            Recibir Código
                          </button>
                        </div>
                      </form>
                    )}
                    {step === 1 && (
                      <form onSubmit={handleVerifyCode}>
                        <div className="mb-3">
                          {" "}
                          <p style={{ color: "#786463" }}>
                            Para completar con la verificación, ingrese el
                            código de 6 dígitos.
                          </p>
                          <label htmlFor="code" className="block text-gray-700">
                            Código de Verificación
                          </label>
                          <input
                            maxLength={6}
                            id="code"
                            type="text"
                            name="code"
                            placeholder="000000"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            value={formData.code || ""}
                            onChange={handleChange}
                          />
                          {errors.code && (
                            <p className="  text-red-500">{errors.code}</p>
                          )}
                        </div>
                        <div className="flex justify-end mb-4">
                          <a
                            onClick={() => handleShowModal("login")}
                            className="text-sm font-medium text-primary cursor-pointer hover:underline"
                          >
                            ¿Ya tienes cuenta? Iniciar sesión
                          </a>
                        </div>
                        <div className="flex items-center justify-between">
                          <button
                            className="bg-primary  hover:bg-[#f25e65] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                          >
                            Verificar Código
                          </button>
                        </div>
                      </form>
                    )}
                    {step === 2 && (
                      <form onSubmit={handleSubmit}>
                        <p style={{ color: "#786463" }}>
                          Restablecer contraseña para: {formData.email || ""}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
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
                            />
                            {errors.password && (
                              <p className="text-red-500">{errors.password}</p>
                            )}
                          </div>
                          <div>
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
                            />

                            {errors.repeatPassword && (
                              <p className="text-red-500">
                                {errors.repeatPassword}
                              </p>
                            )}
                          </div>
                          <a
                            onClick={() => handleShowModal("login")}
                            className="text-primary cursor-pointer"
                          >
                            ¿Ya tienes cuenta? Iniciar sesión
                          </a>
                        </div>
                        <div className="flex justify-end mt-4">
                          <button
                            type="submit"
                            className="bg-primary  hover:bg-[#f25e65]  text-white px-4 py-2 rounded-md"
                          >
                            Registrarse
                          </button>
                        </div>
                      </form>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
