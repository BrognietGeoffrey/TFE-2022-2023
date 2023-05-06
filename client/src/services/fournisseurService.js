import axios from 'axios';
import { BASIC_HEADERS } from '../reducers/headers';
const API_URL = '/api/fournisseurs/';


class fournisseurService {
    getAll() {
        return axios.get(API_URL, { headers: BASIC_HEADERS });
    }

    getFournisseurById(id) {
        return axios.get(API_URL + id, { headers: BASIC_HEADERS });
    }

    create(data) {
        return axios.post(API_URL, data, { headers: BASIC_HEADERS });
    }

    getLastFournisseurId() {
        async function getLastFournisseurId() {
            const data = await axios.get(API_URL, { headers: BASIC_HEADERS });
            const lastFournisseurId = data.data[data.data.length - 1].fournisseur_id;
            console.log(lastFournisseurId);
            return lastFournisseurId;
        }
        return getLastFournisseurId();

    }

    update(id, data) {
        return axios.put(API_URL + id, data, { headers: BASIC_HEADERS });
    }

    getFournisseurByName = (name) => {
        return axios.get(API_URL + '/name/' + name, { headers: BASIC_HEADERS });
    }
    
    
}
export default new fournisseurService();