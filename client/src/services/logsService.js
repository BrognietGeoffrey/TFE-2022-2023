import axios from 'axios';
import { BASIC_HEADERS } from '../reducers/headers';
const API_URL = '/api/logs/';

class LogsService {
    getAll() {
        return axios.get(API_URL, { headers: BASIC_HEADERS });
    }

    create(data) {
        return axios.post(API_URL, data, { headers: BASIC_HEADERS });
    }
}

export default new LogsService();