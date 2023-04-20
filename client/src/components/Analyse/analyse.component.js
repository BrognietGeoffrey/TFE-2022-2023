import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';
import axios from 'axios';
import './ViewAnalyse.css';
import React, { useState, useEffect } from "react";
import FacturierDataService from "../../services/facturierService";
import viewServices from "../../services/viewServices";
import ViewAnalyse from "./ViewAnalyse.component";
import LogsService from "../../services/logsService";
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';




export const Analyse = () => {
    const [facturier, setFacturier] = useState([]);
    const [view, setView] = useState([]);
    const [billPayed, setBillPayed] = useState([]);
    const [billNotPayed, setBillNotPayed] = useState([]);
    const [clientListWithFacture, setClientListWithFacture] = useState([]);
    const [selectedFacture, setSelectedFacture] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [logs, setLogs] = useState([]);
    const [selectedLog, setSelectedLog] = useState(null);
    const [userColors, setUserColors] = useState([]);

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
          facturesPayees: factures.filter((bill) => bill.facture.estpaye === true),
          facturesNonPayees: factures.filter((bill) => bill.facture.estpaye === false)

        }
      });
      console.log(clientListWithFactures);
      setClientListWithFacture(clientListWithFactures);
    };

    useEffect(() => {
      getDataAnalyse();
    }, [facturier]);

    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

const retrieveLogs = async () => {
  try {
    const response = await LogsService.getAll();
    setLogs(response.data);
    console.log(response.data);
    // attribuer une couleur à chaque utilisateur de logs. Si un user_id est déjà présent dans la liste, lui attribuer la même couleur
    const userColors = [];
    response.data.forEach((log) => {
      if (userColors.find((user) => user.user_id === log.user_id) === undefined) {
        userColors.push({
          user_id: log.user_id,
          color: getRandomColor(),
          username : log.user.username
        });
      }
    });

    setUserColors(userColors);
  } catch (error) {
    console.log(error);
  }
};
    useEffect(() => {
      retrieveLogs();
    }, []);

    return (
      <div class="container">
        <div class="parent">
          <div class="div1">  <ViewAnalyse /></div>
          <div class="div2">
          </div>
          <div class="div3">
            {/* Afficher dans une card toutes les factures non payés et payés */}
            <div class="card">
              <div class="card-title">
                <h2 class="title"><i class="fa-solid fa-eye">Les habitants et leurs comptes </i></h2>
              </div>
              <div class="card-body">
                Vous retrouvez ici les informations sur les habitants et leurs comptes
              </div>
              <div class="card-content"style={{overflowY: "scroll", height: "500px"}}>
                {/* afficher les données de clientListWithFactures, faire une séparation entre chaque client et indiqué pour chaque client le numéro de facture des factures payés et non payés */}
                <div class="card-content-item">
                  <div class="card-content-item-title">
                    
                    {/* pour chaque client, afficher son nom et prénom, et en dessous afficher les factures payées et non payées */}
                    {clientListWithFacture.map((client) => {
                      return (
                        <div>
                          <h3>{client.nom}</h3>
                          <h4> {client.facturesPayees.length > 1 ? "Factures payées" : "Facture payée"}</h4>
                          {client.facturesPayees.map((bill) => {
                            return (
                              <p>{bill.facture.facture_id}</p>
                            )
                          })}
                          <h4> {client.facturesNonPayees.length > 1 ? "Factures non payées" : "Facture non payée"}</h4>
                          {client.facturesNonPayees.map((bill) => {
                            return (
                              <p>{bill.facture.facture_id}</p>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="div4">
          <div class="card">
              <div class="card-title">
                <h2 class="title"><i class="fa-solid fa-eye"> Statistiques sur les factures </i></h2>
              </div>
              <div class="card-body">
                Vous trouvez ici des statistiques sur toutes les factures du bilan actuel
              </div>
              <div class="card-content" style={{overflowY: "scroll", height: "500px"}}>
                <div class="card-content-item">
                  <div class="card-content-item-title">
                  <h3 style={{color: "green", fontWeight: "bold", shade: "0.5"}} >Factures payées ({billPayed.length}) </h3>
                  {billPayed.map((bill) => (
                    <div key={bill.facture.num_facture}>
                      <p>N° de facture : {bill.facture.num_facture}
                        {showDetails && selectedFacture === bill.facture.facture_id ? 
                        <Button onClick={() => {setShowDetails(false); setSelectedFacture(null)}}  className="custom-button p-button-link" tooltip='Cacher les détails de cette facture' style={{height: "0.2em",width: "0.2em;"}}><i class="fa-solid fa-eye-slash" style={{color: "red", marginLeft:"2px"}}></i></Button>
                        : <Button onClick={() => {setShowDetails(true); setSelectedFacture(bill.facture.facture_id)}} className="custom-button p-button-link" tooltip='Montrer les détails de cette facture' style={{height: "0.2em",width: "0.2em;"}}> <i class="fa-solid fa-eye" style={{color: "green", marginLeft:"2px"}}></i></Button>
                        }
                      </p>
                      {showDetails && selectedFacture === bill.facture.facture_id && (
                        <div class="divBill">
                          <p class="infoBill"><i class="fa-solid fa-calendar-day"></i> Date de facturation : {bill.facture.facture_date}</p>
                          <p class="infoBill"><i class="fa-solid fa-file-invoice"></i> Montant : {bill.facture.montant} €</p>
                        </div>
                      )}
                    </div>
                  ))}
                  <h3 style={{color: "red", fontWeight: "bold", shade: "0.5"}}>Factures non payées ({billNotPayed.length})</h3>
                  {billNotPayed.map((bill) => (
                    <div key={bill.facture.num_facture}>
                      <p>N° de facture : {bill.facture.num_facture}
                        {showDetails && selectedFacture === bill.facture.facture_id ? 
                        <Button onClick={() => {setShowDetails(false); setSelectedFacture(null)}}  className="custom-button p-button-link" tooltip='Cacher les détails de cette facture' style={{height: "0.2em",width: "0.2em;"}}><i class="fa-solid fa-eye-slash" style={{color: "red", marginLeft:"2px"}}></i></Button>
                        : <Button onClick={() => {setShowDetails(true); setSelectedFacture(bill.facture.facture_id)}} className="custom-button p-button-link" tooltip='Montrer les détails de cette facture' style={{height: "0.2em",width: "0.2em;"}}> <i class="fa-solid fa-eye" style={{color: "green", marginLeft:"2px"}}></i></Button>
                        }
                      </p>
                      {showDetails && selectedFacture === bill.facture.facture_id && (
                        <div class="divBill">
                          <p class="infoBill"><i class="fa-solid fa-calendar-day"></i> Date de facturation : {bill.facture.facture_date}</p>
                          <p class="infoBill"><i class="fa-solid fa-file-invoice"></i> Montant : {bill.facture.montant} €</p>
                        </div>
                      )}
                    </div>
                  ))}
                    
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="div5">
          <div class="card">
            <div class="card-title">
              <h2 class="title"><i class="fa-solid fa-eye">Logs des changements</i></h2>
            </div>
            <div class="card-body">
              Vous trouvez ici les logs des changements effectués sur le bilan actuel
            </div>
            <div class="card-content" style={{overflowY: "scroll", height: "500px"}}>
              <div class="card-content-item">
                <div class="card-content-item-title">
                  {/* afficher chaque utilisateur avec les couleurs associées grâce à userColor, puis afficher les informations de chaque user selon l'user_id de logs.user et userColor.user_id */}
                  {userColors.map((user) => (
                    <div key={user.user_id}>
                      <h3 style={{color: user.color, fontWeight: "bold", shade: "0.5"}}>{user.username}</h3>
                      {logs.map((log) => (
                        <div key={log.log_id}>
                          {log.user_id === user.user_id && (
                            <div>
                            <p>
                                      {new Date(log.createdAt).toLocaleString("fr-FR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",                                      
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                      })} : 
                                      {/* petite ligne qui permet de faire une belle séparation */}
                                      <hr style={{width: "100%", color: "black", height: "3px", backgroundColor: "black"}}></hr>
                                      {/* Pour les libelles, afficher la description suivi des données des libelles */}
                                      <p>{log.libelle !== null && (
                                        <span> <span style={{fontWeight: "bold"}}>{log.description}</span> : 
                                        <br></br>{log.libelle.title}
                                        </span>
                                      )}</p>
                                      <p>{log.objet !== null && (
                                        <span> <span style={{fontWeight: "bold"}}>{log.description}</span> : 
                                        <br></br>{log.objet.title}
                                        </span>
                                      )}</p>
                                      <p>{log.facturier !== null && (
                                        <span> <span style={{fontWeight: "bold"}}>{log.description}</span> :
                                        <br></br>Facturier N°{log.facturier.facturier_id} - Facture N° {log.facturier.facture_id}
                                        </span>
                                      )}</p>
                                      <p>{log.decompte !== null && (
                                        <span> <span style={{fontWeight: "bold"}}>{log.description}</span> :
                                        <br></br>N° de décompte : {log.decompte.num_decompte}  
                                        <br></br>Type : {log.decompte.type}
                                        </span>
                                      )}</p>
                                      <p>{log.client !== null && (
                                        <span> <span style={{fontWeight: "bold"}}>{log.description}</span> :
                                        <br></br>Nom et prénom : {log.client.name} {log.client.firstname}
                                        <br></br>Email : {log.client.email_client}
                                      
                                        </span>
                                      )}</p>
                                      <p>{log.fournisseur !== null && (
                                        <span> <span style={{fontWeight: "bold"}}>{log.description}</span> :
                                        <br></br>Nom du fournisseur : {log.fournisseur.name} 
                                        <br></br>Email : {log.fournisseur.email_fournisseur}
                                        <br></br>N° du fournisseur : {log.fournisseur.num_fournisseur}

                                        </span>
                                      )}</p>
                                    </p>                           
                                    </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
          {/* <div class="div6">
            <div class="card">
              <div class="card-title">
                <h2 class="title"><i class="fa-solid fa-eye"> Mails des mauvais payeur</i></h2>
              </div>
              <div class="card-body">
                Tous les mails qui seront envoyés au mauvais payeur seront affichés ici (le retard de plus de 2 mois)
              </div>
              <div class="card-content">
              </div>
            </div>    
          </div>             */}
                
        </div>
      </div>
    );
  }

                  


  export default Analyse;

         
