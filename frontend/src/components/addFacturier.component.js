// component thaht contains a form to add a new facturier 
// this component works with hooks and axios

// NOTE : à corriger le fournisseur dans le base de données et dans ce code
import React, { useState, useEffect, useRef } from "react";

// import form from primereact
import { Form } from "react-bootstrap";
// import axios
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { SelectButton}  from 'primereact/selectbutton';
import { Toast } from 'primereact/toast';

import LibelleDataService from "../services/libelleService";
import ObjetDataService from "../services/objetService";
import DecompteDataService from "../services/decompteService";
import FactureDataService from "../services/factureService";
import ExtraitDataService from "../services/extraitService";
import FacturierDataService from "../services/facturierService";
import compteFournisseurDataService from "../services/compteFournisseurService";
import compteClientDataService from "../services/compteClientService";
import tvaService from "../services/tva.services";




const AddFacturier = () => {


    const [libelles, setLibelles] = useState([]);
    const [factures, setFactures] = useState({
      

      });
    const [facturier, setFacturier] = useState({});
    const [objet, setObjet] = useState([]);
    const [extrait, setExtrait] = useState({});
    const [fournisseurList, setFournisseurList] = useState([]);
    const [clientList, setClientList] = useState([]);
    const [libelleList, setLibelleList] = useState([]);
    const [tvaList, setTvaList] = useState([]);
    const [decompteList, setDecompteList] = useState([]);
    const [extraitList, setExtraitList] = useState([]);
    const [decompte, setDecompte] = useState([]);
    const [fournisseur, setFournisseur] = useState([]);
    const [client , setClient] = useState([]);
    const [tva, setTva] = useState([]);

    const options = [
        { name: "Oui" , value: true },
        { name : "Non" , value: false },
        
    ];
    const [factureId, setFactureId] = useState(null);

    const toast = useRef(null);
    const toastError = useRef(null);
  
    
    useEffect(() => {
        async function fetchData() {
            //list with label and value for fournisseur from compte_fournisseur 
            const fournisseurList = await compteFournisseurDataService.getAll();
     
            setFournisseurList(fournisseurList.map(fournisseur => {
                return {
                    label: fournisseur.fournisseur.name,
                    value: fournisseur.compte_fournisseur_id
                }
            }));

            //list with label and value for client from compte_client
            const clientList = await compteClientDataService.getAll();
        
            setClientList(clientList.map(client => {
                return {
                    label: client.client.name + " " + client.client.firstname,
                    value: client.compte_client_id
                }
            }));

            

            

            //list with label and value for libelle 
            const libelleList = await LibelleDataService.getAll();
       
            setLibelleList(libelleList.data.map(libelle => {
                return {
                    label: libelle.title,
                    value: libelle.id
                }
            }
            ));
            //list with label and value for objet
            const objetList = await ObjetDataService.getAll();
            setObjet(objetList.data.map(objet => {
                return {
                    label: objet.title,
                    value: objet.id
                }
            }));

            //list with label and value for decompte
            const decompteList = await DecompteDataService.getAll();
            setDecompteList(decompteList.data.map(decompte => {
                return {
                    label: decompte.type,
                    value: decompte.decompte_id
                }
            }));
            //list with label and value for extrait
            const extraitList = await ExtraitDataService.getAll();
           
            setExtraitList(extraitList.data.map(extrait => {
                return {
                    label: extrait.num_extrait,
                    value: extrait.extrait_id
                }
            }));

            // get the tva option
            const tvaList = await tvaService.getAll();
           
            setTvaList(tvaList.data.map(tva => {
                return {
                    label: tva.tva_value + "%",
                    value: tva.tva_id
                }
            }));

            //get the last id of facture
            const factureId = await FactureDataService.getLastFactureId();
           
            setFactureId(factureId +1);
          
            

            
            

        }
        fetchData();
    }, []);
    
    const saveFacture = () => {
      
        var data = {
            num_facture: factures.num_facture,
            facture_date: factures.date_facture,
            montant: factures.montant_facture,
            objet_id: factures.objet,
            libelle_id: factures.libelle,
            estpaye: factures.estpaye,
            tva_id : factures.tva,
            num_facture_lamy : factures.num_facture_lamy,
           
            
        };
        FactureDataService.create(data)
            .then(response => {
                setFactures({
                    ...factures,
                    num_facture: response.data.num_facture,
                    facture_date: response.data.facture_date,
                    montant: response.data.montant,
                    objet_id: response.data.objet_id,
                    libelle_id: response.data.libelle_id,
                    estpaye: response.data.estpaye,
                    tva_id: response.data.tva_id,
                    num_facture_lamy: response.data.num_facture_lamy,
                });
              
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Facture Added', life: 3000 });
                setFactureId(response.data.facture_id+1);
                saveFacturier(); 
                
            })
            .catch(e => {
              
                toastError.current.show({ severity: 'error', summary: 'Error', detail: 'Facture not added', life: 3000 });

            });
    };

    // fonction qui crée le facturier dans la base de donnée grâce au dernier id de facture récupéré
    const saveFacturier = () => {
        // console.log de la variable decompte pour voir si on récupère bien l'id du décompte

       
        var data = {
            facture_id: factureId,
            decompte_id: decompte.decompte,
            co_fournisseur_id: fournisseur.fournisseur,
            extrait_id: extrait.extrait,
            co_client_id : client.client,
            
        };
       
        FacturierDataService.create(data)
            .then(response => {
                setFacturier({
                    ...facturier,
                    facture_id: response.data.facture_id,
                    decompte_id: response.data.decompte_id,
                    co_fournisseur_id: response.data.fournisseur_id,
                    extrait_id: response.data.extrait_id,
                    co_client_id: response.data.client_id, 
                });
              
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Facturier Added', life: 3000 });
                //vide les champs du formulaire
                setFactures({
                    ...factures,
                    num_facture: "",
                    date_facture: "",
                    montant_facture: "",
                    objet: "",
                    libelle: "",
                    estpaye: "",
                    tva: "",
                    num_facture_lamy: "",
              
                });
                setDecompte({
                    ...decompte,
                    decompte: "",
                });

                setFournisseur({
                    ...fournisseur,
                    fournisseur: "",
                });

                setClient({
                    ...client,
                    client: "",
                });

                setExtrait({
                    ...extrait,
                    extrait: "",
                });

            })
            .catch(e => {
           
                toastError.current.show({ severity: 'error', summary: 'Error', detail: 'Facturier not added', life: 3000 });

            });
    };


        
    

    const saveLibelle = () => { 
        var data = {
            title: libelles.title,
        };
        LibelleDataService.create(data)
            .then(response => {
                setLibelles({
                    ...libelles,
                    title: response.data.title,
                });
        
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Libelle Added', life: 3000 });

            })
            .catch(e => {
               
                toastError.current.show({ severity: 'error', summary: 'Error', detail: 'Libelle not added', life: 3000 });
                
            });
    };






    

    

    return (
        <div className="container">   
            <Toast ref={toast} /> 
            
             {/*Form for adding a facture in the database  */}
            <Form onSubmit={saveFacture}>
            <div className="inline-block form-group">

                    <label htmlFor="num_facture">Numéro de facture</label>
                    <InputText id="num_facture" type="text" value={factures.num_facture} onChange={(e) => setFactures({ ...factures, num_facture: e.target.value })} />


                    {/* num facture lamy */}
                    <label htmlFor="num_facture_lamy">Numéro de facture Lamy</label>
                    <InputText id="num_facture_lamy" type="text" value={factures.num_facture_lamy} onChange={(e) => setFactures({ ...factures, num_facture_lamy: e.target.value })} />
                    {/* montant de la facture */}
                    <label htmlFor="montant_facture">Montant de la facture</label>
                    <InputText id="montant_facture" type="numeric" value={factures.montant_facture} onChange={(e) => setFactures({ ...factures, montant_facture: e.target.value })} />

                    {/* date de la facture */}
                    <label htmlFor="date_facture">Date de la facture</label>
                    <Calendar id="date_facture" value={factures.date_facture} onChange={(e) => setFactures({ ...factures, date_facture: e.target.value })} showIcon />
                    
                    {/* put the next part at the right of the previous section */}
                </div>
                <div className="inline-block form-group">

                    {/* libelle */}
                    <label htmlFor="libelle">Libelle</label>
                    <Dropdown id="libelle" value={factures.libelle} options={libelleList} onChange={(e) => setFactures({ ...factures, libelle: e.value })} placeholder="Select a libelle" />
   
                    {/* objet */}
                    <label htmlFor="objet">Objet</label>
                    <Dropdown id="objet" value={factures.objet} options={objet} onChange={(e) => setFactures({ ...factures, objet: e.value })} placeholder="Select a objet" />
                    {/* Add an + for adding a new libelle in the database */}

                    {/* decompte */}
                    <label htmlFor="decompte">Décompte</label>
                    <Dropdown id="decompte" value={decompte.decompte} options={decompteList} onChange={(e) => setDecompte({ ...decompte, decompte: e.value })} placeholder="Select a decompte" />
                </div>
                <div className="inline-block form-group">
                    {/* fournisseur */}
                    <label htmlFor="fournisseur">Fournisseur</label>
                    <Dropdown id="fournisseur" value={fournisseur.fournisseur} options={fournisseurList} onChange={(e) => setFournisseur({ ...fournisseur, fournisseur: e.value })} placeholder="Select a fournisseur" />

                    {/* client */}
                    <label htmlFor="client">Client</label>
                    <Dropdown id="client" value={client.client} options={clientList} onChange={(e) => setClient({ ...client, client: e.value })} placeholder="Select a client" />
                    </div>
                   <div className="inline-block form-group vertical-align:top">
                    {/* selectButton estPaye */}
                    <label htmlFor="estpaye">Est payé</label>
                    <SelectButton id="estpaye" value={factures.estpaye } options={options} optionLabel="name"  onChange={(e) => setFactures({ ...factures, estpaye: e.value })} />
                    {factures.estpaye === true ? (
                        <div>
                            {/* extrait */}
                            <label htmlFor="extrait">Extrait</label>
                            <Dropdown id="extrait" value={extrait.extrait} options={extraitList} onChange={(e) => setExtrait({ ...extrait, extrait: e.value })} placeholder="Select a extrait" />

                        </div>  
                    ) : (
                        <div></div>
                    )}
                    {/* tva  */}
                    <label htmlFor="tva">TVA</label>
                    <Dropdown id="tva" value={factures.tva} options={tvaList} onChange={(e) => setFactures({ ...factures, tva: e.value })} placeholder="Select a tva" />
                   {/* si oui est choisit, afficher la section pour les extraits */}
                    

                    
 
   
                        

                    

</div>
            </Form>
            
            <Button label="Submit" onClick={saveFacture} />
      
            
          
       


            
   

           
        </div>
    );
};
        

 


export default AddFacturier;


