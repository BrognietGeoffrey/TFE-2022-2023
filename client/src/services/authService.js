import axios from "axios"

const API_URL = "/api/auth/"; 

class AuthService {
    login(username, password) {
        console.log("je passe ici")
        return axios
        .post(API_URL + "signin", { username, password })
        .then((response) => { 
            console.log(response, "response.data");
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(informations) {
        return axios.post(API_URL + "signup", informations);
       
    }
    
}

export default new AuthService();