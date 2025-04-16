import { createHttp } from "./base.service";

const http = createHttp();

export const  testService = () => http.get('/');