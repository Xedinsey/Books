import axios from "axios";
export const instance = axios.create({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://books.maksibond.dev/',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
    },
    baseURL:'https://books-api.maksibond.dev/',
    withCredentials: false
})
