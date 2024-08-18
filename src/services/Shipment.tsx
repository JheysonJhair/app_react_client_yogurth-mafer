const API_URL = "https://bkmaferyogurt-production.up.railway.app/api";

//---------------------------------------------------------------- GET LAST SHIPMENT
export const fetchLastShipment = async (userId: number) => {
  try {
    const response = await fetch(`${API_URL}/shipment/lastShipment/${userId}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al obtener el último envío:", error);
    throw error;
  }
};

//---------------------------------------------------------------- POST SHIPMENT
export const insertShipment = async (shipmentData: any) => {
  try {
    const response = await fetch(`${API_URL}/shipment/insert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shipmentData),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al realizar el pedido:", error);
    throw error;
  }
};
