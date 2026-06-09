export interface Booking {
  _id: string;
  serviceId: string;
  serviceName: string;
  serviceCategory: string;
  plan: string;
  price: number;
  bookingDate: string;
  bookingTime: string;
  phone: string;
  address: string;
  notes: string;
  status: "pending" | "approved" | "completed" | "cancelled";
}