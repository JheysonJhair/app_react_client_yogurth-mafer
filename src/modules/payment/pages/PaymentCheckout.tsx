import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import KRGlue from "@lyracom/embedded-form-glue";
import { getFormToken, validatePayment } from "../../../services/Payment";

export const PaymentCheckout = () => {
  const { paymentOption } = useParams<{ paymentOption: string }>();
  const location = useLocation();
  const { totalAmount } = location.state as { totalAmount: number };
  console.log(totalAmount);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPaymentForm = async () => {
      if (paymentOption === "izipay") {
        try {
          const endpoint = "https://api.micuentaweb.pe";
          const publicKey =
            "85649863:testpublickey_AgmwCprcgDdTLqrOgQuHZIkHQ9lZuq1oM14KINQa1lPqH";

          const formToken = await getFormToken({
            amount: totalAmount * 100,
            currency: "PEN",
          });

          const { KR } = await KRGlue.loadLibrary(endpoint, publicKey);

          KR.setFormConfig({
            formToken: formToken,
            "kr-language": "es-PE",
          });

          KR.onSubmit(async (paymentData: any) => {
            try {
              const response = await validatePayment(paymentData);
              if (response.status === 200) {
                setMessage("¡Pago exitoso!");
              }
            } catch (error) {
              setMessage(
                "Validación fallida. Consulte la consola para obtener más detalles."
              );
            }
            return false;
          });
          setLoading(false);
          const { result } = await KR.addForm("#myPaymentForm");
          await KR.showForm(result.formId);
        } catch (error) {
          setMessage(`Oppss, algo salio mal!`);
          setLoading(false);
        }
      }
    };

    loadPaymentForm();
  }, [paymentOption, totalAmount]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-screen-md bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold m1-4">
          {paymentOption === "izipay" ? "Pago con IziPay" : "Pago con Yape"}
        </h2>
        {paymentOption === "izipay" && (
          <div className="flex items-center ">
            <div className="w-1/2">
              <img src="../../../../card.svg" alt="izipay" className="" />
            </div>
            <div className="w-1/2 flex flex-col items-center justify-center">
              {loading ? (
                <div className="loader"></div>
              ) : (
                <>
                  <div id="myPaymentForm"></div>
                  <div data-test="payment-message">{message}</div>
                </>
              )}
            </div>
          </div>
        )}
        {paymentOption === "yape" && (
          <div className="flex items-center ">
            <div className="w-1/2">
              <img
                src="https://montech.pe/cdn/shop/files/yap_800x.jpg?v=1704895017"
                alt="QR de Yape"
                className="w-3/4 rounded shadow-md mb-4"
              />
              <p>{"S/ " + totalAmount + ".00"}</p>
            </div>
            <div className="w-1/2">
              <img
                src="../../yape.svg"
                alt="Imagen adicional"
                className="w-full mb-4"
              />
              <input
                type="file"
                className="block w-full border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
              />
              <p className="text-sm text-gray-600">
                Suba el comprobante de pago aquí.
              </p>
              <button
                className=" mt-3"
                style={{
                  backgroundColor: "#c14851",
                  width: "200px",
                  color: "#fff",
                  padding: "6px 10px",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                  transition: "background-color 0.3s, transform 0.3s",
                }}
              >
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
