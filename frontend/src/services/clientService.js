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
}
export default new clientService();





