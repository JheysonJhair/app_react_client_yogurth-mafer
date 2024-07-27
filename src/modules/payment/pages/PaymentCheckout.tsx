import { useParams } from "react-router-dom";

export const PaymentCheckout = () => {
  const { paymentOption } = useParams<{ paymentOption: string }>();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-screen-md bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          {paymentOption === "tarjeta" ? "Pago con IziPay" : "Pago con Yape"}
        </h2>
        {paymentOption === "izipay" && (
          <form>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Número de Tarjeta:
              </label>
              <input
                type="text"
                placeholder="Número de Tarjeta"
                className="appearance-none block w-full bg-gray-200 text-black border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Fecha de Expiración:
              </label>
              <input
                type="text"
                placeholder="MM/AA"
                className="appearance-none block w-full bg-gray-200 text-black border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Código de Seguridad:
              </label>
              <input
                type="text"
                placeholder="CVV"
                className="appearance-none block w-full bg-gray-200 text-black border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Completar Pago
            </button>
          </form>
        )}
        {paymentOption === "yape" && (
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <img
                src="https://montech.pe/cdn/shop/files/yap_800x.jpg?v=1704895017"
                alt="QR de Yape"
                className="w-full rounded shadow-md"
              />
            </div>
            <div className="w-1/2">
              <img
                src="../../yape.svg"
                alt="Imagen adicional"
                className="w-full rounded shadow-md mb-4"
              />
              <input
                type="file"
                className="block w-full border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
              />
              <p className="text-sm text-gray-600">
                Suba el comprobante de pago aquí.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
