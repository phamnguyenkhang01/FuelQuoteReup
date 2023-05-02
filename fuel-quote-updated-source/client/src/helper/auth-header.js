export default function authHeader() {
    let token =  localStorage.getItem("accessToken");
  
    if (token) {
        return { 
            "Content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "http://localhost:8080/*",
            'x-access-token': token,
			      'Authorization' : 'Bearer '+token
        };
    } else {
      return {
        "Content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:8080/*",
      };
    }
  }
