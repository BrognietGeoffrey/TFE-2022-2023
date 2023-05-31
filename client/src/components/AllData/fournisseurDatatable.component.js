import react from 'react';
import { useEffect, useState } from 'react';
import {InputText} from 'primereact/inputtext';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import './allData.css'

import fournisseurService from '../../services/fournisseurService';
import compteFournisseurService from '../../services/compteFournisseurService';

const FournisseurDatatable = () => {
    const [fournisseur, setFournisseur] = react.useState([]);
    const [compteFournisseur, setCompteFournisseur] = react.useState([]);
    const toast = react.useRef(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');

    const [filters1, setFilters1] = useState(null)
    const [rows, setRows] = useState(10);

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 480) {
          setRows(5);
        } else {
          setRows(10);
        }
      };
  
      // Écoute les événements de redimensionnement de la fenêtre
      window.addEventListener('resize', handleResize);
  
      // Définit la valeur initiale en fonction de la taille de l'écran
      handleResize();
  
      // Nettoie l'écouteur d'événement lorsqu'un composant est démonté
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const getFournisseurs = () => {
        fournisseurService.getAll().then((response) => {
            setFournisseur(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const getCompteFournisseur = () => {
        compteFournisseurService.getAll().then((response) => {
            setCompteFournisseur(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getFournisseurs()
        getCompteFournisseur()
        initFilters1();
    }, []);

    const onRowEditComplete = (e) => {
        console.log(e)
        const data = {
            name: e.newData["fournisseur.data.name"],
            email_fournisseur: e.newData["fournisseur.data.email_fournisseur"], 
            adresse_fournisseur: e.newData["fournisseur.data.adresse_fournisseur"],
            telephone_fournisseur: e.newData["fournisseur.data.telephone_fournisseur"],
            num_fournisseur: e.newData["fournisseur.data.num_fournisseur"],
            description : e.newData["fournisseur.data.description"],
        }
        const dataCompteClient = {
            numCompteFournisseur: e.newData.numCompteFournisseur,
            num_compte_banque: e.newData.num_compte_banque,
        }
        // si au moins une data de data a été modifié alors on fait appel à la fonction update
        if (e.data.name != e.newData["fournisseur.data.name"] || e.data.email_fournisseur != e.newData["fournisseur.data.email_fournisseur"] || e.data.adresse_fournisseur != e.newData["fournisseur.data.adresse_fournisseur"] || e.data.telephone_fournisseur != e.newData["fournisseur.data.telephone_fournisseur"] || e.data.num_fournisseur != e.newData["fournisseur.data.num_fournisseur"] || e.data.description != e.newData["fournisseur.data.description"]) {
        fournisseurService.update(e.data.fournisseur_id, data)
        console.log(e)
        .then((response) => {   
            console.log(response.data);
            toast.current.show({ severity: 'success', summary: 'Modification effectuée', detail: 'Fournisseur modifié', life: 3000 });
            getCompteFournisseur();
        }
        )
        .catch((error) => {
            console.log(error);
            toast.current.show({ severity: 'error', summary: 'Modification non effectuée', detail: error.response.data.message, life: 3000 });
        }
        );}
        if (e.data.numCompteFournisseur != e.newData.numCompteFournisseur || e.data.num_compte_banque != e.newData.num_compte_banque) {
        compteFournisseurService.update(e.data.compte_fournisseur_id, dataCompteClient)
        .then((response) => {
            console.log(response.data);
            toast.current.show({ severity: 'success', summary: 'Modification effectuée', detail: 'Compte fournisseur modifié', life: 3000 });
            getCompteFournisseur();
        }
        )
        .catch((error) => {
            console.log(error);
            toast.current.show({ severity: 'error', summary: 'Modification non effectuée', detail: error.response.data.message, life: 3000 });
        }
        );
    }
    }

    const clearFilter1 = () => {
        initFilters1();
    }

    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    }


    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'fournisseur.data.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'fournisseur.data.email_fournisseur': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'fournisseur.data.adresse_fournisseur': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'fournisseur.data.telephone_fournisseur': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'fournisseur.data.description': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'numCompteFournisseur': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'num_compte_banque': {  operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

        });
        setGlobalFilterValue1('');
    }

    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between" id="header">
                <Button type="button" icon="pi pi-filter-slash" label="Vider les filtres" className="p-button-outlined" onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Rechercher..." />
                </span>
            </div>
        )
    }

    const header1 = renderHeader1();




        
    

    const textEditor = (options) => {
        console.log(options)
        // Message dans le dialog pour informer l'utilisateur
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} tooltip="Attention ! Toutes modifications entrainera des changements sur tout le facturier" tooltipOptions={{ className: 'yellow-tooltip', position: 'top' }} />;
    }

    return (
        <div>
            <Toast ref={toast} />
            <DataTable value={compteFournisseur} editMode="row" header={header1} onRowEditComplete={onRowEditComplete} filterDisplay="menu" globalFilterFields={['fournisseur.data.name', 'numCompteFournisseur', , 'fournisseur.data.adresse_fournisseur', 'fournisseur.data.telephone_fournisseur','num_compte_banque', 'fournisseur.data.email_fournisseur', 'fournisseur.data.description', 'createdAt']} filters={filters1}
            rows={rows} paginator rowsPerPageOptions={[5, 10, 25, 50]} emptyMessage="Aucun compte fournisseur trouvé.">
                <Column field="fournisseur.data.name" header="Nom" sortable editor={(options) => textEditor(options)} filter></Column>
                <Column field="fournisseur.data.email_fournisseur" header="Email" sortable editor={(options) => textEditor(options)} filter ></Column>
                <Column field="fournisseur.data.adresse_fournisseur" header="Adresse" sortable editor={(options) => textEditor(options)} filter> </Column>
                <Column field="fournisseur.data.telephone_fournisseur" header="Téléphone" sortable editor={(options) => textEditor(options)} filter></Column>
                <Column field="fournisseur.data.num_fournisseur" header="Numéro de fournisseur" sortable editor={(options) => textEditor(options)} filter></Column>
                <Column field="fournisseur.data.description" header="Description" sortable editor={(options) => textEditor(options)} filter></Column>
                <Column field="numCompteFournisseur" header="Numéro de compte" sortable editor={(options) => textEditor(options)} filter></Column>
                <Column field="num_compte_banque" header="N° de compte en banque" sortable editor={(options) => textEditor(options)} filter></Column>
                <Column field="createdAt" header="Date de création" body={(rowData) => { return (<div>{new Date(rowData.createdAt).toLocaleDateString()}</div>)}}></Column>


                <Column rowEditor></Column>
            </DataTable>
            {console.log(compteFournisseur)}
        </div>
    );
}

export default FournisseurDatatable;