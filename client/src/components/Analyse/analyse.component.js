import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';
import axios from 'axios';
import './analyse.css';
import React, { useState, useEffect, useRef } from "react";
import FacturierDataService from "../../services/facturierService";
import viewServices from "../../services/viewServices";
import ViewAnalyse from "./ViewAnalyse.component";
import LogsService from "../../services/logsService";
import CommentService from "../../services/commentService";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import CommentZone from './comment.component';

import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import {Chart } from 'primereact/chart';



export const Analyse = () => {
    const [facturier, setFacturier] = useState([]);
    const [view, setView] = useState([]);
    const [billPayed, setBillPayed] = useState([]);
    const [billNotPayed, setBillNotPayed] = useState([]);
    const [clientListWithFacture, setClientListWithFacture] = useState([]);
    const [selectedFacture, setSelectedFacture] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showDetailsLogs, setShowDetailsLogs] = useState(false);
    const [logs, setLogs] = useState([]);
    const [selectedLog, setSelectedLog] = useState(null);
    const [userColors, setUserColors] = useState([]);
    const toast = useRef(null);
    const [expandedRows, setExpandedRows] = useState(null);


    const handleShowDetails = (rowData) => {
      setSelectedLog(rowData);
      setShowDetailsLogs(true);
    };

    const retrieveFacturier = async () => {
      try {
        const response = await FacturierDataService.getAll();
        setFacturier(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const retrieveView = async () => {
      try {
        const response = await viewServices.getAllView();
        setView(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      retrieveFacturier();
      retrieveView();
    }, []);


    const getDataAnalyse = async () => {
      // trouver toutes les factures payés et non payées dans facturier dans deux variables différentes
      const billPayed = facturier.filter((bill) => bill.facture.estpaye === true);
      const billNotPayed = facturier.filter((bill) => bill.facture.estpaye === false);
      setBillPayed(billPayed);
      setBillNotPayed(billNotPayed);
      // Faire une liste des clients avec le noms des clients et leur id 
      const clientListWithFacture = facturier.map((bill) => {
        return {
          id: bill.compte_client.client.client_id,
          nom: bill.compte_client.client.name, 
          prenom : bill.compte_client.client.firstname
        };
      }
      );
      console.log(clientListWithFacture);
      // modifier cette liste pour qu'il n'y ait pas de doublons
      const clientListWithFactureWithoutDuplicates = clientListWithFacture.filter((client, index, self) =>
        index === self.findIndex((t) => (
          t.id === client.id
        ))
      );
      console.log(clientListWithFactureWithoutDuplicates);
      // maintenant trouver toutes les factures payés et non payées pour chaque client
      const clientListWithFactures = clientListWithFactureWithoutDuplicates.map((client) => {
        const factures = facturier.filter((bill) => bill.compte_client.client.client_id === client.id);
        // ajouter la liste des factures payés et non payées pour chaque client
        return {
          id: client.id,
          nom: client.nom + " " + client.prenom,
          factures : factures

        }
      });
      console.log(clientListWithFactures);
      setClientListWithFacture(clientListWithFactures);
    };

    useEffect(() => {
      getDataAnalyse();
    }, [facturier]);


const retrieveLogs = async () => {
  try {
    const response = await LogsService.getAll();
    setLogs(response.data);
    // dans l'ordre des dates décroissantes
    const logsSorted = response.data.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    );

  } catch (error) {
    console.log(error);
  }
};
    useEffect(() => {
      retrieveLogs();

    }, []);


    const dateBodyTemplate = (rowData) => {
      // transformer la date 2023-04-18T08:10:16.217Z en 18/04/2023 et heure 08:10 heure locale
      const date = new Date(rowData.createdAt);
      const dateLocale = date.toLocaleDateString("fr-FR", { timeZone: "UTC" });
      const timeLocale = date.toLocaleTimeString("fr-FR", { timeZone: "UTC" });
      return (
        <span>
          {dateLocale} {timeLocale}
        </span>
      );
    };

    const actionBodyTemplate = (rowData) => {

      return (
        <span>
          <span className="p-column-title">{rowData.description}</span>
        </span>
      );
    };

    const ajoutBodyTemplate = (rowData) => {
      const decompte = rowData.decompte;
      const facturier = rowData.facturier;
      const facture = rowData.facture;
      const client = rowData.client;
      const fournisseur = rowData.fournisseur;
      const libelle = rowData.libelle;
      const objet = rowData.objet;
      const extrait = rowData.extrait;
      const tva = rowData.tva;

    
      if (decompte !== null) {
        return (
          <span>
            <Button
              className="custom-button-logs p-button-link"
              tooltip="N° de décompte"
              tooltipOptions={{ position: 'left' }}
              onClick={() => handleShowDetails(rowData)}
            >
              {decompte.num_decompte}
            </Button>
          </span>
        );
      }
      if (facturier !== null) {
        return (
          <span>
            <Button
              className="custom-button-logs p-button-link"
              tooltip="N° de facture"
              tooltipOptions={{ position: 'left' }}
              onClick={ rowData.facturier.facture !== undefined ? () => handleShowDetails(rowData) : null}
            >
              {rowData.facturier.facture !== undefined ? rowData.facturier.facture.num_facture : "Pas de n° trouvé"}
              {/* {rowData.facture.num_facture}  */}
            </Button>
          </span>
        );
      }

      if (client !== null) {
        return (
          <span>
            <Button
              className="custom-button-logs p-button-link"
              tooltip="N° de client"
              tooltipOptions={{ position: 'left' }}
              onClick={() => handleShowDetails(rowData)}
            >
              {client.client_id}
            </Button>
          </span>
        );
      }

      if (fournisseur !== null) {
        return (
          <span>
            <Button
              className="custom-button-logs p-button-link"
              tooltip="N° de fournisseur"
              tooltipOptions={{ position: 'left' }}
              onClick={() => handleShowDetails(rowData)}
            >
              {fournisseur.fournisseur_id}
            </Button>
          </span>
        );
      }

      if (libelle !== null) {
        return (
          <span>
            <Button
              className="custom-button-logs p-button-link"
              tooltip="N° de libelle"
              tooltipOptions={{ position: 'left' }}
              onClick={() => handleShowDetails(rowData)}
            >
              {libelle.libelle_id}
            </Button>
          </span>
        );
      }
      if (objet !== null) {
        return (
          <span>
            <Button
              className="custom-button-logs p-button-link"
              tooltip="N° de objet"
              tooltipOptions={{ position: 'left' }}
              onClick={() => handleShowDetails(rowData)}
            >
              {objet.objet_id}
            </Button>
          </span>
        );
      }
      if (extrait !== null) {
        return (
          <span>
            <Button
              className="custom-button-logs p-button-link"
              tooltip="N° de extrait"
              tooltipOptions={{ position: 'left' }}
              onClick={() => handleShowDetails(rowData)}
            >
              {extrait.extrait_id}
            </Button>
          </span>
        );
      }
      if (tva !== null) {
        return (
          <span>
            <Button
              className="custom-button-logs p-button-link"
              tooltip="N° de tva"
              tooltipOptions={{ position: 'left' }}
              onClick={() => handleShowDetails(rowData)}
            >
              {tva.tva_id}
              {console.log(tva)}
            </Button>
          </span>
        );
      }
    };
    const headerTemplate = (data) => {
      return (
          <span>
          <img alt={data.nom} src={`showcase/demo/images/product/${data.nom}.jpg`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
          <span style={{ marginLeft: '1em' }}>{data.nom}</span>
          </span>
  
      );
  };

    const onRowGroupExpand = (event) => {
      console.log(event.data)
      toast.current.show({ severity: 'info', summary: 'Groupe agrandi', detail: 'Value: ' + event.data.nom, life: 3000 });
  }

  const onRowGroupCollapse = (event) => {
      toast.current.show({ severity: 'success', summary: 'Groupe réduit', detail: 'Value: ' + event.data.nom, life: 3000 });
  }

  const statusBodyTemplate = (rowData) => {
    if (rowData.facture.estpaye === true) {
      return (
        <span className="p-badge p-badge-success">Payé</span>
      );
    } else {
      return (
        <span className="p-badge p-badge-warning">Non payé</span>
      );
    }
  };


  const num_factureTemplate = (rowData) => {
    const factureLength = rowData.factures.length;
    console.log(factureLength)
    return (
      <DataTable value={rowData.factures} className="p-datatable-sm">
        <Column field="facture.num_facture" header="N° Facture"  />
        <Column field="facture.estpaye" header="Statut de la facture" sortable  body={statusBodyTemplate} />
      </DataTable>
    );
  };

    return (
      <div className="container">
                <Toast ref={toast} />

      <section className="features">
        <h2>Les fonctionnalités</h2>
        <div className="card">
          <h3>Vues</h3>
          <p><ViewAnalyse/></p>
        </div>


      </section>
      <section className="testimonials">
        <h2>Commentaires et historiques</h2>
        <div className="card">
          <CommentZone/>
        </div>
        <div className="card" >
        <DataTable value={logs} paginator rows={5} rowsPerPageOptions={[5,10,20]} emptyMessage="Aucun log pour le moment" style={{height : "90%"}}>
                    {console.log(logs)}
                    <Column field="user.username" header="Utilisateur"  />
                    <Column field="date" header="Date" body={dateBodyTemplate} />
                    <Column field="action" header="Type d'ajout" body={actionBodyTemplate} />
                    <Column field="ajout" header="Contenu de l'ajout" body={ajoutBodyTemplate} />         
                  </DataTable>
                  <Dialog
                    header="Détails de la ligne de tableau sélectionnée"
                    visible={showDetailsLogs}
                    onHide={() => setShowDetailsLogs(false)}
                  >
                    {console.log(selectedLog)}
                    {selectedLog && selectedLog.decompte && (
                      <div>
                        <p><b>N° de décompte : </b>{selectedLog.decompte.num_decompte}</p>
                        <p><b>type : </b>{selectedLog.decompte.type}</p>
                      </div>
                    )}
                   
                    {selectedLog && selectedLog.client && (
                      <div>
                        <p><b>N° de client : </b>{selectedLog.client.client_id}</p>
                        <p><b>Nom : </b>{selectedLog.client.name}</p>
                        <p><b>Prénom : </b>{selectedLog.client.firstname}</p>
                        <p><b>Adresse : </b>{selectedLog.client.adresse_client}</p>
                        <p><b>Téléphone : </b>{selectedLog.client.telephone_client}</p>
                        <p><b>Mail : </b>{selectedLog.client.email_client}</p>
                        <p><b>Description : </b>{selectedLog.client.description}</p>
                      </div>
                    )}
                    {selectedLog && selectedLog.fournisseur && (
                      <div>
                      <p><b>N° de fournisseur : </b>{selectedLog.fournisseur.num_fournisseur}</p>
                      <p><b>Nom : </b>{selectedLog.fournisseur.name}</p>
                      <p><b>Adresse : </b>{selectedLog.fournisseur.adresse_fournisseur}</p>
                      <p><b>Téléphone : </b>{selectedLog.fournisseur.telephone_fournisseur}</p>
                      <p><b>Mail : </b>{selectedLog.fournisseur.email_fournisseur}</p>
                      <p><b>Description : </b>{selectedLog.fournisseur.description}</p>
                    </div>
                    )}
                    {selectedLog && selectedLog.facturier && (
                      <div>
                        <p><b>N° de facturier : </b>{selectedLog.facturier_id}</p>
                        <p><b>N° de facture : </b>{selectedLog.facture.num_facture}</p>
                        <p><b>Date de facturation : </b>{selectedLog.facture.facture_date}</p>
                        <p><b>Montant : </b>{selectedLog.facture.montant}</p>
                      </div>
                    )}
                    {selectedLog && selectedLog.extrait && (
                      <div>
                        <p><b>N° d'extrait : </b>{selectedLog.extrait.num_extrait}</p>
                        <p><b>Montant : </b>{selectedLog.extrait.montant}</p>
                        <p><b>Date : </b>{selectedLog.extrait.date_extrait}</p>
                      </div>
                    )}
                    {selectedLog && selectedLog.tva && (
                      <div>
                        <p><b>Montant de la TVA : </b>{selectedLog.tva.tva_value}%</p>
                        <p><b>Description : </b>{selectedLog.tva.tva_description}</p>
                      </div>
                    )}
                    </Dialog>
        </div>
      </section>
      <section className="blog">
        <h2>Les statistiques</h2>
        <div className="card">
          <h3>Nombres total de factures </h3>
          <p>{billNotPayed.length + billPayed.length}</p>
        </div>
        <div className="card">
          <h3>Les clients et leurs factures </h3>
          <p> <DataTable value={clientListWithFacture} rowGroupMode="subheader" groupRowsBy="nom"
                    sortMode="single" sortField="nom" sortOrder={1} responsiveLayout="scroll"
                    expandableRowGroups expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowGroupExpand} onRowCollapse={onRowGroupCollapse}
                    rowGroupHeaderTemplate={headerTemplate} >
                      {console.log(clientListWithFacture)}
                      <Column field="" header="" ></Column>
                    <Column field="" header="" body={num_factureTemplate}></Column>
              </DataTable>
          </p>
        </div>
      </section>
    </div>

    )
}


                    
    
    

export default Analyse

         
