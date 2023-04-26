import react from 'react';
import { useState, useEffect, useRef } from 'react';
import jwt_decode from 'jwt-decode';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './Login/login.css';
import FactureService from '../services/factureService';

const DataUserClient = () => {
    // Get all factures from the database where the user id is the same as the user id in the token
    const [factures, setFactures] = useState([]);
    const token = localStorage.getItem('access_token');
    const decoded = jwt_decode(token);
    const toast = useRef(null);
    const [loading, setLoading] = useState(true);

    const facturesData = () => {
        const dataClient = decoded.user_id.client_id;
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

    return (
        <div className="container">
            <h1 className="title">Voici toutes les données de {decoded.user_id.username}</h1>
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
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} factures"
                            loading={loading}
                            loadingIcon="pi pi-spinner"
                            responsive
                        >
                            <Column field="facture.num_facture" header="Facture ID" sortable></Column>
                            <Column field="facture.montant" header="Client ID" sortable></Column>
                            <Column field="facture.estpaye" header="Date" sortable></Column>
                        </DataTable>
                    </Card>

                    <Card title="Recommandation/Remarques/Plaintes" className="section-three">
                        {/* Input text for sending mail */}
                        <div className="facture-section">
                            <div className="section-three">
                                <label htmlFor="subject">Subject</label>
                                <input id="subject" type="text" />

                                <label htmlFor="message">Message</label>
                                <textarea id="message" type="text" rows="3" />

                                <Button
                                    label="Send"
                                    icon="pi pi-envelope"
                                    
                                />

                                <Toast ref={toast} />

                            </div>
                        </div>
                    </Card>

                </div>

            </div>



        </div>
    );
}

export default DataUserClient
