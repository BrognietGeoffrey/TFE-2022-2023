// show all the factures in a table 

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import FactureDataService from "../services/factureService";
import factureService from "../services/factureService";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

                
export default class FacturesList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveFactures = this.retrieveFactures.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveFacture = this.setActiveFacture.bind(this);
        // this.removeAllFactures = this.removeAllFactures.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeNumFacture = this.onChangeNumFacture.bind(this);
        this.onChangeDateFacture= this.onChangeDateFacture.bind(this);
        this.onChangeMontant = this.onChangeMontant.bind(this);
        this.onChangePaye = this.onChangePaye.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
    
        this.state = {
            
       
        num_facture: "",
        dateFacture : "",
        montant : "",
        estPaye : false,
        description : "",
        currentFacture: null,
        currentIndex: -1,
        searchTitle: ""
        };
    }
    


    // Function to add a new facture

    componentDidMount() {
        this.retrieveFactures();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;
    
        this.setState({
        searchTitle: searchTitle
        });
    }
    
    retrieveFactures() {
        FactureDataService.getFactures()
        .then(response => {
            this.setState({
            factures: response.data
            });
            console.log(response.data, "data");
        })
        .catch(e => {
            console.log(e);
        });
    }
    
    refreshList() {
        this.retrieveFactures();
        this.setState({
        currentFacture: null,
        currentIndex: -1
        });
    }
    
    setActiveFacture(facture, index) {
        this.setState({
        currentFacture: facture,
        currentIndex: index
        });
    }

    


    searchTitle() {
        FactureDataService.findByDescription(this.state.searchTitle)
        .then(response => {
            this.setState({

            factures: response.data
            });
            console.log(this.state.searchTitle);
            console.log(response.data, "search");
        })
        .catch(e => {
            console.log(e);
        });
    }
    onChangeNumFacture(e) {
        this.setState({
          num_facture: e.target.value,
        });
      }
    
      onChangeDateFacture(e) {
        this.setState({
          dateFacture: e.target.value,
        });
      }
    
      onChangeMontant(e) {
        this.setState({
          montant: e.target.value,
        });
      }
      onChangePaye(e) {
        this.setState({
            estPaye: e.target.value,
            });
        }
        onChangeDescription(e) {
            this.setState({
                description: e.target.value,
                });
            }



        handleRegister(e) {
                e.preventDefault();

                this.setState({
                    message: "",
                    successful: false
                });
                

                this.form.validateAll();

                if (this.checkBtn.context._errors.length === 0) {
                    factureService.create(
                        this.state.num_facture,
                        this.state.dateFacture,
                        this.state.montant,
                        this.state.description,
                        this.state.estPaye
                    ).then(
                        response => {
                            this.setState({
                                message: response.data.message,
                                successful: true
                            });
                            
                            // Refresh the list of factures
                            this.retrieveFactures();
                        },
                        error => {
                            const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                                
                            this.setState({
                                successful: false,
                                message: resMessage
                            });
                        }
                    );
                    console.log(this.checkBtn.context._errors.length, "check");
                }
            } 
            // Function for updating the facture status from the table 
            updateFacture = (id, status) => {
                let data = { id, status };
                console.log(data, "dataupdate")
                FactureDataService.update(data)
                    .then((response) => {
                        this.setState((prevState) => ({
                            factures: prevState.factures.map((el) =>
                                el.id === id ? { ...el, status: status } : el
                            ),
                        }));
                    })
                    .catch((e) => {
                        console.log(e);
                    });
                    console.log(id, "id");
            };

           
    
    render() {
        const { searchTitle, factures, currentFacture, currentIndex,num_facture,dateFacture,montant,estPaye,description } = this.state;

        //Console.log state 
        console.log(this.state, "state");
        return (
            
        <div className="list row">

            <div className="col-md-8">
            <div className="input-group mb-3">
                <input
                type="text"
                className="form-control"
                placeholder="Rechercher par titre"
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
                />
                <div className="input-group-append">
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchTitle}
                >
                    Rechercher
                </button>
                </div>
            </div>
            </div>
           
            <div className="col-md-6">
            <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Numéro de facture</th>
                            <th>Date de facture</th>
                            <th>Montant</th>
                            <th>Description</th>
                            <th>Payé</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {factures &&
                            factures.map(
                                facture =>
                                <tr key={facture.id}>
                                    <td>{facture.num_facture}</td>
                                    <td>{facture.facture_date}</td>
                                    <td>{facture.montantfacture}</td>
                                    <td>{facture.description}</td>
                                    <td>{facture.estpaye ? "V" : "X"}</td>
                                    <td>

                                        {/* show all the id from the table */}

                                        <button style={{marginLeft: "10px"}} onClick={ () =>  console.log(facture.id)} className="btn btn-info">Edit </button>
                                        <button style={{marginLeft: "10px"}} onClick={ () => this.deleteFacture(facture.id)} className="btn btn-danger">Delete </button>
                                     
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                       {/* react button to open the modal with id ajoutFacture */}
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ajoutFacture">
                            Ajouter une facture
                        </button>
        
                <div class="modal fade" id="ajoutFacture" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        // Form for adding a new facture
                        <Form
            
                            onSubmit={this.handleRegister}
                            ref={(c) => {
                            this.form = c;
                            }}
                        >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                    <label htmlFor="numFacture">Numéro de facture</label>
                    <Input
                    type="number"
                    className="form-control"
                    name="numFacture"
                    value={this.state.num_facture}
                    onChange={this.onChangeNumFacture}
                    validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateFacture">Date de facture</label>
                    <Input
                    type="date"
                    className="form-control"
                    name="dateFacture"
                    value={this.state.dateFacture}
                    onChange={this.onChangeDateFacture}
                    validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="montant">Montant</label>
                    <Input
                    type="number"
                    className="form-control"
                    name="montant"
                    value={this.state.montant}
                    onChange={this.onChangeMontant}
                    validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Input
                    type="text"
                    className="form-control"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="estPaye">Payé</label>
                    <select className="form-control"
                    name="estpaye"
                    value={this.state.estPaye}  
                    onChange={this.onChangePaye}
                    validations={[required]}>
                {/* option who disabled and selected */}
                <option value="" disabled selected>Choisir un statut</option>
               
                <option value={true} >Oui</option>
                <option value={false}>Non</option>
              

            </select>
                </div>
                
                <div className="form-group">
                    <button className="btn btn-primary btn-block">Ajouter</button>
                </div>
              </div>
            )}

            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Send message</button>
                    </div>
                    </div>
                </div>
                </div>
                {/**Boostrap table fill with all factures */}
                
            </div>
            <div className="col-md-6">
            {currentFacture && (
                <div>
                 <div class="modal fade" id="modal-edit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                 <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                        <Form
            
            onSubmit={this.updateFacture}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                    <label htmlFor="numFacture">Numéro de facture</label>
                    <Input
                    type="number"
                    className="form-control"
                    name="numFacture"
                    value={currentFacture.num_facture}
                    onChange={this.onChangeNumFacture}
                    validations={[required]}
                    disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateFacture">Date de facture</label>
                    <Input
                    type="date"
                    className="form-control"
                    name="dateFacture"
                    value={currentFacture.facture_date}
                    onChange={this.onChangeDateFacture}
                    validations={[required]}
                    disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="montant">Montant</label>
                    <Input
                    type="number"
                    className="form-control"
                    name="montant"
                    value={currentFacture.montantfacture}
                    onChange={this.onChangeMontant}
                    validations={[required]}
                    disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Input
                    type="text"
                    className="form-control"
                    name="description"
                    value={currentFacture.description}
                    onChange={this.onChangeDescription}
                    validations={[required]}
                    disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="estPaye">Payé</label>
                    <select className="form-control"
                    name="estpaye"
                    value={currentFacture.estpaye}  
                    onChange={this.onChangePaye}
                    validations={[required]}>
                {/* option who disabled and selected */}
                <option value="" disabled selected>Choisir un statut</option>
               
                <option value={true} >Oui</option>
                <option value={false}>Non</option>
              

            </select>
                </div>
                
                <div className="form-group">
                    <button className="btn btn-primary btn-block" onClick={this.updateFacture}>Modifier</button>
                </div>
              </div>
            )}

            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Send message</button>
                    </div>
                    </div>
                </div>
                </div>

                 
                </div>
            ) }
            </div>
        </div>
        );
    }
}
