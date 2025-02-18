import {createHttp} from "./base.service";

const http = createHttp();

export const getAllExperiences = () => http.get("/experiences");
export const getExperienceDetails = (id) => http.get(`/experience/${id}`);
export const createExperienceService = (body, headers) => http.post("/experience/create", body, headers);