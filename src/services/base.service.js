import axios from "axios";

export const createHttp = () =>{
    const http = axios.create({
        baseURL: "http://localhost:3000"
    })

    return http;
}
