import react from 'react';
import { useEffect } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
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

    const onRowEditComplete = (e) => {
        console.log(e)
        const dataFacture = {
            num_facture: e.newData.num_facture,
        }
        factureService.updateFacture(e.data.facture_id, dataFacture)
            .then((response) => {
                console.log(response.data);
                getFactures();
            }   
            )
            .catch((error) => {
                console.log(error);
            }
            );


        

    }

    const textEditor = (options) => {
        // Message dans le dialog pour informer l'utilisateur
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} tooltip="Attention ! Toutes modifications entrainera des changements sur tout le facturier" tooltipOptions={{ className: 'yellow-tooltip', position: 'top' }} />;
    }

    const numberEditor = (options) => {
        // Message dans le dialog pour informer l'utilisateur
        return <InputText type="number" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} tooltip="Attention ! Toutes modifications entrainera des changements sur tout le facturier" tooltipOptions={{ className: 'yellow-tooltip', position: 'top' }} />;
    }


    return (
        <div>
            <DataTable value={facture} editMode="row" onRowEditComplete={onRowEditComplete}>
                <Column field="num_facture" header="Numéro de facture" editor={(options) => numberEditor(options)} sortable></Column>

                <Column field="montant" header="Montant" sortable></Column>
                <Column field="facture_date" header="Date de facture" sortable></Column>
                <Column field="estpaye" header="Date d'échéance" body={statusBodyTemplate} sortable></Column>
                <Column field="objet.title" header="Objet" sortable></Column>
                <Column field="libelle.title" header="Client" sortable></Column>
                <Column field="tva.tva_value" header="TVA" sortable></Column>
                <Column rowEditor ></Column>
            </DataTable>


            
            
        </div>
    );
}

export default FactuerDatatable;