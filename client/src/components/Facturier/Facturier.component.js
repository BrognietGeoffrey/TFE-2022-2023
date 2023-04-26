
import React, { useState, useEffect } from 'react';
import './Facturiers.css';
import {TabView, TabPanel} from 'primereact/tabview';
import AddFacturier from './addFacturier.component';
import FacturierDatatable from './facturierDatatable.component';

import Dexie from 'dexie';

const Facturier = () => {

        return (
                <div className="card"  style={{borderRadius: '10px', minWidth: '90%', position: 'relative', left: '50%', transform: 'translateX(-50%)'}}>
                <h5></h5>
                <TabView style={{borderRadius: '10px'}}>
                    
                    {/* Pour le tabPanel, recharger les données quand un nouvel facturier a été ajouter */}
                    <TabPanel header="Facturier" leftIcon="pi pi-file">
                    <FacturierDatatable />
                    </TabPanel>
                    <TabPanel header="Ajout " style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <AddFacturier style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}/>
                    </TabPanel>

                </TabView>
                {/* Dialog pour ajouter une facture
                 */}
              
                 </div>
        );

    
}
export default Facturier


    

