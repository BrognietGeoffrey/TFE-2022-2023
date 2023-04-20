import axios from 'axios';
import authHeader from './authHeader';

const API_URL = '/api/auth/';

class LoginService {
    login(username, password) {
        return axios
            .post(API_URL + 'signin', {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(username, email, password) {
        return axios.post(API_URL + 'signup', {
            username,
            email,
            password
        });
    }
}

export default new LoginService();