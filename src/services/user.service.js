import {createHttp} from "./base.service";

const http = createHttp();

export const createUser = (user) => http.post("/register", user )
export const getUser = (headers) => http.get("/me", headers)