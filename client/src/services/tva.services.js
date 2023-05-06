import axios from 'axios';
import { BASIC_HEADERS } from '../reducers/headers';
const API_URL = '/api/tva/';

class tvaService {
    getAll() {
        return axios.get(API_URL, { headers: BASIC_HEADERS });
    }

    getTvaById(id) {
        return axios.get(API_URL + id, { headers: BASIC_HEADERS });
    }

    create(tva) {
        return axios.post(API_URL, tva, { headers: BASIC_HEADERS });
    }

    update(id, tva) {
        return axios.put(API_URL + id, tva, { headers: BASIC_HEADERS });
    }
    
    getTvaByValue(value) {
        return axios.get(API_URL + 'value/' + value, { headers: BASIC_HEADERS });
    }


}

export default new tvaService();