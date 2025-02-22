import {createHttp} from "./base.service";

const http = createHttp(true);


export const getCurrentUserService = () => http.get("/me");