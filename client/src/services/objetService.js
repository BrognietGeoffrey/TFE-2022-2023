import axios from 'axios';
import { BASIC_HEADERS } from '../reducers/headers';
const API_URL = '/api/objet/';

class objetService {
    getAll() {
        return axios.get(API_URL, { headers: BASIC_HEADERS });
    }

    create(data) {
        return axios.post(API_URL, data, { headers: BASIC_HEADERS });
    }
    

    getObjetById(id) {
        return axios.get(API_URL + id, { headers: BASIC_HEADERS });
    }

    update(id, data) {
        return axios.put(API_URL + id, data, { headers: BASIC_HEADERS });
    }
    

}

export default new objetService();