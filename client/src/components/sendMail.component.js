import React, { useState } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import jwt_decode from "jwt-decode";
import './sendMail.css'

const SendEmail = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('recommendation'); // par défaut, le sujet recommandation est sélectionné
  const toast = React.useRef(null);
  const token = localStorage.getItem("access_token");
  const decoded = jwt_decode(token);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const finalSubject = selectedSubject === 'free' ? subject : selectedSubject; // si l'utilisateur a choisi "libre", on prend le sujet personnalisé

    axios.post('/api/send-email', {
      to: 'jeanVives@outlook.be', // remplacer par la variable "to" une fois que vous aurez ajouté cette fonctionnalité
      subject: finalSubject,
      message: message
    }).then((response) => {
      console.log(response);
      toast.current.show({ severity: 'success', summary: 'Email sent successfully', life: 3000 });
    }).catch((error) => {
      console.log(error);
      toast.current.show({ severity: 'error', summary: 'Error sending email', life: 3000 });
    });
  };

  return (
    <div className="send-email">
      <Card >
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

  




                
