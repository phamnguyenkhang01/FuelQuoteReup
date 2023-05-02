import axios from "axios";

import authHeader from '../helper/auth-header.js';

export default axios.create({
    baseURL: "http://localhost:8080/",
    headers:  authHeader()
});