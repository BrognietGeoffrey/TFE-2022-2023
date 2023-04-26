
import React, { useState, useEffect } from 'react';
import {TabView, TabPanel} from 'primereact/tabview';
import ExtraitDatatable from './extraitDatatable.component';
import FactureDatatable from './factureDatatable.component';
import ClientDatatable from './clientDatatable.component';
import FournisseurDatatable from './fournisseurDatatable.component';

import Dexie from 'dexie';

const AllData = () => {

        return (
                <div className="card">
                <h5></h5>
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
                   

                </TabView>
           
              
                 </div>
        );

    
}
export default AllData