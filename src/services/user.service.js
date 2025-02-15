import {createHttp} from "./base.service";

const http = createHttp();

export const createUser = (user) => http.post("/register", user )
export const getCurrentUser = (headers) => http.get("/me", headers)