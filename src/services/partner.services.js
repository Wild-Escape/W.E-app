import {createHttp} from "./base.service";

const http = createHttp();

export const createExperience = (data) =>  http.post("/shelter/create", data);