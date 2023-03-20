
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './Facturiers.css';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';

import {Card} from 'primereact/card';
import {TabView, TabPanel} from 'primereact/tabview';

import AddFacturier from './addFacturier.component';
import FacturierDataService from "../services/facturierService";
import FournisseurService from '../services/fournisseurService';





const Facturier = () => {


    const [loading, setLoading] = useState(true)
    const [facturiers, setFacturiers] = useState([]);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [customers, setCustomers] = useState(null);

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const statuses = ['payée', 'non payée '];



  

    useEffect(() => {
        async function fetchFacturiers() {
          try {
            const response = await axios.get('/api/facturiers');
            setFacturiers(response.data);
            setLoading(false);
          } catch (error) {
            console.error(error);
          }
        }
    
        fetchFacturiers();
      }, []);
    
    

   



    
    

    const formatDate = (value) => {
   
        let date = new Date(value);
        return date.toLocaleDateString()
    }

    const formatCurrency = (value) => {
        return value
        // return value.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR' });
    }



    const refreshTable = () => {
        setLoading(true);
        FacturierDataService.getAll().then(data => { setFacturiers(data); setLoading(false); });
    }
    const renderHeader = () => {
        
    
        return (
            <div className="flex justify-content-between align-items-center">
                <h5 className="m-0">Facturiers</h5>
                <span className='p-input-icon-left ml-9'>
                    <Button icon="pi pi-refresh" onClick={refreshTable} />
                </span>
              
            </div>
        )
    }




    const numfactureBodyTemplate = (rowData) => {
        return "23/" + rowData.facture.num_facture;

    }
    const numfactureLamyBodyTemplate = (rowData) => {
        return "23/" + rowData.facture.num_facture_lamy;

    }
    const numdecompteBodyTemplate = (rowData) => {
        return "N°" + rowData.decompte.num_decompte;

    }

    const objetBodyTemplate = (rowData) => {
        return rowData.objetTitle;
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

    const tvaBalanceBodyTemplate = (rowData) => {
       
        const tva = rowData.facture.tva 
        console.log(tva, 'tva');
        const montanttva = rowData.facture.montant + (rowData.facture.montant * tva.tva_value/100);
        
        return formatCurrency(montanttva);
    }
    const balanceFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />
    }

    
    

    const statusBodyTemplate = (rowData) => {
        if (loading) {
            return <ProgressBar mode="indeterminate" style={{ height: '6px' }} />
        }
        else {
        if (rowData.facture.estpaye === true) {
            return <span className={`customer-badge status-${rowData.facture.estpaye}`}><Badge value="Payée" severity="success"></Badge></span>;
        }
        else {
            return <span className={`customer-badge status-${rowData.facture.estpaye}`}><Badge value="Non payée" severity="danger"></Badge></span>;
        }
    }
    }

    const tvaBodyTemplate = (rowData) => {
        const tva = rowData.facture.montant + rowData.tva.tva_value / 100;
        return formatCurrency(tva) + ' €';
    }
    
    const numextraitBodyTemplate = (rowData) => {
        if (rowData.extrait_id === null) {
            return 'Pas d"extrait';
        }
        else {
            return "N°" + rowData.extrait.num_extrait + " / " + rowData.extrait.num_extrait;
        }
    }
      
    
       

    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }

    const statusItemTemplate = (option) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    }

        
    
    
    const header = renderHeader();



    if (loading) {
        return <ProgressBar mode="indeterminate" style={{ height: '6px' }} />;

    }
    else {
        return (
  

         
                <div className="card"  >
                <h5></h5>
                <TabView >
                    
                    <TabPanel header="Facturier"  onChange={refreshTable}>
  
                          
         

                        
                    <Card title="Facturiers" subTitle="Liste des facturiers" className='card-body'  >
                        // button to refresh the table
                        
                    <DataTable  value={facturiers} paginator className="p-datatable-customers" header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    dataKey="id" rowHover filterDisplay="menu" loading={loading}
                    emptyMessage="Aucunes données trouvées." scrollable 
                    currentPageReportTemplate=" {first} de {last} pour {totalRecords} données" responsiveLayout="scroll">
                    
                    <Column field="facture.num_facture_lamy" header="N° de facture Lamy" sortable filter filterPlaceholder="Rechercher par N°" body={numfactureLamyBodyTemplate} style={{ minWidth: '14rem' }}/>
                    <Column field='compte_fournisseur.fournisseur.name' header="Fournisseur" sortable filter filterPlaceholder="Rechercher par nom" style={{ minWidth: '14rem' }} />
                         
                    <Column field='compte_fournisseur.fournisseur.num_fournisseur' header="N° de fournisseur" sortable  filter filterPlaceholder='Rechercher par N°' style={{ minWidth: '14rem' }}></Column>
                    <Column field='facture.objet.title' header="Objet" sortable filter filterPlaceholder='Rechercher par objet...' style={{ minWidth: '14rem' }} ></Column>
                    <Column field="facture.facture_date" header="Date de la facture" sortable filterField="date" dataType="date"  body={dateBodyTemplate} filter filterElement={dateFilterTemplate} style={{ minWidth: '14rem' }}/>
                    <Column field="facture.num_facture" header="N° de facture" sortable filter filterPlaceholder="Rechercher par N°" style={{ minWidth: '14rem' }} body={numfactureBodyTemplate}/>
                    <Column field="facture.libelle.title" header="Libellé" sortable filter filterPlaceholder="Rechercher par libellé" style={{ minWidth: '14rem' }} />
                    <Column field="decompte.num_decompte" header="N° de décompte " sortable filter filterPlaceholder="Rechercher par N°" style={{ minWidth: '14rem' }} body={numdecompteBodyTemplate}/>
                    <Column field="facture.montant" header="Montant de la facture" sortable dataType="numeric" style={{ minWidth: '8rem' }} body={balanceBodyTemplate} filter filterElement={balanceFilterTemplate} />
                    <Column header="Montant avec TVA"  sortable dataType="numeric" style={{ minWidth: '8rem' }} body={tvaBalanceBodyTemplate} filter filterElement={balanceFilterTemplate} />
                    {/* <Column field="extrait.montant" header="Montant extrait" sortable dataType="numeric" style={{ minWidth: '8rem' }} body={extraitBodyTemplate} filter filterElement={extraitFilterTemplate} /> */}
                    {/* <Column field="decompte.num_decompte" header="N° de décompte " sortable filter filterPlaceholder="Rechercher par N°" style={{ minWidth: '14rem' }} body={numdecompteBodyTemplate}/> */}
                    <Column field="facture.estpaye" header="Status" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '10rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
                    <Column  header="N° extrait" sortable filter filterPlaceholder="Rechercher par N°" style={{ minWidth: '14rem' }} body={numextraitBodyTemplate}/>
                    <Column field="extrait.date_extrait" header="Date extrait" sortable filterField="date" dataType="date" style={{ minWidth: '8rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} /> 
                </DataTable>
                    </Card>
                    </TabPanel>
                    <TabPanel header="Ajout ">
                    <AddFacturier />
                    </TabPanel>

                </TabView>
                {/* Dialog pour ajouter une facture
                 */}
              
                 </div>
        );

    }
}

           
         






export default Facturier


    

