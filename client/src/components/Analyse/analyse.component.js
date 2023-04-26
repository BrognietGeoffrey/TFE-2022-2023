import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';
import axios from 'axios';
import './ViewAnalyse.css';
import React, { useState, useEffect, useRef } from "react";
import FacturierDataService from "../../services/facturierService";
import viewServices from "../../services/viewServices";
import ViewAnalyse from "./ViewAnalyse.component";
import LogsService from "../../services/logsService";
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

  const num_factureTemplate = (rowData) => {
    const factureLength = rowData.factures.length;
    console.log(factureLength)
    return (
      <span>
        <span className="p-column-title">
        {rowData.factures.length > 0 ? rowData.factures.map((facture) => {
          return (
            <span>
              <Button
                className="custom-button-logs "
                tooltip="N° de facture"
                tooltipOptions={{ position: 'left' }}
                onClick={() => handleShowDetails(rowData)}
                // Si le facture est payée alors on affiche le bouton en vert sinon en rouge
                style={{backgroundColor: facture.facture.estpaye === true ? "green" : "red", marginLeft : "5px"}}
              >
                {facture.facture.num_facture} 
                {console.log(facture)}
               </Button>
            </span>
          )
        }) : "Pas de facture"}
        </span>
      </span>
    );
  };

    return (
      <div class="container">
        <Toast ref={toast} />
        <div class="section1">
          <div class="section-three" >
            <ViewAnalyse />
          </div>
          <div class="section-three" style = {{marginLeft : "22px"}}>
          <div class="card">
            <div class="card-title">
              {/* Zone commentaire */}
              <h2 class="title"><i class="fa-solid fa-comment">Commentaires</i></h2>
            </div>
            <div class="card-body">
              Vous trouvez ici tous les Commentaires

            </div>

            <div class="card-content" style={{ overflowY: "scroll"}}>
              <div class="card-content-item">
                <div class="card-content-item-title">
                  {/* afficher chaque utilisateur avec les couleurs associées grâce à userColor, puis afficher les informations de chaque user selon l'user_id de logs.user et userColor.user_id */}
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
          
        </div>

        <div class="section2">
        <div class="section-three" >
            {/* Afficher dans une card toutes les factures non payés et payés */}
            <div class="card" >
              <div class="card-title">
                <h2 class="title"><i class="fa-solid fa-eye">Les habitants et leurs comptes </i></h2>
              </div>
              <div class="card-body">
                Vous retrouvez ici les informations sur les habitants et leurs comptes
              </div>
              <div class="card-content"style={{overflowY: "scroll"}}>
                {/* afficher les données de clientListWithFactures, faire une séparation entre chaque client et indiqué pour chaque client le numéro de facture des factures payés et non payés */}
                <div class="card-content-item">
                  <div class="card-content-item-title">
                    {console.log(clientListWithFacture)}
                    
                    <DataTable value={clientListWithFacture} rowGroupMode="subheader" groupRowsBy="nom"
                    sortMode="single" sortField="nom" sortOrder={1} responsiveLayout="scroll"
                    expandableRowGroups expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowGroupExpand} onRowCollapse={onRowGroupCollapse}
                    rowGroupHeaderTemplate={headerTemplate} >
                      {console.log(clientListWithFacture)}
                      <Column field="" header="Nom" style={{width:'250px'}}></Column>
                    <Column field="factures.facture.num_facture" header="N° de facture" body={num_factureTemplate}></Column>

                  
                </DataTable>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="section-three">
          <div class="card">
            <div class="card-title">
              <h2 class="title"><i class="fa-solid fa-eye">Logs des changements</i></h2>
            </div>
            <div class="card-body">
              Vous trouvez ici les logs des changements effectués sur le bilan actuel
            </div>
            <div class="card-content" style={{ overflowY: "scroll"}}>
              <div class="card-content-item">
                <div class="card-content-item-title">
                  {/* afficher chaque utilisateur avec les couleurs associées grâce à userColor, puis afficher les informations de chaque user selon l'user_id de logs.user et userColor.user_id */}
                  <DataTable value={logs} paginator rows={10} rowsPerPageOptions={[5,10,20]} emptyMessage="Aucun log pour le moment">
                    {console.log(logs)}
                    <Column field="user.username" header="Utilisateur"  />
                    <Column field="date" header="Date" body={dateBodyTemplate} />
                    <Column field="action" header="Type d'ajout" body={actionBodyTemplate} />
                    <Column field="ajout" header="Contenu de l'ajour" body={ajoutBodyTemplate} />         
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
              </div>
            </div>
          </div>
          </div>

          




                
        </div>
      </div>
    );
  }

                  


  export default Analyse;

         
