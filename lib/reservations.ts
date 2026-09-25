export type ReservationRequest = {
  guests: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  name: string;
  phone: string;
  email: string;
  note: string;
};

// PLACEHOLDER: jediné místo pro napojení na skutečný rezervační systém / e-mail / API.
// Zatím se nic neodesílá – jen simuluje krátké čekání.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function submitReservation(_request: ReservationRequest): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 600));
}
