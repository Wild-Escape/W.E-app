import { createHttp } from "./base.service";

const http = createHttp();

export const loginService = (credentials) => http.post("/login", credentials)
