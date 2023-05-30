
import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import ExtraitDatatable from './extraitDatatable.component';
import FactureDatatable from './factureDatatable.component';
import ClientDatatable from './clientDatatable.component';
import FournisseurDatatable from './fournisseurDatatable.component';
import UsersDatatable from './userDatatable.component';
import './allData.css'


const AllData = () => {

        return (
                <div className="container" id="alldata" >
                        <div className="card">
                                <TabView style={{ borderRadius: '10px' }}>
                                        <TabPanel header="Extrait" rightIcon="pi pi-folder-open" >
                                                <ExtraitDatatable />
                                        </TabPanel>
                                        <TabPanel header="Factures " rightIcon="pi pi-wallet">
                                                <FactureDatatable />
                                        </TabPanel>
                                        <TabPanel header="Client/Habitant" rightIcon="pi pi-th-large">
                                                <ClientDatatable />
                                        </TabPanel>
                                        <TabPanel header="Fournisseurs" rightIcon="pi pi-tags">
                                                <FournisseurDatatable />
                                        </TabPanel>
                                        <TabPanel header="Utilisateurs" rightIcon="pi pi-users">
                                                <UsersDatatable />
                                        </TabPanel>
                                </TabView>
                        </div>
                </div>
        );


}
export default AllData