import axios from 'axios';
const API_URL = '/api/fournisseurs/';


class fournisseurService {
    getAll() {
        return axios.get(API_URL);
    }

    getFournisseurById(id) {
        return axios.get(API_URL + id);
    }
}
export default new fournisseurService();