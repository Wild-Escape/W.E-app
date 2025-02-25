import { createHttp } from "./base.service";

const http = createHttp(true);

export const  getPublishableKeyService = () => http.get('/stripe/publishable-key');
export const paymentIntentService = (body) => http.post('/create-payment-intent', body)