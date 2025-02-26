import { createHttp } from "./base.service";

const http = createHttp(true);

export const  createPaymentService = (body) => http.post('/create-payment', body);
