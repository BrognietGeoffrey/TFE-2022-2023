import React, { useState, useEffect } from "react";
import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';
import FacturierDataService from "../services/facturierService";
import viewServices from "../services/viewServices";
import axios from 'axios';
import './ViewAnalyse.css';
import ViewAnalyse from "./ViewAnalyse.component";



export 

const Analyse = () => {
  const [facturier, setFacturier] = useState([]);
  const [view, setView] = useState([]);


    useEffect(() => {
      retrieveFacturier();
      retrieveView();
      getDataAnalyse();
    }, []);
    
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

  const getDataAnalyse = async () => {
    // trouver toutes les factures payés et non payées dans facturier
    for (let i = 0; i < facturier.length; i++) {
      if (facturier[i].facture.estpaye === true) {
        console.log(facturier[i].facture.estpaye);
      }
      console.log(facturier[i].facture.estpaye);
    }
  }

  









  return (
    <div class="grid-container">
      <div class="parent">
      <div class="div1">  <ViewAnalyse /></div>
      <div class="div2"> </div>
      <div class="div3">  </div>
      <div class="div4"> </div>
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


