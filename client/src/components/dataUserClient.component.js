import React from 'react';
import { useState, useEffect, useRef } from 'react';
import jwt_decode from 'jwt-decode';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import FactureService from '../services/factureService';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Tooltip } from 'primereact/tooltip';



import './dataUser.css';

const DataUserClient = () => {
    // Get all factures from the database where the user id is the same as the user id in the token
    const [factures, setFactures] = useState([]);
    const token = localStorage.getItem('access_token');
    const decoded = jwt_decode(token);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');

    const [filters1, setFilters1] = useState(null)
    const [rows, setRows] = useState(10);
    const targetRef = useRef(null);


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

    const facturesData = () => {
        const dataClient = decoded.user_id.client_id;
        if (!dataClient) {
            setLoading(false);
        }
        const response = FactureService.getFacturesByClientId(dataClient, "client")
            .then((response) => {
                setFactures(response.data);
                console.log(response.data, 'response.data');
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        facturesData();
        initFilters1();

    }, []);

    const dateBodyTemplate = (rowData) => {
        if (rowData.facture.facture_date !== null) {
            console.log(rowData.facture.facture_date)

            return (
                <span className="p-badge p-badge-success">{new Date(rowData.facture.facture_date).toLocaleDateString()}</span>
            );
        }
    }

    const dueDateBodyTemplate = (rowData) => {
        console.log(rowData)
        const due_date = rowData.facture.due_date;
        const estpaye = rowData.facture.estpaye;
        // si date 
        if (rowData.facture.due_date) {
            // si date dépassée
            if (new Date(due_date) < new Date() && estpaye === false) {
                return (
                    <span className="p-badge p-badge-danger">{new Date(due_date).toLocaleDateString()}</span>
                );
            }
            // si date à venir
            else if (new Date(due_date) < new Date() && estpaye === true) {
                return (
                    <span className="p-badge p-badge-success">{new Date(due_date).toLocaleDateString()}</span>
                );
            }
            else if (new Date(due_date) > new Date() && estpaye === true) {
                return (
                    <span className="p-badge p-badge-success">{new Date(due_date).toLocaleDateString()}</span>
                );
            }
            else if (new Date(due_date) > new Date() && estpaye === false) {
                return (
                    <span className="p-badge p-badge-warning">{new Date(due_date).toLocaleDateString()}</span>
                );
            }
        }
        return <span className="p-badge p-badge-info">Pas de date</span>;
    }

    const statusFactureTemplate = (rowData) => {
        if (rowData.facture.estpaye === false) {
            return (
                <span className="p-badge p-badge-danger">Non payée</span>
            );

        }
        return <span className="p-badge p-badge-success">Payée</span>;
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
            'facture.num_facture': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'facture.montant': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'facture.estpaye': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'facture.facture_date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'facture.due_date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
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
                    <Tooltip target={targetRef} content="Pour rechercher une date, veuillez rechercher de cette manière Année-Mois-jour. Voici un exemple : 2023-01-01" position="left" />


                    <span ref={targetRef} style={{marginLeft : "0.3em"}}><i className="pi pi-question-circle p-ml-2" style={{ fontSize: '1.5em' }}></i></span>

                </span>
            </div>
        )
    }

    const header1 = renderHeader1();


    return (
        <div className="container" style={{ marginTop: '2em', maxWidth: 'fit-content' }} >
            {/* Double Card, one with the data from factures and other with a responsive mail sender */}
            <div className="p-grid">
                <div className="facture-section" >
                    <Card title="Factures" className="data-user section-three" id="card">
                    <DataTable  value={factures} header={header1} filterDisplay="menu" globalFilterFields={['facture.num_facture', 'facture.montant', 'facture.facture_date', 'facture.due_date']} filters={filters1}
               paginator rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive" emptyMessage="Aucune facture trouvée." currentPageReportTemplate=" {first}-{last} sur {totalRecords}" rows={rows}
               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
                            <Column field="facture.num_facture" header="N° de facture" sortable></Column>
                            <Column field="facture.montant" header="Montant HTVA" body = {rowData => { return <span>{rowData.facture.montant} €</span>}} sortable></Column>
                            <Column field="facture.montant_tva" header="Montant TVA" body = {rowData => { return <span>{rowData.facture.montant * rowData.facture.tva.tva_value / 100} €</span>}} sortable></Column>
                            <Column field="facture.estpaye" header="Status de la facture" body = {statusFactureTemplate}></Column>
                            <Column field="facture.description" header="Description" sortable></Column>
                            <Column field="facture.facture_date" header="Date de la facture" body={dateBodyTemplate} sortable></Column>
                            <Column field="facture.due_date" header="Date d'échéance" body = {dueDateBodyTemplate} sortable></Column>

                        </DataTable>
                    </Card>
                </div>

            </div>



        </div>
    );
}

export default DataUserClient
