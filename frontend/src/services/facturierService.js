import axios from "axios"

const API_URL = "/api/facturiers/";
const API_FACTURE_URL = "/api/factures/";
const API_DECOMPTE_URL = "/api/decomptes/";
const API_EXTRAIT_URL = "/api/extraits/";
const API_CLIENT_URL = "/api/clients/";
const API_FOURNISSEUR_URL = "/api/fournisseurs/";
const API_COMPTPE_CLIENT_URL = "/api/compteClients/";
const API_COMPTPE_FOURNISSEUR_URL = "/api/compteFournisseurs/";
const API_OBJET = "/api/objet/";
const API_LIBELLE = "/api/libelle/";
const API_TVA = "/api/tva/";


class facturierService {
    
    async getAll() {
        return axios.get(API_URL)
        
    }







    getFacturierById(id) {
        return axios.get(API_URL + id);
    }
    // find by description
    findByDescription(description) {
        return axios.get(API_URL + "?description=" + description);
    }

    create(facturier) {
        return axios.post(API_URL, facturier);

    }
    update(id, estpaye) {
        return axios.put(API_URL + id, estpaye);
    }
    deleteFacturier(id) {
        return axios.delete(API_URL + id);
    }





}

export default new facturierService();