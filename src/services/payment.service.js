import { createHttp } from "./base.service";

const http = createHttp(true);

export const  createPaymentService = (body) => http.post('/create-payment', body);
export const getBookedExperiencesService = () => http.get('/booked/experiences');
export const getPendingPaymentsService = () => http.get('/pending/experiences');
