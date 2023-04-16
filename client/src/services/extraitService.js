import axios from 'axios';

const API_URL = '/api/extraits/';

class extraitService {
    getAll() {
        return axios.get(API_URL);
    }

    getExtraitById(id) {
        return axios.get(API_URL + id);
    }

    create(extrait ) {
        return axios.post(API_URL, extrait);


    }

}

export default new extraitService();