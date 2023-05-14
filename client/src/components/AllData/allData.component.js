
import React from 'react';
import {TabView, TabPanel} from 'primereact/tabview';
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
                <TabView style={{borderRadius: '10px'}}>
                    <TabPanel header="Extrait" leftIcon="pi pi-file">
                    <ExtraitDatatable />
                    </TabPanel>
                    <TabPanel header="Factures "  rightIcon="pi pi-wallet">
                    <FactureDatatable />
                    </TabPanel>
                    <TabPanel header="Client/Habitant" leftIcon="pi pi-file">
                    <ClientDatatable />
                    </TabPanel>
                    <TabPanel header="Fournisseurs" leftIcon="pi pi-file">
                    <FournisseurDatatable />
                    </TabPanel>
                        <TabPanel header="Utilisateurs" leftIcon="pi pi-file">
                        <UsersDatatable />
                        </TabPanel>
                   

                </TabView>
           
                </div>
                 </div>
        );

    
}
export default AllData