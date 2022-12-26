import axios from 'axios';

const API_URL = '/api/compteClients/';

class compteClientService {
    getAll() {
        return axios.get(API_URL);
    }

    getCompteClientById(id) {
        return axios.get(API_URL + id);
    }
}

export default new compteClientService();