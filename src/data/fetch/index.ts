import axios from "axios";

const client = axios.create({
    baseURL: process.env.REACT_APP_API,
    withCredentials: true,
    headers: {
    }
});

export default client;
