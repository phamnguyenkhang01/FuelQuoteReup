import http from "../http/http-common";

class DashboardService {
    UpdateProfile(id, data) {
        return http.put("/api/v0/user/update/"+id, data);
    }

    submitQuote(data) {
        return http.post("/api/v0/quote/",  data);
    }

    getRate(data){
        return http.post("/api/v0/quote/calculate", data);
    }

    getQuotes(){
        return http.get("/api/v0/quote/");
    }
}

export default new DashboardService();
