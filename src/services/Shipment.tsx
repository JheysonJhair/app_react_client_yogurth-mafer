// api.ts
import {
  ShipmentData,
  LastShipmentResponse,
  Shipment,
} from "../types/Shipment";

export const insertShipment = async (data: ShipmentData): Promise<void> => {
  const response = await fetch(
    "https://bkmaferyogurt-production.up.railway.app/api/shipment/insert",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Error al insertar el envío");
  }
};

export const getLastShipment = async (
  userId: string
): Promise<Shipment | null> => {
  const response = await fetch(
    `https://bkmaferyogurt-production.up.railway.app/api/shipment/lastShipment/${userId}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener el último envío");
  }

  const data: LastShipmentResponse = await response.json();
  return data.success && data.data.length > 0 ? data.data[0] : null;
};
