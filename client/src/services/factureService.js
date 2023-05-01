import axios from "axios"
import { BASIC_HEADERS } from "../reducers/headers";

const API_URL = "/api/facture/"; 
const API_URLs = "/api/factures/";

class factureService {
    getFactures() {
        return axios.get(API_URL,{ headers: BASIC_HEADERS });
    }
    getFactureById(id) {
        return axios.get(API_URL + id, { headers: BASIC_HEADERS });
    }
    // find by description
    findByDescription(description) {
        return axios.get(API_URL + "?description=" + description, { headers: BASIC_HEADERS });
    }

    create(facture) {
        return axios.post(API_URL, facture, { headers: BASIC_HEADERS });


    }
    update(id, facture) {
        return axios.put(API_URL + id, facture,  { headers: BASIC_HEADERS });
    }
    deleteFacture(id) {
        return axios.delete(API_URL + id, { headers: BASIC_HEADERS });
    }
    // get the last facture ID
    getLastFactureId() {
        async function getLastFactureId() {
            const data = await axios.get(API_URL, { headers: BASIC_HEADERS });
            const lastFactureId = data.data[data.data.length - 1].facture_id;
            console.log(lastFactureId);
            return lastFactureId;
        }
        return getLastFactureId();
    }

    // get factures by client id or by fournisseur id
    getFacturesByClientId(id, type) {
        console.log(type, "type");
        console.log(id, "id");
        // Si l'id vient de client_id alors on cherche les factures par client_id
        if (type === "client") {
            return axios.get(API_URLs  + id, { headers: BASIC_HEADERS });
        }
    }

    //update
    updateFacture(id, facture) {
        return axios.put(API_URL + id, facture, { headers: BASIC_HEADERS });
    }
    
}


export default new factureService();