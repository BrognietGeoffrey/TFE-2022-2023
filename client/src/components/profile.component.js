import React from "react";
import jwt_decode from "jwt-decode";
import './profile.css';
const Profile = () => {
  const token = localStorage.getItem("access_token");
  const decoded = jwt_decode(token);
  console.log(decoded, "decoded");

// Date actuelle exprimée en secondes
const nowInSeconds = Math.floor(Date.now() / 1000);

// IAT et EXP reçus
const iatInSeconds = decoded.iat;
const expInSeconds = decoded.exp;

// Temps restant en secondes
const remainingTimeInSeconds = expInSeconds - nowInSeconds;

// Conversion du temps restant en heures et minutes
const remainingHours = Math.floor(remainingTimeInSeconds / 3600);
const remainingMinutes = Math.floor((remainingTimeInSeconds % 3600) / 60);

// Affichage du temps restant en heures et minutes
console.log(`Il vous reste ${remainingHours} heures et ${remainingMinutes} minutes avant l'expiration.`);




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
      <h1>{decoded.userInfo.user.username}</h1>
      <p>Rôle: {decoded.role}</p>
      <p>Il vous reste {remainingHours} heures et {remainingMinutes} minutes avant l'expiration.</p>

      </div>
      </div> 
  ) : (
    <div className="profile">
      <div className="profile-picture">
      <i className="pi pi-user"  />
      </div>
      <div className="profile-info">
      <h1>{decoded.userInfo.user.username}</h1>
      

      </div>
      </div> 
  )
}
    </div>
  );
};

export default Profile;
