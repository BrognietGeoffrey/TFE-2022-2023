import axios from "axios"

const API_URL = "/api/factures/"; 

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

    // get status of facture
    getFactureStatus(id) {
        return axios.get(API_URL + id + "/status");
    }

    // get facture where num_facture and montant are the same as the one in the database
    getFactureByNumFactureAndMontant(num_facture, montant) {
        return axios.get(API_URL + "?num_facture=" + num_facture + "&montant=" + montant);
    }
    
    
    
}

export default new factureService();