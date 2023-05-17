import axios from 'axios';
import { BASIC_HEADERS } from '../reducers/headers';
const API_URL = '/api/libelle/';

class libelleService {
    getAll() {
        return axios.get(API_URL, { headers: BASIC_HEADERS });
    }

    getLibelleById(id) {
        return axios.get(API_URL + id, { headers: BASIC_HEADERS });
    }

    create(libelle) {
        return axios.post(API_URL, libelle, { headers: BASIC_HEADERS });
    }

    update(id, libelle) {
        return axios.put(API_URL + id, libelle, { headers: BASIC_HEADERS });
    }

}

export default new libelleService();