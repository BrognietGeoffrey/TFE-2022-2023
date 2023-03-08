import axios from 'axios';
import authHeader from './authHeader';

const API_URL = '/api/objet/';

class objetService {
    getAll() {
        return axios.get(API_URL);
    }

    getObjetById(id) {
        return axios.get(API_URL + id);
    }

}

export default new objetService();