import axios from "axios"

const API_URL = "/api/auth/"; 

class AuthService {
    login(username, password) {
        return axios
        .post(API_URL + "signin", { username, password })
        .then((response) => { 
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(username, email, password, roles) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password,
            roles: [roles],
        });
       
    }
    
}

export default new AuthService();