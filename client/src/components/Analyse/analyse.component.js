import './analyse.css';
import React, { useState, useEffect, useRef } from "react";
import FacturierDataService from "../../services/facturierService";
import viewServices from "../../services/viewServices";
import ViewAnalyse from "./ViewAnalyse.component";
import LogsService from "../../services/logsService";

import CommentZone from './comment.component';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import {Chart } from 'primereact/chart';
import axios from "axios";


export const Analyse = () => {
    const [facturier, setFacturier] = useState([]);
    const [view, setView] = useState([]);
    const [billPayed, setBillPayed] = useState([]);
    const [billNotPayed, setBillNotPayed] = useState([]);
    const [clientListWithFacture, setClientListWithFacture] = useState([]);
    const [showDetailsLogs, setShowDetailsLogs] = useState(false);
    const [logs, setLogs] = useState([]);
    const [selectedLog, setSelectedLog] = useState(null);
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
      console.log(billPayed);
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
      // modifier cette liste pour qu'il n'y ait pas de doublons
      const clientListWithFactureWithoutDuplicates = clientListWithFacture.filter((client, index, self) =>
        index === self.findIndex((t) => (
          t.id === client.id
        ))
      );
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
              onClick={ rowData.facture !== null ? () => handleShowDetails(rowData) : "null"}
            >
              {rowData.facture !== null ? rowData.facture.num_facture : "Pas de n° trouvé"}
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
              {console.log(rowData.client)}
              {rowData.client.firstname + " " + rowData.client.name}
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
              {rowData.fournisseur.num_fournisseur}
            </Button>
          </span>
        );
      }

      if (libelle !== null) {
        return (
          <span>
            <Button
              className="custom-button-logs p-button-link"
              tooltip="Libellé de facture "
              tooltipOptions={{ position: 'left' }}
              onClick={() => handleShowDetails(rowData)}
            >

              {rowData.libelle.title}
            </Button>
          </span>
        );
      }
      if (objet !== null) {
        return (
          <span>
            <Button
              className="custom-button-logs p-button-link"
              tooltip="Objet de facture"
              tooltipOptions={{ position: 'left' }}
              onClick={() => handleShowDetails(rowData)}
            >
              {rowData.objet.title}
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
              {rowData.extrait.num_extrait}
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
              {rowData.tva.tva_value}
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

  const getUserModifiedInfo = (id)  => {
    axios.get(`/api/users/${id}`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
  }




  const num_factureTemplate = (rowData) => {
    const factureLength = rowData.factures.length;
    return (
      <DataTable value={rowData.factures} className="p-datatable-sm">
        <Column field="facture.num_facture" header="N° Facture"  />
        <Column field="facture.estpaye" header="Statut de la facture" sortable  body={statusBodyTemplate} />
      </DataTable>
    );
  };

    return (
      <div className="container" id="analyse">
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
                    <Column field="user.username" header="Utilisateur"  />
                    <Column field="date" header="Date" body={dateBodyTemplate} />
                    <Column field="action" header="Actions" body={actionBodyTemplate} />
                    <Column field="ajout" header="Où" body={ajoutBodyTemplate} />         
                  </DataTable>
                  <Dialog
                     header="Détails"

                    visible={showDetailsLogs}
                    onHide={() => setShowDetailsLogs(false)}
                    style = {{width : "30vw", position : "absolute", textAlign : "center"}}
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
                        <p><b>N° de facture : </b>{selectedLog.facture.num_facture ? selectedLog.facture.num_facture : "N/A"}</p>
                        <p><b>Date de facturation : </b>{selectedLog.facture.facture_date ? selectedLog.facture.facture_date.substring(0,10) : "N/A"}</p>
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
                    {selectedLog && selectedLog.libelle && (
                      <div>
                        <p><b>Titre du libellé : </b>{selectedLog.libelle.title}</p>
                        <p><b>Modifié le : </b>{selectedLog.libelle.updatedAt.toString().substring(0,10)}</p>
                      </div>
                    )}
                    {selectedLog && selectedLog.objet && (
                      <div>
                        <p><b>Titre du libellé : </b>{selectedLog.objet.title}</p>
                        <p><b>Modifié le : </b>{selectedLog.objet.updatedAt.toString().substring(0,10)}</p>
                      </div>
                    )}
                    {selectedLog && selectedLog.userModifiedId && (
                      <div>
                        <p><b>Utilisateur : </b>{getUserModifiedInfo(selectedLog.userModifiedId)}</p>
                      </div>
                    )}



                    </Dialog>
        </div>
      </section>
      <section className="blog">
        <h2>Les statistiques</h2>
        <div className="card">
          {/* Nombre total de facture et en dessous, nombre qui indique combien de nouvelle facture cette semaine-ci */}
          <h3>Factures payées</h3>
          {billNotPayed && billNotPayed.length > 0 && (
            <div>
              <p>Nombre de factures payées : {billPayed.length}</p>
              <p>Montant total des factures non payées : {billPayed.reduce((acc, curr) => acc + curr.facture.montant, 0)} €</p>
            </div>
          )}


        </div>
        <div className="card">
          {/* Nombre total de facture et en dessous, nombre qui indique combien de nouvelle facture cette semaine-ci */}
          <h3>Factures payées</h3>
          {billNotPayed && billNotPayed.length > 0 && (
            <div>
              <p>Nombre de factures non payées : {billNotPayed.length}</p>
              <p>Montant total des factures non payées : {billNotPayed.reduce((acc, curr) => acc + curr.facture.montant, 0)} €</p>
            </div>
          )}


        </div>
        <div className="card">
          <h3>Les clients et leurs factures </h3>
          <p> <DataTable value={clientListWithFacture} rowGroupMode="subheader" groupRowsBy="nom"
                    sortMode="single" sortField="nom" sortOrder={1} responsiveLayout="scroll"
                    expandableRowGroups expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowGroupExpand} onRowCollapse={onRowGroupCollapse}
                    rowGroupHeaderTemplate={headerTemplate} style={{maxHeight: '523px', overflow: 'auto'}}>
                      <Column ></Column>
                    <Column body={num_factureTemplate}></Column>
              </DataTable>
          </p>
        </div>
      </section>
      <section className="blog">
        <h2>Les statistiques</h2>
        <div className="card">

        </div>
        <div className="card">
        </div>

      </section>
      <section className="blog">
        <h2>Les statistiques</h2>
        <div className="card">

        </div>
        <div className="card">
 
        </div>
      </section>

    </div>

    )
}


                    
    
    

export default Analyse

         
