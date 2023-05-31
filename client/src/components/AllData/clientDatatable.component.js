import react from 'react';
import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import './allData.css'


import ClientDataService from '../../services/clientService';
import compteClientService from '../../services/compteClientService';

const ClientDatatable = () => {
    const [clients, setClients] = react.useState([]);
    const [compteClient, setCompteClient] = react.useState([]);
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
    const getClients = () => {
        ClientDataService.getAll().then((response) => {
            setClients(response.data);
            console.log(response.data, 'response.data');
        })
            .catch((error) => {
                console.log(error);
            });
    }

    const getCompteClient = () => {
        compteClientService.getAll().then((response) => {
            setCompteClient(response);
            console.log(response, 'response.data');
        })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getClients();
        getCompteClient();
        initFilters1();

    }, []);

    const onRowEditComplete = (e) => {
        console.log(e)
        const data = {
            name: e.newData["client.name"],
            firstname: e.newData["client.firstname"],
            email_client: e.newData["client.email_client"],
            adresse_client: e.newData["client.adresse_client"],
            telephone_client: e.newData["client.telephone_client"],
            description: e.newData["client.description"],

        }
        const dataCompteClient = {
            numCompteClient: e.newData.numCompteClient,
            num_compte_banque: e.newData.num_compte_banque,
        }
        // update client data and compte client data
        ClientDataService.update(e.data.client_id, data)
            .then((response) => {
                console.log(response.data);
                toast.current.show({ severity: 'success', summary: 'Modification effectuée', detail: response.data.message, life: 3000 });
                getCompteClient();
            }
            )
            .catch((error) => {
                console.log(error);
                toast.current.show({ severity: 'error', summary: 'Modification non effectuée', detail: error.response.data.message, life: 3000 });
            }
            );
        if (e.data.numCompteClient != e.newData.numCompteClient || e.data.num_compte_banque != e.newData.num_compte_banque) {
            compteClientService.update(e.data.co_client_id, dataCompteClient)
                .then((response) => {
                    console.log(response.data);
                    toast.current.show({ severity: 'success', summary: 'Modification effectuée', detail: 'Modification du compte client', life: 3000 });
                    getCompteClient();
                }
                )
                .catch((error) => {
                    console.log(error);
                    toast.current.show({ severity: 'error', summary: 'Modification non effectuée', detail: error.response.data.message, life: 3000 });
                }
                );
        }
    }






    const textEditor = (options) => {
        console.log(options)
        // Message dans le dialog pour informer l'utilisateur
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} tooltip="Attention ! Toutes modifications entrainera des changements sur tout le facturier" tooltipOptions={{ className: 'yellow-tooltip', position: 'top' }} />;
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
            'client.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'client.firstname': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'client.email_client': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'client.adresse_client': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'client.telephone_client': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'client.description': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'numCompteClient': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'num_compte_banque': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

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


    return (
        <div>
            <Toast ref={toast} />
            <DataTable value={compteClient} editMode="row" header={header1} onRowEditComplete={onRowEditComplete} filterDisplay="menu" globalFilterFields={['client.name', 'numCompteClient', 'client.firstname', 'client.adresse_client', 'client.telephone_client', 'num_compte_banque', 'client.email_client', 'client.description', 'createdAt']} filters={filters1}
                paginator rows={rows} rowsPerPageOptions={[5, 10, 25, 50]} emptyMessage="Aucun client trouvé." currentPageReportTemplate="{first}-{last} sur {totalRecords}">
                <Column field="client.name" header="Nom" sortable editor={(options) => textEditor(options)} filter ></Column>
                <Column field="client.firstname" header="Prénom" sortable editor={(options) => textEditor(options)} filter ></Column>
                <Column field="client.email_client" header="Email" sortable editor={(options) => textEditor(options)} filter ></Column>
                <Column field="client.adresse_client" header="Adresse" sortable editor={(options) => textEditor(options)} filter></Column>
                <Column field="client.telephone_client" header="Téléphone" sortable editor={(options) => textEditor(options)} filter></Column>
                <Column field="client.description" header="Description" sortable editor={(options) => textEditor(options)} filter></Column>
                <Column field="numCompteClient" header="Numéro de compte" sortable editor={(options) => textEditor(options)} filter></Column>
                <Column field="num_compte_banque" header="N° de compte en banque" sortable editor={(options) => textEditor(options)} filter></Column>
                <Column field="createdAt" header="Date de création" body={(rowData) => { return (<div>{new Date(rowData.createdAt).toLocaleDateString()}</div>) }} ></Column>


                <Column rowEditor></Column>
            </DataTable>
        </div>
    );
}

export default ClientDatatable;
