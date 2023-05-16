import React from 'react';
import Logo from '../images/logojv.png';
const redirectPage = () => {
  console.log('redirectPage');
  return (
    // logo and title


    <div className="redirect-page" style={{textAlign: 'center', marginTop: '20px'}}>
      <img src={Logo} alt="logo" style={{width: '300px', height: '300px'}} />
      <h1>Vous n'êtes pas autorisé à voir cette page</h1>
      <p>Si vous pensez qu'il s'agit d'une erreur, veuillez contactez un membre du conseil de gérance ou l'administrateur du site via ce lien</p>
      <p><a href="mailto:jeanvives10@hotmail.com">Contactez-nous</a></p>

      <p>Si il ne s'agit pas d'une erreur, veuillez retourner sur la page de garde en cliquant sur ce lien</p>
      <p><a href="/login">Retourner sur la page de connexion</a></p>
   
    </div>
  );
}

export default redirectPage;


