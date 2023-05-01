import axios from 'axios';
import { BASIC_HEADERS } from '../reducers/headers';
const API_URL = '/api/decomptes/';

class decompteService {
    getAll() {
        return axios.get(API_URL, { headers: BASIC_HEADERS });
    }

    getDecompteById(id) {
        return axios.get(API_URL + id, { headers: BASIC_HEADERS });
    }

    create(decompte) {
        return axios.post(API_URL, decompte, { headers: BASIC_HEADERS });
    }

    update(id, decompte) {
        return axios.put(API_URL + id, decompte, { headers: BASIC_HEADERS });
    }
    


}

export default new decompteService();