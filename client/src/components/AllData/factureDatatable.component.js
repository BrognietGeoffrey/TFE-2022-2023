import react from 'react';
import { useEffect } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import factureService from '../../services/factureService';

const FactuerDatatable = () => {
    const [facture, setFacture] = react.useState([]);

    const getFactures = () => {
        factureService.getFactures().then((response) => {
            setFacture(response.data);
            console.log(response.data, 'response.data');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getFactures();
    }, []);

    const statusBodyTemplate = (rowData) => {
        if (rowData.estpaye === false) {
            return (
                <span className="p-badge p-badge-danger">Non payée</span>
            );

        }
        return <span className="p-badge p-badge-success">Payée</span>;
    }


    return (
        <div>
            <DataTable value={facture}>
                <Column field="num_facture" header="Numéro de facture"></Column>

                <Column field="montant" header="Montant" sortable></Column>
                <Column field="facture_date" header="Date de facture" sortable></Column>
                <Column field="estpaye" header="Date d'échéance" body={statusBodyTemplate} sortable></Column>
                <Column field="objet.title" header="Objet" sortable></Column>
                <Column field="libelle.title" header="Client" sortable></Column>
                <Column field="tva.tva_value" header="TVA" sortable></Column>
            </DataTable>


            
            
        </div>
    );
}

export default FactuerDatatable;