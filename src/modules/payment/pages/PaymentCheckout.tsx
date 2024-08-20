import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import KRGlue from "@lyracom/embedded-form-glue";
import Swal from "sweetalert2";

import { getFormToken, validatePayment } from "../../../services/Payment";
import { insertSale } from "../../../services/Sale";

export const PaymentCheckout = () => {
  const location = useLocation();
  const { paymentOption } = useParams<{ paymentOption: string }>();

  const { totalAmount, cartId, shipmentId, seleccion, userId } =
    location.state as {
      totalAmount: number;
      cartId: number;
      shipmentId: number;
      seleccion: string;
      userId: any;
    };

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null);

  //---------------------------------- CHANGE FILE
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  //---------------------------------------------------------------- POST SALE
  const handleFormSubmit = async () => {
    if (paymentOption === "yape" && !file) {
      Swal.fire({
        title: "Archivo requerido",
        text: "Por favor, sube el comprobante de pago.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("IdUser", userId.toString());
      formData.append("IdCart", cartId.toString());
      formData.append("idShipment", shipmentId.toString());
      formData.append("Total", totalAmount.toString());

      if (seleccion === "recoger") {
        formData.append("ShippingMethod", "true");
      } else {
        formData.append("ShippingMethod", "false");
      }

      if (paymentOption === "izipay") {
        formData.append("PaymentMethod", "true");
        const cardNumber = "000000000000";
        formData.append("CardNumber", cardNumber);
      } else {
        formData.append("PaymentMethod", "false");
        if (file) {
          formData.append("file", file);
        }
      }
      console.log(formData);
      const response = await insertSale(formData);
      console.log(response);
      if (response.success) {
        Swal.fire({
          title: "<strong>Compra exitosa!</strong>",
          icon: "info",
          html: `
              Puedes verificar tu compra realizada a travez de tu  <b>Gmail</b>.<br>
            
            
            <b>Cualquier notificación se te estará enviando a tu correo electrónico.</b> 
          `,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: `
            <i class="fa fa-thumbs-up"></i> ¡Entendido!
          `,
          confirmButtonAriaLabel: "Thumbs up, great!",
        }).then(() => {
          window.location.href = "/";
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

  //---------------------------------------------------------------- GET FORM IZIPAY
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
                await handleFormSubmit();
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
                onChange={handleFileChange}
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
                onClick={handleFormSubmit}
              >
                Enviar
              </button>
              <div data-test="payment-message">{message}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
