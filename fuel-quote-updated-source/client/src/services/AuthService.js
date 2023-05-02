import http from "../http/http-common";

class AuthService {
    login(data) {
        return http.post("/api/v0/auth/login", data);
    }

    Register(data) {
        return http.post("/api/v0/auth/register", data);
    }
}

export default new AuthService();