export const fetchLastShipment = async (userId: number) => {
  try {
    const response = await fetch(
      `https://bkmaferyogurt-production.up.railway.app/api/shipment/lastShipment/${userId}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al obtener el último envío:", error);
    throw error;
  }
};

export const insertShipment = async (shipmentData: any) => {
  try {
    const response = await fetch(
      "https://bkmaferyogurt-production.up.railway.app/api/shipment/insert",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shipmentData),
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al realizar el pedido:", error);
    throw error;
  }
};
