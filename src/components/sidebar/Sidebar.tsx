import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { CartItem } from "./CartItem";
import { SidebarContext } from "../../contexts/SidebarContext";
import { CartContext } from "../../contexts/CartContext";
import { Login, User } from "../../types/User";
import { login } from "../../services/Login";
import Swal from "sweetalert2";

interface CartItemType {
  IdProduct: number;
  UrlImage: string;
  Name: string;
  Price: number;
  amount: number;
}

export const Sidebar: React.FC = () => {
  const { isOpen, handleClose } = useContext(SidebarContext)!;
  const { cart, clearCart, total, itemAmount } = useContext(CartContext)!;
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handlePayment = () => {
    if (!user?.FirstName) {
      setShowLoginModal(true);
    } else {
      navigate("/payment");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCloseModal = () => setShowModal(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loginData: Login = {
        UserRequest: formData.email!,
        Password: formData.password!,
      };
      const response = await login(loginData);
      if (response.success) {
        handleCloseModal();
        localStorage.setItem("user", JSON.stringify(response.data));
        Swal.fire({
          title: "Correcto!",
          text: "Inicio de sesión exitoso.",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-[#EFF0EF] fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Carrito de Compra({itemAmount})
        </div>
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[500px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((item: CartItemType) => (
          <CartItem item={item} key={item.IdProduct} />
        ))}
      </div>

      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex w-full justify-between items-center">
          <div className="uppercase font-semibold">
            <span className="mr-2">Total:</span>s./ {parseFloat(total).toFixed(2)}
          </div>
          <div
            onClick={clearCart}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
          >
            <FiTrash2 />
          </div>
        </div>
        <button
          onClick={handlePayment}
          className="bg-[#373739] flex p-4 justify-center items-center text-white w-full font-medium"
        >
          Empezar a pagar
        </button>

        <a
          onClick={handleClose}
          className="bg-primary cursor-pointer flex p-4 justify-center items-center text-white w-full font-medium"
        >
          Cancelar
        </a>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-30">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-xl font-semibold">Iniciar sesión</h2>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>
            </div>
            <div className="mt-4">
              <p>Por favor, inicia sesión para continuar.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
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
                  <label htmlFor="password" className="block text-gray-700">
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
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-md"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
