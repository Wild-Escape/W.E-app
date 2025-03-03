import { createHttp } from "./base.service";

const http = createHttp(true);

export const sendApplicationService = (body) => http.post('/application/create', body);

