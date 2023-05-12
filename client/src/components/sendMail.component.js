import React, { useState } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import jwt_decode from "jwt-decode";
import './sendMail.css'

const SendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('recommendation'); // par défaut, le sujet recommandation est sélectionné
  const toast = React.useRef(null);
  const token = localStorage.getItem("access_token");
  const decoded = jwt_decode(token);
  console.log(decoded);
  const userMail = decoded.user_id.email;

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSelectedSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  // template pour le message du mail (à modifier selon vos besoins)
  const messageTemplate = 
  `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${subject}</title>
    </head>
    <body>
      <h2>Nouveau message de ${userMail}</h2>
      <hr>
      <p>${message}</p>
    </body>
  </html>`;

    

  const handleSubmit = (event) => {
    event.preventDefault();

    const finalSubject = selectedSubject === 'free' ? subject : selectedSubject; // si l'utilisateur a choisi "libre", on prend le sujet personnalisé
    setLoading(true);
    toast.current.show({ severity: 'info', summary: 'Envoi du mail', detail: 'Votre mail est en cours d\'envoi', life: loading ? 100000 : 3000 });
    axios.post('/api/send-email', {
      to: 'jeanVives@outlook.be', // remplacer par la variable "to" une fois que vous aurez ajouté cette fonctionnalité
      subject: finalSubject,
      message: messageTemplate,
    }).then((response) => {
      setLoading(false);
      console.log(response);
      setSubject("")
      setSelectedSubject("recommendation")
      setMessage("")
      toast.current.show({ severity: 'success', summary: 'Envoi du mail', detail: 'Votre mail a bien été envoyé', life: 3000 });
    }).catch((error) => {
      console.log(error);
      toast.current.show({ severity: 'error', summary: 'Envoi du mail', detail: 'Votre mail n\'a pas pu être envoyé', life: 3000 });
      setLoading(false);
    });
  };
    
      

  return (
    <div className="send-email" style={{display : "flex", flexDirection : "column", alignItems : "center", justifyContent : "center", marginTop : "50px"}}>

         <div className="card opening-hours" style={{width : "50%", height : "100%", padding : "20px", boxShadow : "1px 1px 1px 1px #888888", marginLeft : "20px"}}>
        <h2>Horaires de permanence :</h2>
        <ul className="list-unstyled">
          {/* Président */}
          <li style={{fontWeight : "bold"}}>Président : Monsieur Rappaille</li>
            <li>Dimanche : Fermé</li>
            <li>Vendredi :15h - 17h</li>
            Pour toute demande urgente, tous les jours jusqu'à 18h
          {/* Vice-Président */}
          <hr></hr>
          <li style={{fontWeight : "bold"}}>Membres du conseil de gérance : Madame Coenen/Monsieur Brogniet</li>
            <li>Dimanche : Fermé</li>
            Tous les jours jusqu'à 18h pour toute demande ne nécessitant pas Monsieur Rappaille
        </ul>
    </div>
    <Card style={{width : "50%", height : "100%", padding : "20px", boxShadow : "1px 1px 1px 1px #888888", marginLeft : "20px"}}>
              <h1>Contactez-nous ! <i className="fas fa-envelope"></i></h1>

        <Toast ref={toast} />
        <form onSubmit={handleSubmit}>
           <Toast ref={toast} />
            <div className="form-group">
                <label htmlFor="subjet">Sujet du mail : </label>
                <select className="form-control" id="subject" value={selectedSubject} onChange={handleSelectedSubjectChange}>
                    <option value="recommendation">Recommandation</option>
                    <option value="free">Libre</option>
                </select>
                <br></br>
                {selectedSubject === 'free' && <input type="text" className="form-control" id="subject" placeholder="Sujet" value={subject} onChange={handleSubjectChange} />}
            </div>
            <div className="form-group">
                <label htmlFor="message">Message :  </label>
                <textarea className="form-control" id="message" rows="3" value={message} onChange={handleMessageChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Envoyer</button>
        </form>  
         </Card>

    </div>
 
  );
};

export default SendEmail;

  




                
