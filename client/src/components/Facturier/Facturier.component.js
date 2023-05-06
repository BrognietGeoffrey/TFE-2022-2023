
import React, { useState, useEffect } from 'react';
import './Facturiers.css';
import {TabView, TabPanel} from 'primereact/tabview';
import AddFacturier from './addFacturier.component';
import FacturierDatatable from './facturierDatatable.component';


const Facturier = () => {

        return (
                <div className="container" id="facturier">
                <div className="card" id="facturier">
      
                <TabView>
                    
                    {/* Pour le tabPanel, recharger les données quand un nouvel facturier a été ajouter */}
                    <TabPanel header="Facturier" leftIcon="pi pi-file">
                    <FacturierDatatable />
                    </TabPanel>
                    <TabPanel header="Ajout d'un facturier " rightIcon="pi pi-wallet">
                    <AddFacturier />
                    </TabPanel>
                     
                
                

                </TabView>
                {/* Dialog pour ajouter une facture
                 */}
              
                 </div>
                        </div>
        );

    
}
export default Facturier


    

