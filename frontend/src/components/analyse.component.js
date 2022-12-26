// Simple page who show the number of facture payed and not payed

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FactureDataService from '../services/factureService';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
class Analyse extends Component {
    constructor(props) {
        super(props);
        this.state = {
        facturesList: [],
        facturesPayed: [],
        facturesNotPayed: [],
        };
    }
    retrieveFactures() {
        FactureDataService.getFactures()
        .then(response => {
            this.setState({
            facturesList: response.data
            });
            console.log(response.data, "data");
        })
        .catch(e => {
            console.log(e);
        });
    }
    componentDidMount() {
        this.retrieveFactures();
    }
   
    render() {
        const { facturesList } = this.state;
        const facturesPayed = facturesList.filter((facture) => facture.estpaye === true);
        const facturesNotPayed = facturesList.filter((facture) => facture.estpaye === false);
        return (
        <div className="container">
            <div className="row">
            <div className="col-md-12">
                <div className="card">
                <div className="card-header">Analyse</div>
                <div className="card-body">
                    <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                        <div className="card-header">Status des factures</div>
                        <div className="card-body">
                            {/* // Display react chart here */}

                            <Doughnut data={{ 
                                labels: ['Factures payées', 'Factures non payées'],
                                datasets: [{
                                    
                                    data: [facturesPayed.length, facturesNotPayed.length],
                                    backgroundColor: [
                                        // not rgba
                                        '#FF6384',
                                        '#36A2EB',
                                        
                                    ],
                                    borderColor: [
                                        '#FF6384',
                                        '#36A2EB',
                                        
                                    ],
                                    borderWidth: 1
                                }]
                            }} />

                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                    
        
                

            </div>
            </div>
        </div>
        );
    }
    }

export default Analyse;