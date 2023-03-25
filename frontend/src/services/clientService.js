import axios from 'axios';
// retrieve all name of compte_client_id from the compte_clients table

// const API_URL = 'http://localhost:8082/api/clients/';
// dynamic url
const API_URL = '/api/clients/';


class clientService {
    getAll() {
        return axios.get(API_URL);
    }

    getClientById(id) {
        return axios.get(API_URL + id);
    }

    create(client) {
        return axios.post(API_URL, client);
    }

    getLastClientId() {
        async function getLastClientId() {
            const data = await axios.get(API_URL);
            const lastClientId = data.data[data.data.length - 1].client_id;
            console.log(lastClientId);
            return lastClientId;
        }
        return getLastClientId();

    }

}
export default new clientService();





