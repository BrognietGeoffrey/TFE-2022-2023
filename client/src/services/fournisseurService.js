import axios from 'axios';
const API_URL = '/api/fournisseurs/';
const BASIC_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + token
}

class fournisseurService {
    getAll() {
        return axios.get(API_URL, { headers: BASIC_HEADERS });
    }

    getFournisseurById(id) {
        return axios.get(API_URL + id);
    }

    create(data) {
        return axios.post(API_URL, data);
    }

    getLastFournisseurId() {
        async function getLastFournisseurId() {
            const data = await axios.get(API_URL);
            const lastFournisseurId = data.data[data.data.length - 1].fournisseur_id;
            console.log(lastFournisseurId);
            return lastFournisseurId;
        }
        return getLastFournisseurId();

    }
    
}
export default new fournisseurService();