import React, { useState, useEffect } from "react";
import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';
import FactureDataService from "../services/factureService";
import axios from 'axios';
import './analyse.css';
import ViewAnalyse from './ViewAnalyse.component';
const Analyse = () => {
  const [facture, setFacture] = useState([]);
  const [facturePayed, setFacturePayed] = useState(0);
  const [factureNotPayed, setFactureNotPayed] = useState(0);
    const [montantPaye, setMontantPaye] = useState(0);
    const [montantRestant, setMontantRestant] = useState(0);

  const retrieveFacture = async () => {
    try {
      const response = await FactureDataService.getFactures();
      setFacture(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getInfosFacture = () => {
    let facturePayedCount = 0;
    let factureNotPayedCount = 0;
    let montantPaye = 0;
    let montantRestant = 0;
    console.log(facture);
    // trouver toutes les factures payées et non payées et les compter pour les afficher dans le dashboard. Calculer le montant payé et le montant restant à payer
    facture.forEach((facture) => {
        if (facture.estpaye === true) {
            facturePayedCount++;
            montantPaye += facture.montant;
        } else {
            factureNotPayedCount++;
            montantRestant += facture.montant;
        }
    });
    setFacturePayed(facturePayedCount);
    setFactureNotPayed(factureNotPayedCount);
    setMontantPaye(montantPaye);
    setMontantRestant(montantRestant);
    };


  useEffect(() => {
    retrieveFacture();
  }, []);

  useEffect(() => {
    getInfosFacture();
  }, [facture]);


  return (
    <div>

        <h3 class="title-section">Informations de base </h3>
        <div class="section-informations">
            <div class="section-three">
                <Card style={{ width: '18rem' }}>
                    <div>
                        <h1>Factures payées</h1>
                        <h2>{facturePayed}</h2>
                        <h3 style={{color : 'green'}}>{montantPaye}</h3>


                    </div>
                </Card>

                <Card style={{ width: '18rem' }} >
                    <div>
                        <h1>Factures non payées</h1>
                        <h2>{factureNotPayed}</h2>
                        <h3 style={{ color: 'red' }}>{montantRestant}</h3>
                    </div>
                </Card>
            </div>
        </div>
        <h3 class="title-section">Informations qui vont changer </h3>
        <ViewAnalyse/>
  
    </div>
    );
};

export default Analyse;


