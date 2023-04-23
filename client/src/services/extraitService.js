import axios from 'axios';
import { BASIC_HEADERS } from '../reducers/headers';
const API_URL = '/api/extraits/';


class extraitService {
    getAll() {
        return axios.get(API_URL, { headers: BASIC_HEADERS});
    }

    getExtraitById(id) {
        return axios.get(API_URL + id);
    }

    create(extrait) {
        return axios.post(API_URL, extrait, { headers: BASIC_HEADERS});


    }

}

export default new extraitService();