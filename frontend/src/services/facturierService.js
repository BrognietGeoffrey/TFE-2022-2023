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
        const data = await axios.get(API_URL);

        const facturiersWithFactures = data.data.map(async facturier => {
            const facture = await axios.get(API_FACTURE_URL + facturier.facture_id);
            facturier.facture = facture.data;
            console.log(facture.data);
            const tva = await axios.get(API_TVA + facture.data.tva_id);
            console.log(tva.data);
            facturier.tva = tva.data;
            console.log (facturier)
            return facturier;
        
        })

        

        const facturiersWithDecomptes = data.data.map(async facturier => {
            const decompte = await axios.get(API_DECOMPTE_URL + facturier.decompte_id);
            facturier.decompte = decompte.data;
            return facturier;
        
        })

        const facturiersWithExtraits = data.data.map(async facturier => {
            const extrait = await axios.get(API_EXTRAIT_URL + facturier.extrait_id);
            facturier.extrait = extrait.data;
            return facturier;
        
        })

        const facturierWithObjetsLibelle = data.data.map(async facturier => {
            const objet = await axios.get(API_FACTURE_URL + facturier.facture_id);
            const objetData = await axios.get(API_OBJET + objet.data.objet_id);
            facturier.objetTitle = objetData.data.title;
            const libelle = await axios.get(API_FACTURE_URL + facturier.facture_id);
            const libelleData = await axios.get(API_LIBELLE + libelle.data.libelle_id);
            facturier.libelleTitle = libelleData.data.title;
            return facturier;


        })
            

        const facturiersWithClients = data.data.map(async facturier => {
            const client = await axios.get(API_COMPTPE_CLIENT_URL + facturier.co_client_id);
            if (facturier.co_client_id === null) {
                facturier.client = 'Pas de client';

            }
            else {
                // get the data from the client_id and add it to the facturier
               
                const clientData = await axios.get(API_CLIENT_URL + client.data.client_id);
                facturier.client = clientData.data;
                


            }
            return facturier;
        
        })

        const facturiersWithFournisseurs = data.data.map(async facturier => {
            const fournisseur = await axios.get(API_FOURNISSEUR_URL + facturier.co_fournisseur_id);
            if (facturier.co_fournisseur_id === null) {
                facturier.fournisseur = null;
            }
            else {
                // get the data from the fournisseur_id and add it to the facturier
                const fournisseurData = await axios.get(API_FOURNISSEUR_URL + fournisseur.data.fournisseur_id);
                facturier.fournisseur = fournisseurData.data;
            }
            return facturier;

        })

        return Promise.all(facturiersWithFactures, facturiersWithDecomptes, facturierWithObjetsLibelle, facturiersWithExtraits, facturiersWithClients, facturiersWithFournisseurs);



        
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