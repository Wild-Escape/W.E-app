import axios from "axios";
import { getAccessToken, logout } from "../store/AccesTokenStore";

export const createHttp = ( useAccesstToken = false) =>{
    const http = axios.create({
        baseURL: import.meta.env.VITE_API_URL ||  "http://localhost:3000"
      
    })

    if (useAccesstToken) {
        http.interceptors.request.use(
          (config) => {
            config.headers.Authorization = `Bearer ${getAccessToken()}`;
            return config;
          },
          (err) => {
            Promise.reject(err);
          }
        );
      }
    
      http.interceptors.response.use(
        (response) => response.data,
        (error) => {
          if (error.response.status === 401) {
            if (getAccessToken()) {
              logout();
            }
          }
    
          return Promise.reject(error.response.data);
        }
      );

    return http;
}
