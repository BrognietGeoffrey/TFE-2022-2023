import axios from 'axios';
import authHeader from './authHeader';

const API_URL = '/api/libelle/';

class libelleService {
    getAll() {
        return axios.get(API_URL);
    }

    getLibelleById(id) {
        return axios.get(API_URL + id);
    }

}

export default new libelleService();