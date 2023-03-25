import axios from 'axios';

const API_URL = '/api/compteFournisseurs/';
const API_FOURNISSEUR_URL = '/api/fournisseurs/';

class compteFournisseurService {
    async getAll() {
        const data = await axios.get(API_URL);
        // find the fournisseur_id from the compteFournisseur, then find the fournisseur from the fournisseur_id, then add the fournisseur to the compteFournisseur
        const compteFournisseursWithFournisseurs = data.data.map(async compteFournisseur => {
            const fournisseur = await axios.get(API_FOURNISSEUR_URL + compteFournisseur.fournisseur_id);
            compteFournisseur.fournisseur = fournisseur.data;
            return compteFournisseur;
        })
        return Promise.all(compteFournisseursWithFournisseurs);
    }

    async create(compteFournisseur) {
        return axios.post(API_URL, compteFournisseur);
    }


    
    


    getCompteFournisseurById(id) {
        return axios.get(API_URL + id);
    }
}

export default new compteFournisseurService();