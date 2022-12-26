import axios from 'axios';

const API_URL = '/api/compteFournisseurs/';

class compteFournisseurService {
    getAll() {
        return axios.get(API_URL);
    }

    getCompteFournisseurById(id) {
        return axios.get(API_URL + id);
    }
}

export default new compteFournisseurService();