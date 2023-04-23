import React, { useState, useEffect } from "react";
import FacturierDataService from "../../services/facturierService";
import viewServices from "../../services/viewServices";
import ViewAnalyse from "./ViewAnalyse.component";




export

  const Analyse = () => {
    const [facturier, setFacturier] = useState([]);
    const [view, setView] = useState([]);
    const [billPayed, setBillPayed] = useState([]);
    const [billNotPayed, setBillNotPayed] = useState([]);
    const [clientListWithFacture, setClientListWithFacture] = useState([]);


    useEffect(() => {
      retrieveFacturier();
      retrieveView();
    }, []);

    const retrieveFacturier = async () => {
      try {
        const response = await FacturierDataService.getAll();
        setFacturier(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    const retrieveView = async () => {
      try {
        const response = await viewServices.getAllView();
        setView(response);
      } catch (error) {
        console.log(error);
      }
    };




    return (
      <div class="container" >
        <div class="parent">
          <div class="div1">  <ViewAnalyse /></div>
          <div class="div2">
            <div class="card">
              <div class="card-title">
                <h2 class="title"><i class="fa-solid fa-eye">Statistiques sur les factures </i></h2>
              </div>
              <div class="card-body">
                Vous trouvez ici des statistiques sur toutes les factures du bilan actuel
              </div>
              <div class="card-content">
                <div class="card-content-item">
                  <div class="card-content-item-title">
                    <h3>Factures payées</h3>
                    {/* Afficher le nombre de factures payées */}
                    <p>{billPayed}</p>
                    <h3>Factures non payées</h3>
                    {/* Afficher le nombre de factures non payées */}
                    <p>{billNotPayed}</p>
                  </div>
                </div>
              </div>

            </div>
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
              <div class="card-content">
                {/* afficher les données de clientListWithFactures, faire une séparation entre chaque client et indiqué pour chaque client le numéro de facture des factures payés et non payés */}
                <div class="card-content-item">
                  <div class="card-content-item-title">
                    <h3>Client</h3>
                    {/* pour chaque client, afficher son nom et prénom */}
                    {clientListWithFacture.map((client) => (
                      console.log(client),
                      <p>{client.client.name} {client.client.firstname}</p>,
                      <div class="card-content-item-title">
                        <h3>Factures payées</h3>
                        {/* Afficher le nombre de factures payées */}
                        {client.facturesPayed ? client.facturesPayed.map((bill) => (
                          console.log(bill),
                          <p>{bill.facturesPayed.num_facture}</p>
                        )) : console.log("pas de factures payées"

                        )}
                        <h3>Factures non payées</h3>
                        {/* Afficher le nombre de factures non payées */}
                        {client.facturesNotPayed ? client.facturesNotPayed.map((bill) => (
                          <p>{bill.facturesNotPayed.num_facture}</p>
                        )) : console.log("pas de factures non payées"

                        )}
                      </div>
                    ))}

                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="div4">
            {/* div card  */}
            <div class="card">
              test
            </div>
          </div>
          <div class="div5"> </div>
          <div class="div6"> </div>
          <div class="div7"> </div>
          <div class="div8"> </div>
          <div class="div9"> </div>
          <div class="div10"> </div>
        </div>



      </div>

    );
  };
export default Analyse;
