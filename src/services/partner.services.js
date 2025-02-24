import {createHttp} from "./base.service";

const http = createHttp(true);

export const getPartnerDetailsService = (id) => http.get(`/partner/${id}`);
export const editPartnerService = (id, partner) => http.patch(`/partner/${id}/update`, partner);