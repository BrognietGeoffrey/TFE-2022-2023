import axios from 'axios';
import authHeader from './authHeader';

const API_URL = '/api/view/';

class ViewService {
    getAllView() {
        return axios.get(API_URL + 'getViews', { headers: authHeader() });
    }
    
    createCustomView(data) {
        return axios.post(API_URL + 'createView', data, { headers: authHeader() });
    }
}

export default new ViewService();