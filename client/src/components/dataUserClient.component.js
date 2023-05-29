import React from 'react';
import { useState, useEffect, useRef } from 'react';
import jwt_decode from 'jwt-decode';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import FactureService from '../services/factureService';
import './dataUser.css';

const DataUserClient = () => {
    // Get all factures from the database where the user id is the same as the user id in the token
    const [factures, setFactures] = useState([]);
    const token = localStorage.getItem('access_token');
    const decoded = jwt_decode(token);
    const [loading, setLoading] = useState(true);

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


    return (
        <div className="container">
            {/* Double Card, one with the data from factures and other with a responsive mail sender */}
            <div className="p-grid">
                <div className="facture-section">
                    <Card title="Factures" className="section-three">
                        <DataTable
                            value={factures}
                            paginator
                            rows={10}
                            rowsPerPageOptions={[5, 10, 25]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="{first}-{last} sur {totalRecords}"
                            loading={loading}
                            loadingIcon="pi pi-spinner"
                            responsive
                        >
                            <Column field="facture.num_facture" header="N° de facture" sortable></Column>
                            <Column field="facture.montant" header="Montant" body = {rowData => { return <span>{rowData.facture.montant} €</span>}} sortable></Column>
                            <Column field="facture.estpaye" header="Status de la facture" body = {statusFactureTemplate}></Column>
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
