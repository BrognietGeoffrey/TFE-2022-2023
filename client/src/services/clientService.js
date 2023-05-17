import axios from 'axios';
import { BASIC_HEADERS } from '../reducers/headers';

const API_URL = '/api/clients/';



class clientService {
    getAll() {
        return axios.get(API_URL, { headers: BASIC_HEADERS });
    }

    getClientById(id) {
        return axios.get(API_URL + id, { headers: BASIC_HEADERS });
    }

    create(client) {
        return axios.post(API_URL, client, { headers: BASIC_HEADERS });
    }

    getLastClientId() {
        async function getLastClientId() {
            const data = await axios.get(API_URL, { headers: BASIC_HEADERS });
            const lastClientId = data.data[data.data.length - 1].client_id;
            console.log(lastClientId);
            return lastClientId;
        }
        return getLastClientId();

    }

    update(id, client) {
        return axios.put(API_URL + id, client, { headers: BASIC_HEADERS });
    }

    getClientByName(name, firstname) {
        return axios.get('/api/client/name/' + name + '/firstname/' + firstname, { headers: BASIC_HEADERS });
    }

    delete(id) {
        return axios.delete(API_URL + id, { headers: BASIC_HEADERS });
    }
    
    
}
export default new clientService();





