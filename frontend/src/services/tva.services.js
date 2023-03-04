import axios from 'axios';
import authHeader from './authHeader';

const API_URL = '/api/tva/';

class tvaService {
    getAll() {
        return axios.get(API_URL);
    }

    getTvaById(id) {
        return axios.get(API_URL + id);
    }

}

export default new tvaService();