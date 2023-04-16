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

    create(libelle) {
        return axios.post(API_URL, libelle)
    }

}

export default new libelleService();