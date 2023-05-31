import axios from 'axios';
import { BASIC_HEADERS } from '../reducers/headers';
const API_URL = '/api/compteClients/';
const API_CLIENT_URL = '/api/clients/';
class compteClientService {
    async getAll() {
        const data = await axios.get(API_URL, { headers: BASIC_HEADERS });
        // find the fournisseur_id from the compteFournisseur, then find the fournisseur from the fournisseur_id, then add the fournisseur to the compteFournisseur
        const compteClientWithClient = data.data.data.map(async compteClient => {
            const client = await axios.get(API_CLIENT_URL + compteClient.client_id, { headers: BASIC_HEADERS });
            compteClient.client = client.data;
            return compteClient;
        })
        return Promise.all(compteClientWithClient);
    }

    getCompteClientById(id) {
        return axios.get(API_URL + id, { headers: BASIC_HEADERS });
    }

    create(compteClient) {
        return axios.post(API_URL, compteClient, { headers: BASIC_HEADERS });
    }
    
    update(id, compteClient) {
        return axios.put(API_URL + id, compteClient, { headers: BASIC_HEADERS });
    }
    
}


export default new compteClientService();