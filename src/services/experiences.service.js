import { createHttp } from "./base.service";

const http = createHttp(true);

export const getAllExperiences = () => http.get("/experiences");
export const getExperienceDetails = (id) => http.get(`/experience/${id}`);
export const getPartnerExperiences = () => http.get("/partner/all/experiences");
export const getPartnerExperience = (id) => http.get(`/partner/experience/${id}/details`);
export const createExperienceService = (body, headers) => http.post("/experience/create", body, headers);
export const updateExperienceService = (id, body) => http.patch(`/experience/${id}/update`, body)
