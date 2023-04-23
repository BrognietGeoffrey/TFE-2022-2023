import axios from "axios"
import { BASIC_HEADERS } from "../reducers/headers";

const API_URL = "/api/facture/"; 

class factureService {
    getFactures() {
        return axios.get(API_URL,{ headers: BASIC_HEADERS });
    }
    getFactureById(id) {
        return axios.get(API_URL + id, BASIC_HEADERS);
    }
    // find by description
    findByDescription(description) {
        return axios.get(API_URL + "?description=" + description, BASIC_HEADERS);
    }

    create(facture) {
        return axios.post(API_URL, facture, BASIC_HEADERS);


    }
    update(id, facture) {
        return axios.put(API_URL + id, facture,  { headers: BASIC_HEADERS });
    }
    deleteFacture(id) {
        return axios.delete(API_URL + id);
    }




    // get the last facture ID
    getLastFactureId() {
        async function getLastFactureId() {
            const data = await axios.get(API_URL);
            const lastFactureId = data.data[data.data.length - 1].facture_id;
            console.log(lastFactureId);
            return lastFactureId;
        }
        return getLastFactureId();

    }

    
    
    
}

export default new factureService();