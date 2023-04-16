import axios from 'axios';

const API_URL = '/api/compteClients/';
const API_CLIENT_URL = '/api/clients/';
class compteClientService {
    async getAll() {
        const data = await axios.get(API_URL);
        // find the fournisseur_id from the compteFournisseur, then find the fournisseur from the fournisseur_id, then add the fournisseur to the compteFournisseur
        const compteClientWithClient = data.data.map(async compteClient => {
            const client = await axios.get(API_CLIENT_URL + compteClient.client_id);
            compteClient.client = client.data;
            return compteClient;
        })
        return Promise.all(compteClientWithClient);
    }

    getCompteClientById(id) {
        return axios.get(API_URL + id);
    }

    create(compteClient) {
        return axios.post(API_URL, compteClient);
    }
    
}


export default new compteClientService();