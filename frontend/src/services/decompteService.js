import axios from 'axios';

const API_URL = '/api/decomptes/';

class decompteService {
    getAll() {
        return axios.get(API_URL);
    }

    getDecompteById(id) {
        return axios.get(API_URL + id);
    }

    create(decompte) {
        return axios.post(API_URL, decompte);
    }


}

export default new decompteService();