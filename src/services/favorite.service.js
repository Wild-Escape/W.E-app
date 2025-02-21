import { createHttp } from "./base.service";

const http = createHttp(true);

export const addToFavoriteService = (id) => http.post(`/experiences/${id}/favorite`);
