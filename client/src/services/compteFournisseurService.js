import axios from 'axios';
import { BASIC_HEADERS } from '../reducers/headers';
const API_URL = '/api/compteFournisseurs/';
const API_FOURNISSEUR_URL = '/api/fournisseurs/';

class compteFournisseurService {
    async getAll() {
        const data = await axios.get(API_URL, { headers: BASIC_HEADERS });
        const alldata = data.data.data;
        // find the fournisseur_id from the compteFournisseur, then find the fournisseur from the fournisseur_id, then add the fournisseur to the compteFournisseur
        const compteFournisseursWithFournisseurs = alldata.map(async compteFournisseur => {
            const fournisseur = await axios.get(API_FOURNISSEUR_URL + compteFournisseur.fournisseur_id, { headers: BASIC_HEADERS });
            compteFournisseur.fournisseur = fournisseur.data;
            return compteFournisseur;
        })
        return Promise.all(compteFournisseursWithFournisseurs);
    }

    async create(compteFournisseur) {
        return axios.post(API_URL, compteFournisseur, { headers: BASIC_HEADERS });
    }

    async update(id, compteFournisseur) {
        return axios.put(API_URL + id, compteFournisseur, { headers: BASIC_HEADERS });
    }
    

    
    


    getCompteFournisseurById(id) {
        return axios.get(API_URL + id, { headers: BASIC_HEADERS });
    }
}

export default new compteFournisseurService();