import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';

import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import jwtDecode from 'jwt-decode';
import {TabPanel, TabView} from 'primereact/tabview';
import CommentService from '../../services/commentService';
import FacturierService from '../../services/facturierService';
import './analyse.css'

const Comment = () => {
  const { handleSubmit} = useForm();
  const [facturierIdList, setFacturierIdList] = useState([]);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [factureNum, setFactureNum] = useState('');
  const [facturierId, setFacturierId] = useState('');
  const toast = useRef(null);
  const [checked1, setChecked1] = useState(false);
  const [comments, setComments] = useState([]);

  const token = localStorage.getItem('access_token');
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id.id;

  const getFacturierIdList = () => {
    FacturierService.getAll()
      .then((response) => {
        if (response.data.length === 0) {
          toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Aucun facturier n\'a été trouvé', life: 3000 });
          setFacturierIdList([]);
        } else {
          setFacturierIdList(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const factureList = facturierIdList.length > 0 ? facturierIdList.map((facturier) => {
    return (
      {label : facturier.facture.num_facture, value : facturier.facturier_id, 'data-facturier-id': facturier.id}
    );
  }) : [];
  

    const getComments = () => {
        CommentService.getAll()
            .then((response) => {    
                if (response.length === 0) {
                    toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Aucun commentaire n\'a été trouvé', life: 3000 });
                    setComments([]);
                }
                else {
                  // trier par date de création
                  const sortedComments = response.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt); 
                  });
                  setComments(sortedComments);
                }



            })
            .catch((error) => {

            }
        );
                
    };

  useEffect(() => {
    getFacturierIdList();
    getComments();
  }, []);
  const onReset = () => {
    setMessage('');
    setTitle('');
    setFactureNum('');
    setFacturierId('');
    setChecked1(false);
  };


    const onSubmit = (data) => {
      const comment = {
        comments: message,
        userId: user_id,
        title: title,
        facturier_id: facturierId? facturierId : undefined
      };
   
      CommentService.create(comment)
        .then((response) => {
          getComments();
          onReset();
         
          toast.current.show({ severity: 'success', summary: 'Création réussie', detail: 'Le commentaire a bien été créé', life: 3000 });
        })
        .catch((error) => {
          console.log(error);
        });
    };







  const createdSinceComment = (date) => {
    // Calculer depuis quand le commentaire a été créé. Calculer en minute et convertir en jours dès que le nombre de jours est supérieur à 1
    const createdSince = Math.round((new Date() - new Date(date)) / 60000);
    if (createdSince < 60) {
        return createdSince + ' minutes';
    }

    else if (createdSince < 1440) {
        return Math.round(createdSince / 60) + ' heures';
    } else if (createdSince < 10080) {
        return Math.round(createdSince / 1440) + ' jours';
    }
    return Math.round(createdSince / 10080) + ' semaines';

};


  return (
    <div className="p-grid p-fluid" style={{height: '410px', overflow: 'auto'}}>
      <Toast ref={toast} />
        <TabView>
            <TabPanel header="Ajouter un commentaire">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-fluid">
                <div className="p-field">
                  <label htmlFor="title">Titre</label>
                  <InputText
                    id="title"
                    name="title"
                    type="text"
                    className="p-inputtext p-component p-filled"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="p-field">
                  <label htmlFor="message">Message</label>
                  <InputTextarea
                    id="message"
                    name="message"
                    type="text"
                    className="p-inputtext p-component p-filled"
                    rows="5"
                    cols="30"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="p-field">
                  <div className="p-field-radiobutton">
                    Voulez-vous lier ce commentaire à une facture ?
                    <Checkbox
                      inputId="cb1"
                      value="No"
                      onChange={(e) => setChecked1(e.checked)}
                      checked={checked1}
                      style={{ marginLeft: "1em" }}
                    />
                  </div>
                  {checked1 && (
                    <div className="p-field">
                      <label htmlFor="facture">Facture</label>
                      <Dropdown
                        id="facture"
                        name="facture"
                        value={factureNum}
                        options={factureList}
                        onChange={(e) => {
                          setFactureNum(e.value);
                          setFacturierId(e.value);
                        }}
                        style={{ width: "100%", marginBottom: "1em" }}
                        placeholder="Sélectionner une facture"
                        optionLabel="label"
                        optionValue="value"
                        className="p-inputtext p-component p-filled"
                      />
                    </div>
                  )}
                </div>
                <div className="p-field" style={{ marginTop: "2em" }}>
                  <Button
                    type="submit"
                    label="Envoyer"
                    className="p-button-raised p-button-rounded"
                  />
                </div>
              </div>
            </form>
            </TabPanel>
            <TabPanel header="Liste des commentaires" >
            {comments && comments.length > 0 ? (
  comments.map((comment) => (
    <div className="comment-list" key={comment.id}>
      <div className="comment-item">
        <div className="comment-avatar">
          {/* Put an blue icon if the owner of the comment is connected */}
          {comment.user.id === user_id ? (
            <i className="pi pi-user" style={{ fontSize: "2.3em", backgroundColor: '#a2a8d3', borderRadius: '50%', padding: '0.2em' }}></i>
          ) : (
            <i className="pi pi-user" style={{ fontSize: "2.3em", backgroundColor: '#f2f2f2', borderRadius: '50%', padding: '0.2em' }}></i>
          )}
        </div>
        <div className="comment-content">
          <div className="comment-header">
            <h3 className="comment-title">{comment.title}</h3>
            <p className="comment-meta">
              Par {comment.user.username} - il y a{" "}
              {createdSinceComment(comment.createdAt)}
            </p>
          </div>
          <div className="comment-body">
            <p>{comment.comments}</p>
          </div>
          {comment.facturier_id && (
            <div className="comment-footer">
              <span className="comment-reply">
                Ce commentaire est lié à la facture n°
                {comment.facturier.facture.num_facture}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  ))
) : (
  <p>Aucun commentaire</p>
)}

            </TabPanel>
        </TabView>
    </div>
    );
};

export default Comment;

