// component thaht contains a form to add a new facturier 
// this component works with hooks and axios

import React, { useState, useEffect, useRef } from "react";

// import form from primereact
import { Form } from "react-bootstrap";
// import axios
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from 'primereact/autocomplete';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { SelectButton}  from 'primereact/selectbutton';
import { Toast } from 'primereact/toast';

import LibelleDataService from "../services/libelleService";
import ObjetDataService from "../services/objetService";
import DecompteDataService from "../services/decompteService";
import FactureDataService from "../services/factureService";
import ExtraitDataService from "../services/extraitService";
import FacturierDataService from "../services/facturierService";
import CompteClientDataService from "../services/compteClientService";
import CompteFournisseurDataService from "../services/compteFournisseurService";
import fournisseurDataService from "../services/fournisseurService";




export const AddFacturier = () => {

    // first we declare the state of decompte
    const [decompte, setDecompte] = useState({
    });
    // then we get the decompte from the form

    const [libelles, setLibelles] = useState([]);
    const [factures, setFactures] = useState({});
    const [facturier, setFacturier] = useState({});
    const [objet, setObjet] = useState([]);
    const [extrait, setExtrait] = useState({});
    const [compteClient, setCompteClient] = useState([]);
    const [typeFournisseur , setTypeFournisseur] = useState([]);
    const [compteFournisseur, setCompteFournisseur] = useState([]);
    const [typeClient, setTypeClient] = useState([]);
    const [fournisseur, setFournisseur] = useState({});
    const estpaye = [
        { name: 'Oui', code: 'Oui' },
        { name: 'Non', code: 'Non' }
    ];

    const [submitted, setSubmitted] = useState(false);
    const [typeDecompte, setTypeDecompte] = useState([]);
    const [loading, setLoading] = useState(false);
    const [factureId, setFactureId] = useState(null);
    const clfo_option = ['Client', 'Fournisseur'];
    const [selectedClfo, setSelectedClfo] = useState('Off');
    const [compteClientId, setCompteClientId] = useState(null);
    const toast = useRef(null);
    const toastError = useRef(null);
    // forEach fournisseur, push it to state
    useEffect(() => {
        CompteFournisseurDataService.getAll()
            .then(response => {
                setTypeFournisseur(response.data);
                console.log (response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);


    useEffect(() => {
        CompteClientDataService.getAll()
            .then(response => {
                setTypeClient(response.data);
                console.log (response.data);
            })
            .catch(e => {
                console.log(e);
            });
            setCompteClientId (typeClient.compte_client_id);
            console.log (compteClientId);
            
    }, [compteClientId]);






    const saveFacture = () => {

        
    };


    // in function, create a new facture and save it to the database then set the state of facture_id to the id of the new facture created in the database then save the facture_id in the facturier table
    const saveFacturier = () => {
        let data = {
            facture_id: factureId,
            decompte_id: decompte.decompte_id,
            compte_client_id: compteClientId,
            compte_fournisseur_id: compteFournisseur.compte_fournisseur_id,
        }

        FacturierDataService.create(data)
            .then(response => {
                setFacturier({
                    facturier_id: response.data.facturier_id,
                    facture_id: response.data.facture_id,
                    decompte_id: response.data.decompte_id,
                    compte_client_id: response.data.compte_client_id,
                    compte_fournisseur_id: response.data.compte_fournisseur_id,
                });
            })
            .catch(e => {
                console.log(e);
            });
    };

           

    const saveExtraits = () => {
        let data = {
            num_extrait: extrait.num_extrait,
            date_extrait: extrait.extrait_date,
            montant: extrait.montantExtrait,
        }

        ExtraitDataService.create(data)
            .then(response => {
                setExtrait({
                    extrait_id: response.data.extrait_id,
                    num_extrait: response.data.num_extrait,
                    date_extrait : response.data.extrait_date,
                    montant: response.data.montantExtrait,
                });
            })
            .catch(e => {
                console.log(e);
            });
    };

    const saveForm = () => {

        // all save functions
        // saveDecompte();
        saveFacture();
        console.log(factures);
        saveExtraits();

        // then save the id's of the decompte and the facture in the facturier table
        saveFacturier();
    };

    const newForm = () => {
        // retrieveDecompte();



        setSubmitted(false);
        // getFacturiers from Facturier.component


    };


    const retrieveLibelle = () => {
        console.log("retrieve libelle");
        setLoading(true);
        LibelleDataService.getAll()
            .then(response => {
                setLibelles(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
            });

    };

    useEffect(() => {
        retrieveLibelle();
    }, []);

    const retrieveObjet = () => {
        console.log("retrieve objet");
        ObjetDataService.getAll()
            .then(response => {
                setObjet(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveObjet();
    }, []);



    useEffect(() => {
        console.log("retrieve decompte");
        DecompteDataService.getAll()
            .then(response => {
                setTypeDecompte(response.data);
                console.log(response.data);
            })

            .catch(e => {
                console.log(e);
            });
        console.log("tot")
    }, []);



    return (
        <div className="container">
           
                
                    <Form onSubmit={saveForm} className="p-fluid">
                        <div className="inline-block form-group">
                            <label htmlFor="num_facture">N° de facture</label>
                            <InputNumber id="num_facture" value={factures.num_facture} onValueChange={(e) => setFactures({ ...factures, num_facture: e.value })} mode="decimal" useGrouping={false} />

                            <label htmlFor="num_facture">N° de facture</label>
                            <InputNumber id="num_facture" value={factures.num_facture} onValueChange={(e) => setFactures({ ...factures, num_facture: e.value })} mode="decimal" useGrouping={false} />

                            <label htmlFor="num_facture">N° de facture</label>
                            <InputNumber id="num_facture" value={factures.num_facture} onValueChange={(e) => setFactures({ ...factures, num_facture: e.value })} mode="decimal" useGrouping={false} />

                            <label htmlFor="num_facture">N° de facture</label>
                            <InputNumber id="num_facture" value={factures.num_facture} onValueChange={(e) => setFactures({ ...factures, num_facture: e.value })} mode="decimal" useGrouping={false} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="num_facture">N° de facture</label>
                            <InputNumber id="num_facture" value={factures.num_facture} onValueChange={(e) => setFactures({ ...factures, num_facture: e.value })} mode="decimal" useGrouping={false} />

                            <label htmlFor="num_facture">N° de facture</label>
                            <InputNumber id="num_facture" value={factures.num_facture} onValueChange={(e) => setFactures({ ...factures, num_facture: e.value })} mode="decimal" useGrouping={false} />

                            <label htmlFor="num_facture">N° de facture</label>
                            <InputNumber id="num_facture" value={factures.num_facture} onValueChange={(e) => setFactures({ ...factures, num_facture: e.value })} mode="decimal" useGrouping={false} />

                        </div>
                    </Form>
                
    
                      
        </div>
    );
};






