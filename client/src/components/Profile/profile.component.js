import React from 'react';
import { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';
import {Dialog } from 'primereact/dialog';
import {Link } from 'react-router-dom';

import Register from "../Register/register.component";

import FactureService from '../../services/factureService';
import jwt_decode from "jwt-decode";
import ClientService from "../../services/clientService";
import CompteClientService from "../../services/compteClientService";


import './profile.css'
const Profile = () => {

  const [factures, setFactures] = React.useState([]);
  const [facturesPaid, setFacturesPaid] = React.useState([]);
  const [facturesNotPaid, setFacturesNotPaid] = React.useState([]);
  const [dataClient, setDataClient] = React.useState([]);
  const [displayDialogRegister, setDisplayDialogRegister] = React.useState(false);
  const [displayDialogDelete, setDisplayDialogDelete] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);



  const openDialogRegister = () => {
    setDisplayDialogRegister(true);
  }

  const openDialogDelete = () => {
    setDisplayDialogDelete(true);
  }

  const openDialogContact = () => {
    // go to contact page
    <Link to="/contact" />
  }


  const facturesData = () => {
    const dataClient = decoded.user_id.client_id;
    if (!dataClient) {
    }
    const response = FactureService.getFacturesByClientId(dataClient, "client")
        .then((response) => {
            setFactures(response.data);
            console.log(response.data, 'response.data');
        })
        .catch((error) => {
            console.log(error);
        });
};

const clientData = () => {
  const dataClient = decoded.user_id.client_id;
  const response = ClientService.getClientById(dataClient)
  .then((response) => {
    setDataClient(response.data);
    console.log(response.data, "client.data");
  })
  .catch((error) => {
    console.log(error);
  });
}
  

useEffect(() => {
  clientData();
}, []);

  useEffect(() => {
    facturesData();
  }, []);

  const handleDelete = () => {
    // Si c'est fait afficher un toast 
    // Si c'est pas fait afficher un toast d'erreur

    ClientService.delete(dataClient.client_id)
    .then((response) => {
      CompteClientService.delete(dataClient.client_id)
      .then((response) => {
        console.log(response.data);
        clientData();
      })
      .catch((error) => {
        console.log(error);
      });
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });



    clientData();
    setDisplayDialogDelete(false);
};


  // Trouver les factures concernant le client connecté, et les séparer en deux tableaux, payées et non payées. Si le client n'a pas de factures, afficher un message
  const token = localStorage.getItem("access_token");
  const decoded = jwt_decode(token);
  console.log(decoded, "decoded");
  // trouver les factures ayant le même id que le client connecté
  const facturesClient = factures.filter((facture) => facture.client_id === decoded.userInfo.user.client_id);
  console.log(facturesClient, "facturesClient");
  // trouver les factures payées
  if (facturesClient.length > 0) {
    const facturesPayees = facturesClient.filter((facture) => facture.facture.estpaye === true);
    console.log(facturesPayees, "facturesPayees");
    // trouver les factures non payées
    const facturesNonPayees = facturesClient.filter((facture) => facture.facture.estpaye === false);
    console.log(facturesNonPayees, "facturesNonPayees");
    setFacturesPaid(facturesPayees);
    setFacturesNotPaid(facturesNonPayees);
    console.log(facturesPaid, "facturesPaid");
    console.log(facturesNotPaid, "facturesNotPaid");
  }

  const getFactureStatus = () => {
    const facturesClient = factures
    console.log(facturesClient, "facturesClient");
    // trouver les factures payées
    if (facturesClient.length > 0) {
      const facturesPayees = facturesClient.filter((facture) => facture.facture.estpaye === true);
      console.log(facturesPayees, "facturesPayees");
      // trouver les factures non payées
      const facturesNonPayees = facturesClient.filter((facture) => facture.facture.estpaye === false);
      console.log(facturesNonPayees, "facturesNonPayees");
      setFacturesPaid(facturesPayees);
      setFacturesNotPaid(facturesNonPayees);
      console.log(facturesPaid, "facturesPaid");
      console.log(facturesNotPaid, "facturesNotPaid");
      // Trouver les factures qui ne sont pas encore payé et dont la date d'échéance n'est pas encore dépassée
      const facturesNonPayeesNonDepassees = facturesNonPayees.filter((facture) => facture.facture.due_date > Date.now());
      console.log(facturesNonPayeesNonDepassees, "facturesNonPayeesNonDepassees");
    }
  };

  useEffect(() => {
    getFactureStatus();
  }, [factures]);





 




return (

<div className="profile" id="profile">
  <div className="p-grid p-justify-center" id="profiletitle">
  <h1 className="p-text-center" style={{marginBottom: '20px', position: 'relative', textAlign: 'center', left: '50%', fontSize: '60px', transform: 'translateX(-50%)'}}>Bienvenue {dataClient.firstname}</h1>
  </div>
<section className="section">
      <div className="container">
      {decoded && decoded.role == "user" ? (

        <div className="row" id="profilecard">
          <div className="col-md-4" style={{height : 'fit-content'}}>
            {/* changer le style si decoder.user est tel ou un tel */}
            <div className="card mb-4" id="card">

          <div className="p-text-center">
            <Avatar
              
              shape="circle"
              size="xlarge"
              className="p-mb-2"
              style={{ width: '100px', height: '100px', position: 'relative', left: '50%', transform: 'translateX(-50%)' }}
            ><i className="pi pi-user" style={{ fontSize: '50px' }}></i></Avatar>
            
            <p className="p-text-muted p-mb-1" style={{ textAlign: 'center' }}>{decoded.role == "user" ? "Propriétaire/locataire" : "Membre du conseil de gérance"}</p>
            <p className="p-text-muted" style={{ textAlign: 'center' }}>Membre depuis 2019</p>
            <div className="p-d-flex p-justify-center p-mb-2" style={{ textAlign: 'center' }}>
              {decoded && decoded.role == "user" ? (
                <span>
              <Button label="Supprimer mes données" onClick={openDialogDelete} className="p-button-danger p-ml-1" style={{ width: '100%', marginBottom: '10px' }} />

              <Link to="/contact">
  <Button label="Contacter un membre du conseil de gérance" className="p-button-success p-ml-1" style={{ width: '100%' }} />
</Link>              </span>
              ) : ( decoded && decoded.role == "admin" ? (
                 <Button label="Ajouter un utilisateur/client" onClick={openDialogRegister} className="p-button-success p-ml-1" style={{ width: '100%', marginBottom: '10px' }} />

              ) : (null
                         ))}
            </div>

            

          </div>
            </div>

          </div>
          <div className="col-md-4">
            <div className="card mb-4" id="card">
            <div className="p-card-body">
            <div className="p-grid">
              <div className="p-col-3">
                <span className="p-text-bold">Nom - Prénom </span>
              </div>
              <div className="p-col-9">
                <span className="p-text-muted"> {dataClient.name}  {dataClient.firstname} </span>
              </div>
            </div>
            <Divider />
            <div className="p-grid">
              <div className="p-col-3">
                <span className="p-text-bold">Email</span>
              </div>
              <div className="p-col-9">
                <span className="p-text-muted">{dataClient.email_client ? dataClient.email_client : "Pas d'email"}</span>
              </div>
            </div>
            <Divider />
            <div className="p-grid">
              <div className="p-col-3">
                <span className="p-text-bold">Téléphone</span>
              </div>
              <div className="p-col-9">
                <span className="p-text-muted">{dataClient.telephone_client ? dataClient.telephone_client : "Pas de téléphone"}</span>
              </div>
            </div>
            
            <Divider />
            <div className="p-grid">
              <div className="p-col-3">
                <span className="p-text-bold">Adresse</span>
              </div>
              <div className="p-col-9">
                <span className="p-text-muted">{dataClient.adresse_client ? dataClient.adresse_client : "Pas d'adresse"}</span>
              </div>
            </div>
          </div>          
            </div>
            
          </div> 
          {/* Afficher le nombre de factures payées */}
          <div className="col-md-4" >
            <div className="card mb-4" style={{ textAlign: 'center', fontWeight : 'bold' }} id="card">
            <div className="p-card-body">
            <div className="p-grid">
              <div className="p-col-3">
                <span className="p-text-bold" style={{display : 'block'}}>Factures payées</span>
                <span className="p-text-muted">{facturesPaid.length}</span>
              </div>
            </div>
            </div>
            </div>
            <div className="card mb-4" style={{ textAlign: 'center', fontWeight : 'bold' }} id="card">
            <div className="p-card-body">
            <div className="p-grid">
              <div className="p-col-3" >
                <span className="p-text-bold" style={{display : 'block', fontWeight : 'bold'}}>Factures <span style={{textDecoration : 'underline'}}>non</span> payées</span>
                <span className="p-text-muted">{facturesNotPaid.length}</span>
              </div>
            </div>
            </div>
            </div>
            <div className="card mb-4" id="topaid" style={{ textAlign: 'center', fontWeight : 'bold'}} id="card">
            <div className="p-card-body">
            <div className="p-grid">
              <div className="p-col-3">
                <span className="p-text-bold" style={{display : 'block'}}>Factures venant à échéance</span>
                <span className="p-text-muted">{facturesPaid.length}</span>
              </div>
            </div>
            </div>
            </div>
            </div>


        </div>

        
      ) : (
        <div className="col-md-4" style={{height : 'fit-content', position : 'relative', left : '50%', transform : 'translateX(-50%)'}}>
        {/* changer le style si decoder.user est tel ou un tel */}
        <div className="card mb-4" id="card">

      <div className="p-text-center">
        <Avatar
          
          shape="circle"
          size="xlarge"
          className="p-mb-2"
          style={{ width: '100px', height: '100px', position: 'relative', left: '50%', transform: 'translateX(-50%)' }}
        ><i className="pi pi-user" style={{ fontSize: '50px' }}></i></Avatar>
        
        <p className="p-text-muted p-mb-1" style={{ textAlign: 'center' }}>{decoded.role == "user" ? "Propriétaire/locataire" : "Membre du conseil de gérance"}</p>
        <p className="p-text-muted" style={{ textAlign: 'center' }}>Membre depuis le {new Date(decoded.userInfo.createdAt).toLocaleDateString()}</p>
        <div className="p-d-flex p-justify-center p-mb-2" style={{ textAlign: 'center' }}>
          {decoded && decoded.role == "user" ? (
            <span>
          <Button label="Supprimer mes données" className="p-button-danger p-ml-1" style={{ width: '100%', marginBottom: '10px' }} />
          <Button label="Contacter un membre du conseil de gérance" className="p-button-success p-ml-1" style={{ width: '100%' }} onClick={openDialogContact} />
          </span>
          ) : ( decoded && decoded.role == "admin" ? (
             <Button label="Ajouter un utilisateur/client" onClick={openDialogRegister} className="p-button-success p-ml-1" style={{ width: '100%', marginBottom: '10px' }} />

          ) : (null
                     ))}
        </div>
        {/* Dialog with the component register */}
        

      </div>
        </div>

      </div>
          
      )}



                         

      </div>
    </section>
    <div className="p-grid" style={{}}>
    <Dialog header="Ajouter un utilisateur/client" visible={displayDialogRegister} onHide={() => setDisplayDialogRegister(false)} maximizable style={{ width: '50vh', height:'70vh', overflow : 'hidden' }}>

  <Register  />

</Dialog>
<Dialog header="Supprimer vos données" visible={displayDialogDelete} onHide={() => setDisplayDialogDelete(false)} maximizable style={{ width: '50vh', overflow : 'hidden' }}>
  <div className="container">
      <div className="confirmation">
        <p>Voulez-vous vraiment supprimer vos informations</p>
        <p>Les informations que nous garderons seront juste votre nom et prénom</p>
        <button onClick={handleDelete}>Confirmer la suppression</button>
        <button onClick={() => setConfirmDelete(false)}>Annuler</button>
      </div>
    
  </div>
</Dialog>

</div>
    
    </div>
    


            

)
}

export default Profile; 

        



   
    

