import react from 'react';
import { useEffect } from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import FournisseurDataService from '../../services/fournisseurService';

const FournisseurDatatable = () => {
    const [fournisseur, setFournisseur] = react.useState([]);

    const getFournisseur = () => {
        FournisseurDataService.getAll().then((response) => {
            setFournisseur(response.data);
            console.log(response.data, 'response.data');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getFournisseur();
    }, []);

    return (
        <div>
            <DataTable value={fournisseur}>
                <Column field="name" header="Nom" sortable></Column>
                <Column field="email_fournisseur" header="Prénom" sortable></Column>
                
            </DataTable>
        </div>
    );
}

export default FournisseurDatatable;