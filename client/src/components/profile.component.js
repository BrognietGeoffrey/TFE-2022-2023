import React from "react";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import {Button } from 'primereact/button';
import {Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import './profile.css';
import Register from "./register.component";
import ClientService from "../services/clientService";
const Profile = () => {
  const [displayDialogRegister, setDisplayDialogRegister] = React.useState(false);
  const [dataClient, setDataClient] = React.useState([]);
  const token = localStorage.getItem("access_token");
  const decoded = jwt_decode(token);
  console.log(decoded, "decoded");

const nowInSeconds = Math.floor(Date.now() / 1000);
const expInSeconds = decoded.exp;
const remainingTimeInSeconds = expInSeconds - nowInSeconds;
const remainingHours = Math.floor(remainingTimeInSeconds / 3600);
const remainingMinutes = Math.floor((remainingTimeInSeconds % 3600) / 60);


const openDialogRegister = () => {
  setDisplayDialogRegister(true);
}
const goToUserData = () => {
  window.location = "/userData";
}

const clientData = () => {
  const dataClient = decoded.user_id.client_id;
  ClientService.getClientById(dataClient)
  .then((response) => {
    setDataClient(response.data);
    console.log(response.data, "response.data");
  })
  .catch((error) => {
    console.log(error);
  });
}
  

useEffect(() => {
  clientData();
}, [clientData]);


  return (
    <div class="container">
      <div class="background">
        
      </div>
   
{
  decoded.role === "admin" || decoded.role === "moderator" ? (
    <div className="profile">
    
      
      <div className="profile-picture">
      <i className="pi pi-user"  />
      </div>
      <div className="profile-info">
      <h1>BIENVENUE</h1>
      <h2>{decoded.userInfo.user.username}</h2>
      <p>Rôle: {decoded.role}</p>
      <p>Il vous reste {remainingHours} heures et {remainingMinutes} minutes avant l'expiration.</p>
      {decoded.role === "admin" ? (
  // Ajouter des utilisateurs
  <div className="ajoutUser">
 <Button label="Ajouter un utilisateur" onClick={openDialogRegister} style={{ position: 'absolute', top: '10px', right: '10px' }} />

  <Dialog header="Ajouter un utilisateur" visible={displayDialogRegister} onHide={() => setDisplayDialogRegister(false)} maximizable style={{ width: '50vh', height:'100vh' }}>
  <Register  />
</Dialog>
  </div>
) : (
  <div></div>
)

      
      }
      </div>
    </div>
  ) : (
    <div className="profile">

      <div className="profile-picture">
      <i className="pi pi-user"  />
      </div>
      <div className="profile-info">
      <h1>BIENVENUE</h1>
      <h2>{decoded.userInfo.user.username}</h2>
      {decoded.user_id.client_id ? (
        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
        <Button className="btn btn-primary" style={{position: "absolute", top: "10px", left:'10px'}} onClick={goToUserData} tooltip="Vous pourrez voir vos factures, vos demandes, et faire une demande" >  Voir vos données</Button>
        <div className="facture-section">
          <Card title="Informations du compte" style={{ width: '30rem', height: '20rem', backgroundColor: '#f5f5f5'  }} className="section-three">
            <p>Email de connexion: {decoded.user_id.email}</p>
            
          </Card>
          <Card title="Informations du compte client" style={{ width: '30rem', height: '20rem', backgroundColor: '#f5f5f5' }} className="section-three">
            <p style={{textAlign: 'left'}}>Nom et prénom: {dataClient.name} {dataClient.firstname}</p>
            <p style={{textAlign: 'left'}}>Adresse: {dataClient.adresse_client}</p>
            <p style={{textAlign: 'left'}} >Numéro de téléphone: {dataClient.telephone_client}</p>
            <p style={{textAlign: 'left'}}>Email: {dataClient.email_client}</p>
          </Card>
        </div>


        </div>

      ) : (
        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
          <Button style={{position: "absolute", top: "10px", left:'10px'}} disabled>  Vous n'êtes pas associé à un client ou à un habitant</Button>
          <p>Vos informations personnelles</p>
          <p>Adresse: {decoded.user_id.email}</p>
        </div>
      )}
  
      {/* <p>Il vous reste {remainingHours} heures et {remainingMinutes} minutes avant l'expiration.</p> */}
      </div>
    </div>
  )
}
    </div>
  );
};

export default Profile;
