import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

class Profile extends Component {

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      
      <div className="container">
        
        {/* Boostrap Card with the user profile */}
        <div className="card card-container">
          <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
          <p id="profile-name" className="profile-name-card">Profil de {currentUser.username}</p>
          <p id="profile-name" className="profile-name-card">Adresse email : {currentUser.email}</p>
          <p id="profile-name" className="profile-name-card">Votre rôle : {currentUser.roles}</p>
          <p id="profile-name" className="profile-name-card">Votre ID : {currentUser.id}</p>
        
          <p id="profile-name" className="profile-name-card">Votre token : {currentUser.accessToken}</p>
        
          {
            currentUser.roles.includes("admin") ? (
            <a href="/register" className="btn btn-primary btn-block">Ajouter un utilisateur</a>
            ) : (
              <div></div>
            )
          }
          
          
        </div>
      
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);