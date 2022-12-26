
import React, { useState, useEffect } from 'react';
import './Facturiers.css';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';

import { Badge } from 'primereact/badge';

import {Card} from 'primereact/card';
import {TabView, TabPanel} from 'primereact/tabview';

import {AddFacturier} from './addFacturier.component';
import FacturierDataService from "../services/facturierService";




const Facturier = () => {


    const [loading, setLoading] = useState(true)
    const [facturiers, setFacturiers] = useState([]);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'client.name_client': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

        'facture.num_facture': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.COMMENCE_AVEC }] },
        'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        'facture.montant': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'extrait.montant': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },

        'facture.estpaye': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'decompte.num_decompte': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const statuses = ['Paid', 'Unpaid '];



     // get all facturiers from the database
     const getFacturiers = () => {
        setLoading(true);
        FacturierDataService.getAll()
            .then(response => {
                setFacturiers(response);
                console.log (response);
            })
            .catch(e => {
                console.log(e);
            });
        setLoading(false);
    };

   // run once when the component is mounted
    useEffect(() => {
        getFacturiers();
        setLoading(false);
    }, []);





    
    

    const formatDate = (value) => {
        let date = new Date(value);
        return date.toLocaleDateString()
    }

    const formatCurrency = (value) => {
        console.log(value);
        return value
        // return value.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR' });
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between align-items-center">
                <h5 className="m-0">Facturiers</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        )
    }

    const numfactureBodyTemplate = (rowData) => {
        return "23/" + rowData.facture.num_facture;

    }
    const numdecompteBodyTemplate = (rowData) => {
        return "N°" + rowData.decompte.num_decompte;

    }

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.facture.facture_date);
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }

    const extraitBodyTemplate = (rowData) => {
        return formatCurrency(rowData.extrait.montant);
    }

    const extraitFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="EUR" locale="fr-BE" />
    }

    const balanceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.facture.montant);
    }

    const balanceFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="EUR" locale="fr-BE" />
    }

    
    

    const statusBodyTemplate = (rowData) => {
        if (loading) {
            return <ProgressBar mode="indeterminate" style={{ height: '6px' }} />
        }
        else {
        if (rowData.facture.estpaye === "paid") {
            return <span className={`customer-badge status-${rowData.facture.estpaye}`}><Badge value="Payée" severity="success"></Badge></span>;
        }
        else {
            return <span className={`customer-badge status-${rowData.facture.estpaye}`}><Badge value="Non payée" severity="danger"></Badge></span>;
        }
    }
    }
    
    
       

    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }

    const statusItemTemplate = (option) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    }
    // const clientOrFournisseurTemplate = (rowData) => {
    //     // if data.length > 1 then it's a client and a fournisseur
    //     // if the rowData is not loaded yet, wait for it to load
    //     if (loading) {
    //         return <ProgressBar mode="indeterminate" style={{ height: '6px' }} />
    //     }
    //     else {
            
            
    //         if (rowData.co_client_id !== null && rowData.co_fournisseur_id !== null) {
    //                     return <span className="customer-badge status-client"><Badge value={rowData.info[0].name} severity="success"></Badge></span>,
    //                             <span className="customer-badge status-fournisseur"><Badge value="Fournisseur" severity="success"></Badge></span>;
    //                 }
    //                 if (rowData.co_client_id !== null) {
    //                     return <span className="customer-badge status-client"><Badge value="Client" severity="success"></Badge></span>;
    //                 }
    //                 if (rowData.co_fournisseur_id !== null) {
    //                     return <span className="customer-badge status-fournisseur"><Badge value="Fournisseur" severity="success"></Badge></span>;
    //                 }
    //                 else {
    //                     return <span className="customer-badge status-client"><Badge value="Rien" severity="danger"></Badge></span>;
    //                 }
    //             }
    //         }
        
    
    
    const header = renderHeader();



    if (loading) {
        return <ProgressBar mode="indeterminate" style={{ height: '6px' }} />;

    }
    else {
        return (
            <div className="" style={{width: 'auto'}}>
                <div className="" style={{width: 'auto'}}>
                <div className="card">
                <h5></h5>
                <TabView>
                    <TabPanel header="Ajout ">
                    <AddFacturier />
                    </TabPanel>
                    <TabPanel header="Facturier" onClick={getFacturiers}>
                    <Card title="Facturiers" subTitle="Liste des facturiers" style={{width: 'auto'}}>
                    <DataTable  value={facturiers} paginator className="p-datatable-customers" header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    dataKey="id" rowHover selection={selectedCustomers} onSelectionChange={e => setSelectedCustomers(e.value)}
                    filters={filters} filterDisplay="menu" loading={loading}  scrollable scrollHeight="70vh" scrollWidth="10vw"
                    globalFilterFields={['facture.num_facture', 'facture.facture_date', 'balance', 'status']} emptyMessage="Aucunes données trouvées."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" style={{width:'100%'}}>
                    <Column selectionMode="multiple" selectionAriaLabel="name" headerStyle={{ width: '1em' }}></Column>
                    <Column field="facture.num_facture" header="N° de facture Lamy" sortable filter filterPlaceholder="Rechercher par N°" style={{ minWidth: '14rem' }} body={numfactureBodyTemplate}/>
                    <Column field="facture.facture_date" header="Date" sortable filterField="date" dataType="date" style={{ minWidth: '8rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
                    <Column field="facture.montant" header="A payé" sortable dataType="numeric" style={{ minWidth: '8rem' }} body={balanceBodyTemplate} filter filterElement={balanceFilterTemplate} />
                    <Column field="facture.description" header="Description" sortable filter filterPlaceholder="Rechercher par description" style={{ minWidth: '14rem' }} />
                    <Column field="extrait.montant" header="Montant extrait" sortable dataType="numeric" style={{ minWidth: '8rem' }} body={extraitBodyTemplate} filter filterElement={extraitFilterTemplate} />
                    <Column field="decompte.num_decompte" header="N° de décompte " sortable filter filterPlaceholder="Rechercher par N°" style={{ minWidth: '14rem' }} body={numdecompteBodyTemplate}/>
                    <Column field="facture.estpaye" header="Status" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '10rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
                    <Column field="extrait.date_extrait" header="Date extrait" sortable filterField="date" dataType="date" style={{ minWidth: '8rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} /> 
                </DataTable>
                    </Card>
                    </TabPanel>

                </TabView>
            </div>
                    

                 
                </div>
            </div>
        );
    }

    
}







export default Facturier


    

