import axios from 'axios';
import authHeader from './authHeader';

const API_URL = '/api/logs/';

class LogsService {
    getAll() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    create(data) {
        return axios.post(API_URL, data, { headers: authHeader() });
    }
}

export default new LogsService();