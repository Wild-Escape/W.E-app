import { createHttp } from "./base.service";

const http = createHttp();

export const loginService = (credentials) => http.post("/login", credentials)
export const getCurrentUserService = () => http.get("/me")