import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ToggleButton } from 'primereact/togglebutton';
import { Dropdown } from 'primereact/dropdown';
import compteClientDataService from "../../services/compteClientService";
import auhtService from "../../services/authService";
import ClientDataService from '../../services/clientService';
import logo from '../../images/logojv.png';
import './register.css';

function Register() {
  const toast = useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [telephone, setTelephone] = useState('');
  const [address, setAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [client, setClient] = useState(false);
  const [numCompteClient, setNumCompteClient] = useState('');
  const [num_compte_banque, setNum_compte_banque] = useState('');
  const [descriptionClient, setDescriptionClient] = useState('');
  const [infosClients, setInfosClients] = useState([]);
  const [infosCompteClients, setInfosCompteClients] = useState([]);
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');
  const roles = [
    { label: 'Administrateur', value: 'admin' },
    { label: 'Comptable/Moderateur', value: 'moderator' }, 
    { label: 'Utilisateur/habitant', value: 'user' }
  ];
  const registerUser = (event) => {
    event.preventDefault();
    if (client === true) {

    event.preventDefault();
    setErrorMsg('');
     // Create client
     const data = {
      name: lastname,
      firstname: firstname,
      adresse_client: address,
      telephone_client: telephone,
      email_client: email
    };
    ClientDataService.create(data)
      .then(response => {
        console.log(response.data);
        setInfosClients(response.data);
        toast.current.show({ severity: 'success', summary: 'Création réussie', detail: 'Le client a parfaitement été créé', life: 3000 });
        setLastname('');
        setFirstname('');
        setAddress('');
        setTelephone('');
        setEmail('');

        // create compte client
        const dataCompteClient = {
          numCompteClient: numCompteClient,
          num_compte_banque: num_compte_banque,
          descriptionClient: descriptionClient,
          client_id: response.data.client_id
        };
        const dataUser = {
          username: username,
          password: password,
          email: email,
          role: role,
          client_id: response.data.client_id
        };
        compteClientDataService.create(dataCompteClient)
          .then(response => {
            console.log(response.data);
            setInfosCompteClients(response.data);
            toast.current.show({ severity: 'success', summary: 'Création réussie', detail: 'Le compte client a parfaitement été créé', life: 3000 });
            setNumCompteClient('');
            setNum_compte_banque('');
            setDescriptionClient('');
            // create user
            auhtService.register(dataUser)
              .then(response => {
                console.log(response.data);
                setUserId(response.data.user_id);
                toast.current.show({ severity: 'success', summary: 'Création réussie', detail: 'L\'utilisateur a parfaitement été créé', life: 3000 });
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                setEmail('');
                setRole('');
                
              }
              )
              .catch(e => {
                console.log(e);
                toast.current.show({ severity: 'error', summary: 'Création échouée', detail: e.response.data.message, life: 3000 });
              });
          }
          )
          .catch(e => {
            console.log(e);
            toast.current.show({ severity: 'error', summary: 'Création échouée', detail: e.response.data.message, life: 3000 });
          });
      }
      )
      .catch(e => {
        console.log(e);
        toast.current.show({ severity: 'error', summary: 'Création échouée', detail: e.response.data.message, life: 3000 });
      });
    } else {
      const dataUser = {
        username: username,
        password: password,
        email: email,
        role: role,
      };
      auhtService.register(dataUser)
        .then(response => {
          console.log(response.data);
          setUserId(response.data.user_id);
          toast.current.show({ severity: 'success', summary: 'Création réussie', detail: 'L\'utilisateur a parfaitement été créé', life: 3000 });
          setUsername('');
          setPassword('');
          setConfirmPassword('');
          setEmail('');
          setRole('');
          
        }
        )
        .catch(e => {
          console.log(e);
          toast.current.show({ severity: 'error', summary: 'Création échouée', detail: e.response.data.message, life: 3000 });
        }
        );
    }
  };

  return (
    <div className="p-grid p-fluid" >
      <Toast ref={toast}  />
      
      <div className="login" id="login" style={{overflow : 'hidden'}}>


        <form  id="form" style={{maxHeight: '55vh', overflowY: 'auto'}} onSubmit={registerUser}>
        <img src={logo} alt="Logo" className="logo" style = {{marginLeft: 'auto', marginRight: 'auto', display: 'block'}} />

          <div className="facture-section">
          <div className="section-three">
            <span className="p-input-icon-right">
              <i className="pi pi-user" />
              <InputText id="username" name="username" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} />
            </span>
          </div>

          <div className="section-three">
            <span className="p-input-icon-right">
              <i className="pi pi-envelope" />
              <InputText id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </span>
          </div>
          </div>
          <div className="facture-section">
          <div className="section-three">
            <span className="p-input-icon-right">
              <i className="pi pi-lock" />
              <Password id="password" placeholder="Password" feedback={false} name="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
            </span>
            </div>
            
            
            <div className="section-three">
            <span className="p-input-icon-right">
                <i className="pi pi-lock" />
                <Password id="confirmPassword" placeholder="Confirmer mot de passe" feedback={false} name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </span>
            </div>
            </div>
            <div className="section-three" style={{ marginBotton: '1em' }}>
            <span className="p-input-icon-right">
                <i className="pi pi-lock" />
                <Dropdown id="role" name="role" placeholder="Role" value={role} options={roles} onChange={(e) => setRole(e.value)} />
            </span>
            </div>
            

            {/* Button qui demande si ce user doit être lié à un client, et si oui on affiche la div qui contient le formulaire pour le client */}
            <ToggleButton checked={client} onChange={(e) => setClient(e.value)} offLabel="Appuyer pour lier l'utilisateur à un client" onLabel="Informations du client" style={{ marginTop: '1em', width: '90%', position: 'relative', left: '5%' }} />
            {client && (
              <div>
              <div className="facture-section">
                <div className="section-three">
                  <span className="p-input-icon-right">
                    <i className="pi pi-user" />
                    <InputText id="firstname" name="firstname" placeholder="Prénom" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                  </span>
                </div>
                <div className="section-three">
                  <span className="p-input-icon-right">
                    <i className="pi pi-user" />
                    <InputText id="lastname" name="lastname" placeholder="Nom" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                  </span>
                </div>
                <div className="section-three">
                  <span className="p-input-icon-right">
                    <i className="pi pi-phone" />
                    <InputText id="telephone" name="telephone" placeholder="Telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                  </span>
                </div>
              </div>
              <div className="facture-section">
                <div className="section-three">
                  <span className="p-input-icon-right">
                    <i className="pi pi-home" />
                    <InputText id="address" name="address" placeholder="Adresse" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </span>
                </div>
                <div className="section-three">
                  <span className="p-input-icon-right">
                    {/* numCompteClient */}
                    
                    <span className="p-float-label">
                    <InputText id="numCompteClient" name="numCompteClient"  value={numCompteClient} onChange={(e) => setNumCompteClient(e.target.value)}></InputText>
                    <label htmlFor="numCompteClient">Numéro de compte client</label>
                    </span>
                  </span>
                </div>
                <div className="section-three">
                  <span className="p-input-icon-right">
                    {/* numCompteClient */}
                    <i className="pi pi-home" />
                    <InputText id="numCompteClient" name="numCompteClient" placeholder="Numéro de compte en banque du client" value={num_compte_banque} onChange={(e) => setNum_compte_banque(e.target.value)} />
                  </span>
                </div>
                </div>

              </div>
            )}

            <div className="section-three">
            <Button label="Enregistrer" onClick={registerUser} />
            </div>
        </form>
      </div>
    </div>
  );
};

export default Register;