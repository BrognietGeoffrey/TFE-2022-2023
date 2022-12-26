import axios from "axios"
// import API_URL from "../clientService"

const API_URL = "/api/facturiers/";
const API_FACTURE_URL = "/api/factures/";
const API_DECOMPTE_URL = "/api/decomptes/";
const API_EXTRAIT_URL = "/api/extraits/";
const API_CLIENT_URL = "/api/clients/";
const API_FOURNISSEUR_URL = "/api/fournisseurs/";
const API_COMPTPE_CLIENT_URL = "/api/compteClients/";
const API_COMPTPE_FOURNISSEUR_URL = "/api/compteFournisseurs/";



class facturierService {


    // fetch all facturiers and find all factures by facture_id 
    getAll() {
        return axios.get(API_URL)
        .then (response => {
            const facturiers = response.data;
            
            const facturiersWithFactures = facturiers.map(facturier => {
                return axios.get(API_FACTURE_URL + facturier.facture_id)
                .then(response => {
                    facturier.facture = response.data;
                    
                    return facturier;
                })
            })
            const facturiersWithDecomptes = facturiers.map(facturier => {
                return axios.get(API_DECOMPTE_URL + facturier.decompte_id)
                .then(response => {
                    facturier.decompte = response.data;
                    return facturier;
                })
            })
            const facturiersWithExtraits = facturiers.map(facturier => {
                return axios.get(API_EXTRAIT_URL + facturier.extrait_id)
                .then(response => {
                    facturier.extrait = response.data;
           
                    return facturier;
                })
            })
            const facturiersWithClientsAndFournisseur = facturiers.map(facturier => {
                // if co_client_id is not null and co_fournisseur_id is null, find client by co_client_id and fournisseur by fournisseur_id
                if (facturier.co_client_id !== null && facturier.co_fournisseur_id !== null) {
                    return axios.all([
                        axios.get(API_COMPTPE_CLIENT_URL + facturier.co_client_id),
                        axios.get(API_COMPTPE_FOURNISSEUR_URL + facturier.co_fournisseur_id)
                    ])
                    .then(axios.spread((client, fournisseur) => {
                        console.log(client);
                        facturier.client = client.data;
                        facturier.fournisseur = fournisseur.data;
                        return facturier;
                    }))
                    .then (facturier => {
                        return axios.all([
                            axios.get(API_CLIENT_URL + facturier.client.client_id),
                            axios.get(API_FOURNISSEUR_URL + facturier.fournisseur.fournisseur_id)
                        ])
                        .then(axios.spread((client, fournisseur) => {
                            facturier.info = [client.data, fournisseur.data]
                            
                            return facturier;
                        }))
                    }
                    )
                }
                if (facturier.co_client_id === null && facturier.co_fournisseur_id !== null) {
                    return axios.all([
                        axios.get(API_COMPTPE_FOURNISSEUR_URL + facturier.co_fournisseur_id)
                    ])
                    .then(axios.spread((fournisseur) => {
                        facturier.fournisseur = fournisseur.data;
                        return facturier;
                    }))
                    .then (facturier => {
                        return axios.get(API_FOURNISSEUR_URL + facturier.fournisseur.fournisseur_id)
                        .then(response => {
                            facturier.info = response.data;
                            return facturier;
                        })
                    }
                    )
                }
                if (facturier.co_client_id !== null && facturier.co_fournisseur_id === null) {
                    return axios.all([
                        axios.get(API_COMPTPE_CLIENT_URL + facturier.co_client_id)
                    ])
                    .then(axios.spread((client) => {
                        facturier.client = client.data;
                        return facturier;
                    }))
                    
                    .then (facturier => {
                        return axios.get(API_CLIENT_URL + facturier.client.client_id)
                        .then(response => {
                            facturier.info = response.data;
                            return facturier;
                        })
                    }
                    )
                }
            })

            

            

                    


            

            return Promise.all(facturiersWithExtraits, facturiersWithFactures,facturiersWithClientsAndFournisseur, facturiersWithDecomptes).then(() => facturiers);
        })
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