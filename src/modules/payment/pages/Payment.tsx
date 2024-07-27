import { useState, useEffect } from "react";
import { getCartByUserId } from "../../../services/Cart";
import { User } from "../../../types/User";
import { useNavigate } from "react-router-dom";
import "../style.css";  

interface Product {
  IdProduct: number;
  Name: string;
  Price: number;
  UrlImage: string;
}

interface CartItemResponse {
  IdCartItem: number;
  Quantity: number;
  Product: Product;
}

export const Payment = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selection, setSelection] = useState("recoger");
  const [store, setStore] = useState("");
  const [department, setDepartment] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const departments = ["Departamento 1", "Departamento 2"];
  const provinces = ["Provincia 1", "Provincia 2"];
  const districts = ["Distrito 1", "Distrito 2"];
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        if (parsedUser.IdUser) {
          loadCartItems(parsedUser.IdUser);
        }
      }
    };
    fetchUser();
  }, []);

  const loadCartItems = async (userId: number) => {
    setIsLoading(true);
    try {
      const data = await getCartByUserId(userId);
      setCartItems(data.data || []);
      setError(null);
    } catch (error) {
      setError("Error al obtener el carrito");
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartment(e.target.value);
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProvince(e.target.value);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handlePaymentOption = (option: string) => {
    handleCloseModal();
    navigate(`/payment/checkout/${option}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selection === "recoger" && !store) {
      console.log("Por favor, seleccione una sede.");
      return;
    }

    if (selection === "envio") {
      if (!department || !province || !district) {
        console.log("Por favor, complete todos los campos de dirección.");
        return;
      }
    }

    handleShowModal();
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.Quantity * item.Product.Price,
      0
    );
  };
  return (
    <div className="flex justify-center pt-20 items-center min-h-screen bg-gray-100 p-4">
      <div className="flex w-full max-w-screen-lg">
        <div className="w-full md:w-7/12 bg-white p-6 rounded shadow-lg">
          <div className="mb-10">
            <h3
              className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-white"
              style={{ color: "#373739", marginRight: "auto" }}
            >
              Págalo<span className="text-primary"> ya</span>
            </h3>
            <div className="mt-4">
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="delivery"
                  value="recoger"
                  checked={selection === "recoger"}
                  onChange={() => setSelection("recoger")}
                  className="form-radio text-primary"
                />
                <span className="ml-2">RECOJO EN TIENDA</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  name="delivery"
                  value="envio"
                  checked={selection === "envio"}
                  onChange={() => setSelection("envio")}
                  className="form-radio text-primary"
                />
                <span className="ml-2">ENVIOS</span>
              </label>
            </div>
          </div>

          <form className="w-full" onSubmit={handleSubmit}>
            {selection === "recoger" && (
              <>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full px-3 mb-2">
                    <label
                      className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                      htmlFor="full-name"
                    >
                      Nombres y Apellidos:
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="full-name"
                      type="text"
                      placeholder="Ingrese nombres y apellidos"
                      value={user?.FirstName + " " + user?.LastName}
                      disabled
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-2">
                    <label
                      className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                      htmlFor="phone"
                    >
                      Teléfono:
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="phone"
                      type="text"
                      placeholder="Ingrese teléfono"
                      value={user?.Phone}
                      disabled
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                      htmlFor="dni"
                    >
                      DNI:
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="dni"
                      type="text"
                      placeholder="Ingrese DNI"
                      value={user?.Dni}
                      disabled
                    />
                  </div>
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                      htmlFor="store"
                    >
                      Sede:
                    </label>
                    <select
                      id="store"
                      value={store}
                      onChange={(e) => setStore(e.target.value)}
                      className="appearance-none block w-full bg-gray-50 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="">Seleccione una sede</option>
                      <option value="sede1">Sede 1</option>
                      <option value="sede2">Sede 2</option>
                      <option value="sede3">Sede 3</option>
                    </select>
                  </div>
                </div>
              </>
            )}
            {selection === "envio" && (
              <>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full px-3 mb-2">
                    <label
                      className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                      htmlFor="full-name"
                    >
                      Nombres y Apellidos:
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="full-name"
                      type="text"
                      placeholder="Ingrese nombres y apellidos"
                      value={user?.FirstName + " " + user?.LastName}
                      disabled
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-2">
                    <label
                      className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                      htmlFor="phone"
                    >
                      Teléfono:
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="phone"
                      type="text"
                      placeholder="Ingrese teléfono"
                      value={user?.Phone}
                      disabled
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-2">
                    <label
                      className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                      htmlFor="dni"
                    >
                      DNI:
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="dni"
                      type="text"
                      placeholder="Ingrese DNI"
                      value={user?.Dni}
                      disabled
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-2">
                    <label
                      className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                      htmlFor="department"
                    >
                      Departamento:
                    </label>
                    <select
                      id="department"
                      value={department}
                      onChange={handleDepartmentChange}
                      className="appearance-none block w-full bg-gray-50 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="">Seleccione</option>
                      {departments.map((dep) => (
                        <option key={dep} value={dep}>
                          {dep}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-2">
                    <label
                      className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                      htmlFor="province"
                    >
                      Provincia:
                    </label>
                    <select
                      id="province"
                      value={province}
                      onChange={handleProvinceChange}
                      className="appearance-none block w-full bg-gray-50 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="">Seleccione</option>
                      {provinces.map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-2">
                    <label
                      className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                      htmlFor="district"
                    >
                      Distrito:
                    </label>
                    <select
                      id="district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="appearance-none block w-full bg-gray-50 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="">Seleccione</option>
                      {districts.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark focus:outline-none focus:bg-primary-dark"
              >
                Realizar Pedido
              </button>
            </div>
          </form>
        </div>

        <div className="w-full md:w-5/12 bg-gray-200 p-6 rounded shadow-lg ml-4">
          <h4 className="text-xl font-bold mb-4">Resumen del Pedido</h4>
          {isLoading && <p>Cargando...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="overflow-y-auto max-h-96">
            {cartItems.map((item) => (
              <div
                key={item.IdCartItem}
                className="flex items-center mb-4 p-4 bg-white border border-gray-300 rounded"
              >
                <img
                  src={item.Product.UrlImage}
                  alt={item.Product.Name}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div className="flex-grow">
                  <h5 className="text-lg font-semibold">{item.Product.Name}</h5>
                  <p className="text-sm text-gray-600">
                    {item.Quantity} x ${item.Product.Price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    S/{(item.Quantity * item.Product.Price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <p className="text-lg font-bold">
              Total: S/{calculateTotal().toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="custom-modal-overlay" onClick={handleCloseModal}>
          <div
            className="custom-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="custom-modal-close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>OPCIONES DE PAGO</h2>
            <div className="custom-modal-body">
              <button
                className="custom-modal-button"
                onClick={() => handlePaymentOption("izipay")}
              >
                <img
                  src="https://izipayweb.izipay.pe/dist/images/imagen.png"
                  alt="IziPay"
                  className="custom-modal-image"
                />
                <div className="custom-modal-text">Pagar con IziPay</div>
              </button>
              <button
                className="custom-modal-button"
                onClick={() => handlePaymentOption("yape")}
              >
                <img
                  src="https://i.ytimg.com/vi/DQudL7xbvOM/maxresdefault.jpg"
                  alt="Yape"
                  className="custom-modal-image"
                />
                <div className="custom-modal-text">Pagar con Yape</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
