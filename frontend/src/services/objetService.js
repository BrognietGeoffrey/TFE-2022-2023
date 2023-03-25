import axios from 'axios';
import authHeader from './authHeader';

const API_URL = '/api/objet/';

class objetService {
    getAll() {
        return axios.get(API_URL);
    }

    create(data) {
        return axios.post(API_URL, data, { headers: authHeader() });
    }
    

    getObjetById(id) {
        return axios.get(API_URL + id);
    }

}

export default new objetService();