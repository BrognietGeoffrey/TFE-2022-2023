import react from 'react';
import { useEffect } from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import ClientDataService from '../../services/clientService';

const ClientDatatable = () => {
    const [clients, setClients] = react.useState([]);

    const getClients = () => {
        ClientDataService.getAll().then((response) => {
            setClients(response.data);
            console.log(response.data, 'response.data');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getClients();
    }, []);

    return (
        <div>
            <DataTable value={clients} style={{width: '100%', height: '450px', overflowY : 'auto'}}>
                <Column field="name" header="Nom" sortable></Column>
                <Column field="firstname" header="Prénom" sortable></Column>
                <Column field="email_client" header="Email" sortable></Column>
            </DataTable>
        </div>
    );
}

export default ClientDatatable;
