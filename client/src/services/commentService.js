import axios from 'axios';
import { BASIC_HEADERS } from '../reducers/headers';
const API_URL = '/api/comments/';

class commentService {
    async getAll() {
        const data = await axios.get(API_URL, { headers: BASIC_HEADERS });
        return data.data;
    }

    create(comment) {
        return axios.post(API_URL, comment, { headers: BASIC_HEADERS });
    }
    
}

export default new commentService();