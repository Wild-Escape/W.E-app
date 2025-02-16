import { createHttp } from "./base.service";

const http = createHttp();

export const addToFavorite = (id) => http.post(`/experiences/${id}/favorite`)