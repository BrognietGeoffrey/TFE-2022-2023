// Code provenant du TFE de Madame Jaujatte Ikram

import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route {...rest} render={props => {
      const currentUser = localStorage.getItem('role');

      if (!currentUser) {
        // l'utilisateur n'est pas connecté, rediriger vers la page de connexion
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }

      // vérifier si l'utilisateur a le rôle approprié pour accéder à la route
      if (roles && roles.indexOf(currentUser) === -1) {
        // l'utilisateur n'a pas les autorisations nécessaires pour accéder à la route, rediriger vers la page d'accueil

        // si l'utilisateur connecté est un user, il est redirigé vers la page de profil
        if (currentUser === 'user') {

            // Afficher un toast pour annoncer que l'utilisateur n'a pas les droits pour accéder à la page
            return <Redirect to={{ pathname: '/profile', state: { from: props.location } }} />

        }
        return <Redirect to={{ pathname: '/analyse', state: { from: props.location } }} />
        
      }

      // l'utilisateur est connecté et autorisé à accéder à la route
      return <Component {...props} />
  }} />
)

export default PrivateRoute;