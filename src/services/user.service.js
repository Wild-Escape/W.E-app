import {createHttp} from "./base.service";

const http = createHttp(true);


export const getCurrentUserService = () => http.get("/me");
export const getUserDetailsService = (id) => http.get(`/user/${id}`);
export const editUserService = (id, user) => http.post(`/user/${id}/update`, user);