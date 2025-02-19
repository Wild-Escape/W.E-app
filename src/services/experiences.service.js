import {createHttp} from "./base.service";

const http = createHttp(true);

export const getAllExperiences = () => http.get("/experiences");
export const getExperienceDetails = (id) => http.get(`/experience/${id}`);
export const getPartnerExperiences = () => http.get("/partner/experiences");
export const createExperienceService = (body, headers) => http.post("/experience/create", body, headers);