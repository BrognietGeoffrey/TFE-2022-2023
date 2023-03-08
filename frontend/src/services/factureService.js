import axios from "axios"

const API_URL = "/api/factures/"; 
const API_URL2 = "/api/facture/";
const API_URL_OBJET = "/api/objet/";
const API_URL_LIBELLE = "/api/libelle/";

class factureService {
    getFactures() {
        return axios.get(API_URL);
    }
    getFactureById(id) {
        return axios.get(API_URL + id);
    }
    // find by description
    findByDescription(description) {
        return axios.get(API_URL + "?description=" + description);
    }

    create(facture) {
        return axios.post(API_URL, facture);


    }
    update(id, estpaye) {
        return axios.put(API_URL + id, estpaye);
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