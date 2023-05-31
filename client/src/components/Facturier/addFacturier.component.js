import "./addFacturier.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useState, useEffect, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tooltip } from 'primereact/tooltip';
import { ProgressBar } from "primereact/progressbar";
import LibelleDataService from "../../services/libelleService";
import ObjetDataService from "../../services/objetService";
import DecompteDataService from "../../services/decompteService";
import FactureDataService from "../../services/factureService";
import ExtraitDataService from "../../services/extraitService";
import FacturierDataService from "../../services/facturierService";
import compteFournisseurDataService from "../../services/compteFournisseurService";
import compteClientDataService from "../../services/compteClientService";
import tvaDataService from "../../services/tva.services";
import clientDataService from "../../services/clientService";
import FournisseurDataService from "../../services/fournisseurService";
import LogsDataService from "../../services/logsService";

const AddFacturier = () => {
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fileInfo, setFileInfo] = useState(null);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        setUser(currentUser);
    }, []);

    const [libelles, setLibelles] = useState([]);
    const [factures, setFactures] = useState({});
    const [facturier, setFacturier] = useState({});
    const [objet, setObjet] = useState([]);
    const [extrait, setExtrait] = useState({});
    const [fournisseurList, setFournisseurList] = useState([]);
    const [clientList, setClientList] = useState([]);
    const [objetList, setObjetList] = useState([]);
    const [libelleList, setLibelleList] = useState([]);
    const [tvaList, setTvaList] = useState([]);
    const [decompteList, setDecompteList] = useState([]);
    const [extraitList, setExtraitList] = useState([]);
    const [decompte, setDecompte] = useState([]);
    const [fournisseur, setFournisseur] = useState([]);
    const [client, setClient] = useState([]);
    const [tva, setTva] = useState([]);
    const [compteFournisseur, setCompteFournisseur] = useState([]);
    const [compteClient, setCompteClient] = useState([]);
    const [factureId, setFactureId] = useState(null);
    const [fournisseurId, setFournisseurId] = useState(null);
    const [clientId, setClientId] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const toast = useRef(null);
    const toastAddon = useRef(null);

    const [displayObjets, setDisplayObjets] = useState(false);
    const [displayLibelles, setDisplayLibelles] = useState(false);
    const [displayDecompte, setDisplayDecompte] = useState(false);
    const [displayExtrait, setDisplayExtrait] = useState(false);
    const [displayFournisseur, setDisplayFournisseur] = useState(false);
    const [displayClient, setDisplayClient] = useState(false);
    const [displayLibellesList, setDisplayLibellesList] = useState(false);
    const [displayObjetList, setDisplayObjetList] = useState(false);
    const [displayDecompteList, setDisplayDecompteList] = useState(false);
    const [displayExtraitList, setDisplayExtraitList] = useState(false);
    const [displayFournisseurList, setDisplayFournisseurList] = useState(false);
    const [displayClientList, setDisplayClientList] = useState(false);
    const [displayTvaList, setDisplayTvaList] = useState(false);
    const [displayTva, setDisplayTva] = useState(false);
    const [position, setPosition] = useState('center');
    const [checked1, setChecked1] = useState(false);
    const token = localStorage.getItem("access_token");
    const decoded = jwt_decode(token);
    console.log(decoded);

    const dialogFuncMap = {
        'displayObjets': setDisplayObjets,
        'displayLibelles': setDisplayLibelles,
        'displayDecompte': setDisplayDecompte,
        'displayExtrait': setDisplayExtrait,
        'displayFournisseur': setDisplayFournisseur,
        'displayClient': setDisplayClient,
        'displayLibellesList': setDisplayLibellesList,
        'displayObjetList': setDisplayObjetList,
        'displayDecompteList': setDisplayDecompteList,
        'displayExtraitList': setDisplayExtraitList,
        'displayFournisseurList': setDisplayFournisseurList,
        'displayClientList': setDisplayClientList,
        'displayTvaList': setDisplayTvaList,
        'displayTva': setDisplayTva,
    };

    const onClick = (name, position, e) => {
        e.preventDefault(); // add this line to prevent the default behavior

        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    };

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    };

    const renderFooter = (name) => {
        if (name.className === 'objetDialog') {
            return (
                <div>
                    <Button label="Ajouter" icon="pi pi-check" onClick={saveObjet} onHide={onHide} />
                </div>
            );
        }
        if (name.className === 'libelleDialog') {
            return (
                <div>
                    <Button label="Ajouter" icon="pi pi-check" onClick={saveLibelle} onHide={onHide} />
                </div>
            );
        }
        if (name.className === 'decompteDialog') {
            return (
                <div>
                    <Button label="Ajouter" icon="pi pi-check" onClick={saveDecompte} onHide={onHide} />
                </div>
            );
        }
        if (name.className === 'extraitDialog') {
            return (
                <div>
                    <Button label="Ajouter" icon="pi pi-check" onClick={saveExtrait} onHide={onHide} />
                </div>
            );
        }
        if (name.className === 'fournisseurDialog') {
            return (
                <div>
                    <Button label="Ajouter" icon="pi pi-check" onClick={saveFournisseur} onHide={onHide} />
                </div>
            );
        }
        if (name.className === 'clientDialog') {
            return (
                <div>
                    <Button label="Ajouter" icon="pi pi-check" onClick={saveClient} onHide={onHide} />
                </div>
            );
        }
        if (name.className === 'tvaDialog') {
            return (
                <div>
                    <Button label="Ajouter" icon="pi pi-check" onClick={saveTva} onHide={onHide} />
                </div>
            );
        }



    };

    const getLibelleList = async () => {
        const libelleList = await LibelleDataService.getAll();
        setLibelleList(libelleList.data.map(libelle => {
            return {
                label: libelle.title,
                // add tooltip to the label
                value: libelle.id,
                from: 'libelle'
            };
            // sort the list by label
        }).sort((a, b) => a.label.localeCompare(b.label)));

    };

    const getObjetList = async () => {
        const objetList = await ObjetDataService.getAll();
        setObjetList(objetList.data.map(objet => {
            return {
                label: objet.title,
                value: objet.id,
                from: 'objet'
            };
            // sort the list by label
        }).sort((a, b) => a.label.localeCompare(b.label)));
    };

    const getDecompteList = async () => {
        const decompteList = await DecompteDataService.getAll();
        setDecompteList(decompteList.data.map(decompte => {
            return {
                label: decompte.num_decompte,
                value: decompte.decompte_id,
                type: decompte.type,
                from: 'decompte'
            };
            // sort the list by label
        }).sort((a, b) => a.label.localeCompare(b.label)));
    };

    const getExtraitList = async () => {
        const extraitList = await ExtraitDataService.getAll();
        setExtraitList(extraitList.data.map(extrait => {
            return {
                label: extrait.num_extrait,
                value: extrait.extrait_id,
                montant: extrait.montant,
                date: extrait.date_extrait,
                from: 'extrait'
            };
        }));
    };

    const getTvaList = async () => {
        const tvaList = await tvaDataService.getAll();
        setTvaList(tvaList.data.map(tva => {
            return {
                label: tva.tva_value,
                value: tva.tva_id,
                tva_description: tva.tva_description,
                from: 'tva'

            };
        }));
    };

    const getFournisseurList = async () => {
        const fournisseurList = await compteFournisseurDataService.getAll();
        console.log(fournisseurList)
        setFournisseurList(fournisseurList.map(fournisseur => {
            return {
                label: fournisseur.fournisseur.name,
                value: fournisseur.co_fournisseur_id,
                numCompteFournisseur: fournisseur.numCompteFournisseur,
                adresse_fournisseur: fournisseur.fournisseur.adresse_fournisseur,
                telephone_fournisseur: fournisseur.fournisseur.telephone_fournisseur,
                email_fournisseur: fournisseur.fournisseur.email_fournisseur,
                num_compte_banque: fournisseur.num_compte_banque,
                fournisseur_id: fournisseur.fournisseur_id,
                description: fournisseur.fournisseur.description,
                from: 'fournisseur'


            };
        }).sort((a, b) => a.label.localeCompare(b.label)));
    };

    const getClientList = async () => {
        const clientList = await compteClientDataService.getAll();
        setClientList(clientList.map(client => {
            return {
                label: client.client.name + " " + client.client.firstname,
                value: client.co_client_id,
                name: client.client.name,
                firstname: client.client.firstname,
                adresse_client: client.client.adresse_client,
                telephone_client: client.client.telephone_client,
                email_client: client.client.email_client,
                numCompteClient: client.numCompteClient,
                num_compte_banque: client.num_compte_banque,
                client_id: client.client.client_id,
                description: client.client.description,
                from: 'client'

            };
        }).sort((a, b) => a.label.localeCompare(b.label)));
    };







    useEffect(() => {
        async function fetchData() {
            //get the last id of facture
            const factureId = await FactureDataService.getLastFactureId();
            const fournisseurId = await FournisseurDataService.getLastFournisseurId();
            const clientId = await clientDataService.getLastClientId();
            setFactureId(factureId + 1);
            setFournisseurId(fournisseurId + 1);
            setClientId(clientId + 1);
        }
        fetchData();
        getLibelleList();
        getObjetList();
        getDecompteList();
        getExtraitList();
        getTvaList();
        getFournisseurList();
        getClientList();

    }, []);

    const saveFacture = () => {
        // Vérifier que result.taxes[0] n'est pas undifined 
        // si c'est le cas, on met on ne prends que facture.tva
        // sinon on prends result.taxes[0].value et on récupère son id dans la liste des tva correspondant à la valeur
        // on récupère l'id de la tva correspondant à la valeur de la tva
        var tva_id = null;
        console.log(factures.tva)
        if (result && result.taxes[0] !== undefined) {
            tva_id = tvaList.find(tva => tva.label === result.taxes[0].value).value;
        } else {
            tva_id = factures.tva
        }
        var montantTotal = null;
        if (result && result.totalAmount.value !== undefined) {
            // convert to string
            const montantValue = String(result.totalAmount.value);

            // if there is a dot in the amount, replace it with a comma
            if (montantValue.includes('.')) {
                let montantReplace = montantValue.replace('.', ',');
                // convert the string to a number
                montantTotal = Number(montantReplace.replace(/\s/g, ''));
                console.log(montantTotal)

            } else {
                montantTotal = Number(montantValue.replace(/\s/g, ''));
            }
        } else {
            montantTotal = factures.montant_facture

        }

        var data = {
            num_facture: result && result.invoiceNumber.value ? result.invoiceNumber.value : factures.num_facture,
            facture_date: result && result.date.value ? result.date.value : factures.date_facture,
            montant: result && result.totalAmount.value ? montantTotal : factures.montant_facture,
            objet_id: factures.objet,
            libelle_id: factures.libelle,
            estpaye: extrait.extrait ? true : false,
            num_facture_lamy: factures.num_facture_lamy,
            tva_id: tva_id,
            due_date: result && result.dueDate.value ? result.dueDate.value : factures.due_date,
        }
        console.log(factures)
        console.log(data)
        FactureDataService.create(data)
            .then(response => {
                console.log(response.data);
                setFactures({
                    ...factures,
                    num_facture: response.data.num_facture,
                    facture_date: response.data.date_facture,
                    montant: response.data.montant,
                    objet: response.data.objet_id,
                    libelle: response.data.libelle_id,
                    estpaye: response.data.estpaye,
                    tva_id: response.data.tva_id,
                    num_facture_lamy: response.data.num_facture_lamy,
                    due_date: response.data.due_date,
                    submitted: true
                });
                console.log(response.data);
                //   Ajouter dans le facturier
                saveFacturier(response.data.facture_id)
            })
            .catch(e => {
                console.log(e);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: e.response.data.message, life: 3000 });
            });
    };







    // fonction qui crée le facturier dans la base de donnée grâce au dernier id de facture récupéré
    const saveFacturier = (facture_id) => {
        console.log(fournisseur)
        var data = {
            facture_id: facture_id,
            decompte_id: decompte.decompte,
            co_fournisseur_id: fournisseur.fournisseur.fournisseur_id,
            extrait_id: extrait.extrait ? extrait.extrait : null,
            co_client_id: client.client,
            facture_img: file ? file : null,
        };

        FacturierDataService.create(data)
            .then(response => {
                setFacturier({
                    ...facturier,
                    facture_id: response.data.facture_id,
                    decompte_id: response.data.decompte_id,
                    co_fournisseur_id: response.data.fournisseur_id,
                    extrait_id: response.data.extrait_id,
                    co_client_id: response.data.client_id,
                    facture_img: response.data.facture_img,
                });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Facturier Added', life: 3000 });
                //vide les champs du formulaire

                setFactures({
                    ...factures,
                    num_facture: "",
                    date_facture: "",
                    montant_facture: "",
                    objet: "",
                    libelle: "",
                    estpaye: "",
                    tva: "",
                    num_facture_lamy: "",
                    due_date: "",
                });
                setDecompte({
                    ...decompte,
                    decompte: "",
                });

                setFournisseur({
                    ...fournisseur,
                    fournisseur: "",
                });

                setClient({
                    ...client,
                    client: "",
                });

                setExtrait({
                    ...extrait,
                    extrait: "",
                });
                setResult(null);
                setFile(null);
                setFileInfo(null);
                setChecked1(false);
                const file = document.getElementById('file');
                file.value = '';


                const logData = {
                    facturier_id: response.data.facturier_id,
                    facture_id: response.data.facture_id,
                    user_id: decoded.user_id.id,
                    description: "Ajout d'un facturier",
                };

                // si il y a le facturier_id et le facture_id, on ajoute le log
                if (logData.facturier_id && logData.facture_id) {
                    LogsDataService.create(logData);
                    toast.current.show({ severity: 'success', summary: 'Log ajoutée', detail: `Le log - ${logData.description} - a été ajouté avec succès`, life: 3000 });
                }

            })
            .catch(e => {

                toast.current.show({ severity: 'error', summary: 'Erreur de création', detail: e.response.data.message, life: 3000 });
            });
    };





    // fonction qui va ajouter un libelle dans la base de donnée
    const saveLibelle = () => {
        var data = {
            title: libelles.title,
        };
        LibelleDataService.create(data)
            .then(response => {
                setLibelles({
                    ...libelles,
                    title: response.data.title,
                });
                // vide le champ du formulaire
                setLibelles({
                    ...libelles,
                    title: "",
                });
                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Libelle Added', life: 3000 });

                getLibelleList();
                const logData = {
                    libelle_id: response.data.id,
                    description: "Ajout d'un libelle",
                    user_id: decoded.user_id.id
                }
                LogsDataService.create(logData)
                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Log Added', life: 3000 });

            })
            .catch(e => {
                toastAddon.current.show({ severity: 'error', summary: 'Error', detail: 'Libelle not added', life: 3000 });
            });
    };
    // fonction qui va ajouter un objet dans la base de donnée
    const saveObjet = () => {
        var data = {
            title: objet.title,
        };
        ObjetDataService.create(data)
            .then(response => {
                setObjet({
                    ...objet,
                    title: response.data.title,
                });
                setObjet({
                    ...objet,
                    title: "",
                });

                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Objet Added', life: 3000 });
                getObjetList();
                const logData = {
                    objet_id: response.data.id,
                    description: "Ajout d'un objet",
                    user_id: decoded.user_id.id,
                }
                LogsDataService.create(logData)
                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Log Added', life: 3000 });
            })
            .catch(e => {
                toastAddon.current.show({ severity: 'error', summary: 'Error', detail: 'Objet not added', life: 3000 });
            });
    };

    const saveDecompte = () => {
        var data = {
            type: decompte.type,
            num_decompte: decompte.num_decompte,
        };
        DecompteDataService.create(data)
            .then(response => {
                setDecompte({
                    ...decompte,
                    type: response.data.type,
                    num_decompte: response.data.num_decompte,
                });
                setDecompte({
                    ...decompte,
                    type: "",
                    num_decompte: "",
                });
                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Decompte Added', life: 3000 });
                getDecompteList();
                const logData = {
                    decompte_id: response.data.decompte_id,
                    description: "Ajout d'un decompte",
                    user_id: decoded.user_id.id,

                }
                LogsDataService.create(logData)
                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Log Added', life: 3000 });
            })
            .catch(e => {
                toastAddon.current.show({ severity: 'error', summary: 'Error', detail: 'Decompte not added', life: 3000 });
            });
    };

    const saveExtrait = () => {
        var data = {
            num_extrait: extrait.num_extrait,
            date_extrait: extrait.date_extrait,
            montant: extrait.montant,
        };
        ExtraitDataService.create(data)
            .then(response => {
                setExtrait({
                    ...extrait,
                    num_extrait: response.data.num_extrait,
                    date_extrait: response.data.date_extrait,
                    montant: response.data.montant,
                });
                setExtrait({
                    ...extrait,
                    num_extrait: "",
                    date_extrait: "",
                    montant: "",
                });
                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Decompte Added', life: 3000 });
                getExtraitList();
                const logData = {
                    extrait_id: response.data.extrait_id,
                    description: "Ajout d'un extrait",
                    user_id: decoded.user_id.id,

                }
                console.log(logData);
                LogsDataService.create(logData)
                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Log Added', life: 3000 });
            })
            .catch(e => {
                toastAddon.current.show({ severity: 'ERROR', summary: 'ERROR', detail: 'Extrait not Added', life: 3000 });
            });
    };






    const saveFournisseur = async () => {

        var data = {
            name: fournisseur.name,
            adresse_fournisseur: fournisseur.adresse_fournisseur,
            telephone_fournisseur: fournisseur.telephone_fournisseur,
            email_fournisseur: fournisseur.email_fournisseur,
            num_fournisseur: fournisseur.num_fournisseur,
            description: fournisseur.description,
        };
        await FournisseurDataService.create(data)
            .then(response => {
                setFournisseur({
                    ...fournisseur,
                    name: response.data.name,
                    adresse_fournisseur: response.data.adresse_fournisseur,
                    telephone_fournisseur: response.data.telephone_fournisseur,
                    email_fournisseur: response.data.email_fournisseur,
                    num_fournisseur: response.data.num_fournisseur,
                    description: response.data.description,
                });
                console.log(response.data.fournisseur_id);
                setFournisseurId(response.data.fournisseur_id + 1);

                saveCompteFournisseur(response.data.fournisseur_id);
                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Fournisseur Added', life: 3000 });
                const logData = {
                    fournisseur_id: response.data.fournisseur_id,
                    description: "Ajout d'un fournisseur",
                    user_id: decoded.user_id.id,

                }
                LogsDataService.create(logData)
                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Log Added', life: 3000 });

            })
            .catch(e => {
                toastAddon.current.show({ severity: 'error', summary: 'Error', detail: 'Fournisseur not added', life: 3000 });
            });
    };
    // fonction qui crée le facturier dans la base de donnée grâce au dernier id de facture récupéré
    const saveCompteFournisseur = async (fournisseur_id) => {
        var data = {
            fournisseur_id: fournisseur_id,
            num_compte_banque: compteFournisseur.num_compte_banque,
            numCompteFournisseur: compteFournisseur.numCompteFournisseur,
        };

        await compteFournisseurDataService.create(data)
            .then(response => {
                setCompteFournisseur({
                    ...compteFournisseur,

                    num_compte_banque: response.data.num_compte_banque,
                    numCompteFournisseur: response.data.numCompteFournisseur,
                });
                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Compte Fournisseur Added', life: 3000 });
                getFournisseurList();
                //vide les champs du formulaire
                setCompteFournisseur({
                    ...compteFournisseur,
                    num_compte_banque: "",
                    numCompteFournisseur: "",
                });
                setFournisseur({
                    ...fournisseur,
                    name: "",
                    adresse_fournisseur: "",
                    telephone_fournisseur: "",
                    email_fournisseur: "",
                    num_fournisseur: "",
                    description: "",
                });
            })
            .catch(e => {
                toastAddon.current.show({ severity: 'error', summary: 'Error', detail: 'Compte Fournisseur not added', life: 3000 });
            });
    };

    const saveClient = () => {

        var data = {
            name: client.name,
            firstname: client.firstname,
            adresse_client: client.adresse_client,
            telephone_client: client.telephone_client,
            email_client: client.email_client,
            description: client.description
        };
        clientDataService.create(data)
            .then(response => {
                setClient({
                    ...client,
                    name: response.data.name,
                    firstname: response.data.firstname,
                    adresse_client: response.data.adresse_client,
                    telephone_client: response.data.telephone_client,
                    email_client: response.data.email_client,
                    description: response.data.description
                });

                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Client Added', life: 3000 });
                setClientId(response.data.client_id + 1);
                savecompteClient(response.data.client_id);
                const logData = {
                    client_id: response.data.client_id,
                    description: "Ajout d'un client",
                    user_id: decoded.user_id.id,

                }
                LogsDataService.create(logData)
                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Log Added', life: 3000 });
            })
            .catch(e => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Client not added', life: 3000 });
            });
    };
    // fonction qui crée le facturier dans la base de donnée grâce au dernier id de facture récupéré
    const savecompteClient = (client_id) => {
        var data = {
            client_id: client_id,
            numCompteClient: compteClient.numCompteClient,


            num_compte_banque: compteClient.num_compte_banque,
            description: compteClient.description
        };

        compteClientDataService.create(data)
            .then(response => {
                setCompteClient({
                    ...compteClient,
                    numCompteClient: response.data.numCompteClient,
                    client_id: response.data.client_id,
                    num_compte_banque: response.data.num_compte_banque,
                    description: response.data.description
                });
                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Compte Client Added', life: 3000 });
                //vide les champs du formulaire

                setClient({
                    ...client,
                    name: "",
                    firstname: "",
                    adresse_client: "",
                    telephone_client: "",
                    email_client: "",
                    description: "",

                });
                setCompteClient({
                    ...compteClient,
                    numCompteClient: "",
                    client_id: "",
                    num_compte_banque: "",
                    description: ""
                });
                console.log(compteClient)
                // raffraichir la liste des clients
                getClientList();
                // ajouter l'id du client dans la table des logs 


            })
            .catch(e => {
                toastAddon.current.show({ severity: 'error', summary: 'Error', detail: 'compte_client not added', life: 3000 });
            });
    };

    const saveTva = () => {
        var data = {
            tva_value: tva.tva_value,
            tva_description: tva.tva_description
        };
        tvaDataService.create(data)
            .then(response => {
                setTva({
                    ...tva,
                    tva_value: response.data.tva_value,
                    tva_description: response.data.tva_description
                });

                setTva({
                    ...tva,
                    tva_value: "",
                    tva_description: ""
                });

                getTvaList();
                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Tva Added', life: 3000 });

                // mettre à jour la liste des tva


                const logData = {
                    tva_id: response.data.tva_id,
                    description: "Ajout d'une tva",
                    user_id: decoded.user_id.id,

                }
                LogsDataService.create(logData)
                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Log Added', life: 3000 });
                // refresh the list 
            })
            .catch(e => {
                toastAddon.current.show({ severity: 'error', summary: 'Error', detail: 'Tva not added', life: 3000 });
            });
    };

    const onRowEditComplete = async (e) => {
        try {
            let apiData, logData;
            switch (e.data.from) {
                case 'libelle':
                    apiData = { id: e.data.value, title: e.newData.label };
                    await LibelleDataService.update(e.data.value, apiData);
                    logData = { libelle_id: e.data.libelle_id, description: "Modification d'un libelle", user_id: decoded.user_id.id };
                    await LogsDataService.create(logData);
                    getLibelleList();
                    break;

                case 'objet':
                    apiData = { id: e.data.value, title: e.newData.label };
                    await ObjetDataService.update(e.data.value, apiData);
                    logData = { objet_id: e.data.objet_id, description: "Modification d'un objet", user_id: decoded.user_id.id };
                    await LogsDataService.create(logData);
                    getObjetList();
                    setShowAlert(false);
                    break;

                case 'decompte':
                    apiData = { decompte_id: e.data.value, num_decompte: e.newData.label, type: e.newData.type };
                    await DecompteDataService.update(e.data.value, apiData);
                    logData = { decompte_id: e.data.decompte_id, description: "Modification d'un decompte", user_id: decoded.user_id.id };
                    await LogsDataService.create(logData);
                    getDecompteList();
                    setShowAlert(false);
                    break;

                case 'fournisseur':
                    console.log(e)
                    const fournisseurData = {
                        name: e.newData.label,
                        adresse_fournisseur: e.newData.adresse_fournisseur,
                        telephone_fournisseur: e.newData.telephone_fournisseur,
                        email_fournisseur: e.newData.email_fournisseur,
                        description: e.newData.description
                    };
                    const compteFournisseurData = {
                        numCompteFournisseur: e.newData.numCompteFournisseur,
                        num_compte_banque: e.newData.num_compte_banque
                    };
                    await FournisseurDataService.update(e.data.fournisseur_id, fournisseurData);
                    logData = { fournisseur_id: e.data.fournisseur_id, description: "Modification d'un fournisseur", user_id: decoded.user_id.id };
                    await LogsDataService.create(logData);
                    await compteFournisseurDataService.update(e.data.value, compteFournisseurData);
                    getFournisseurList();
                    setShowAlert(false);
                    break;
                case 'client':
                    const clientData = {
                        name: e.newData.label,
                        firstname: e.newData.firstname,
                        adresse_client: e.newData.adresse_client,
                        telephone_client: e.newData.telephone_client,
                        email_client: e.newData.email_client,
                        description: e.newData.description
                    };
                    const compteClientData = {
                        numCompteClient: e.newData.numCompteClient,
                        num_compte_banque: e.newData.num_compte_banque
                    };
                    await clientDataService.update(e.data.client_id, clientData);
                    logData = { client_id: e.data.client_id, description: "Modification d'un client", user_id: decoded.user_id.id };
                    await LogsDataService.create(logData);
                    await compteClientDataService.update(e.data.value, compteClientData);
                    getClientList();
                    setShowAlert(false);
                    break;


                default:
                    break;
            }
            toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: `${e.data.from} Updated`, life: 3000 });
            toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Log Added', life: 3000 });
        } catch (error) {
            toastAddon.current.show({ severity: 'error', summary: 'Error', detail: `${e.data.from} not updated`, life: 3000 });
        }
    };


    const textEditor = (options) => {
        // Message dans le dialog pour informer l'utilisateur

        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} tooltip="Attention ! Toutes modifications entrainera des changements sur tout le facturier" tooltipOptions={{ className: 'yellow-tooltip', position: 'top' }} />;

    }

    const handleFormSubmit = (event) => {
        setLoading(true);
        event.preventDefault();

        if (!file) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        axios
            .post('/api/ocr-mindee', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                setResult(response.data);
                setLoading(false);


            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);

        const file = event.target.files[0];
        console.log(file);
        if (!file) {
            return;
        }
        else {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFileInfo({
                    previewURL: reader.result,
                    fileName: file.name,
                    fileSize: `${(file.size / 1024).toFixed(2)} KB`
                });
            };
        }
    };


    //   Check if the fournisseur from result.supplierName exist in the database, if not, show a message to the user to add it
    const checkFournisseur = async (data) => {
        const fournisseur = await FournisseurDataService.getFournisseurByName(data);
        if (fournisseur.data.message === "This fournisseur does not exist") {
            return false
        }
        return true
    };

    const checkClient = async (data) => {

        const client = await clientDataService.getClientByName(data);
        if (client.data.message === "Client not found") {
            return false
        }
        return true
    };


    return (

        <div className="addFacturier-section">

            <Toast ref={toast} />
            <Tooltip
                target=".editButton"
                content="Modifier"
                position="bottom"
                mouseTrack={true}
                mouseTrackLeft={10}

            />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', border: '1px solid #ced4da', borderRadius: '.25rem', width: '100%', flexWrap: 'wrap', padding: '1rem' }}>
                <label className="upload-btn" style={{ marginBottom: '1rem' }}>
                    
                    <input type="file" onChange={handleFileChange} id ="file"/>
                </label>

                {loading && (
                    <ProgressBar mode="indeterminate" className="p-progressbar" />
                )}
                {fileInfo && (
                    <div className="file-info-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginLeft: '1rem', width: '50%' }}>
                        <img className="file-preview" src={fileInfo.previewURL} alt="Preview" />
                        <div className="file-name">{fileInfo.fileName}</div>
                        <div className="file-size">{fileInfo.fileSize}</div>
                    </div>
                )}
                                <Button type="button" label="Récupérer les données de la facture" onClick={handleFormSubmit} className="p-button-raised p-button-rounded" style={{ marginLeft: '1rem' }} />

            </div>

            <h3 class="style-section-title">Factures</h3>
            <div className="facture-section">


                <div class="section-three no-hover">

                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i class="fa-solid fa-hashtag"></i>                            </span>
                        <span className="p-float-label">
                            {result && result.invoiceNumber.value ? <InputText id="num_facture" type="text" value={result.invoiceNumber.value} onChange={(e) => setResult({ ...result, invoiceNumber: { value: e.target.value } })} /> : <InputText id="num_facture" type="text" value={factures.num_facture} onChange={(e) => setFactures({ ...factures, num_facture: e.target.value })} />}
                            <label htmlFor="inputgroup">N° de facture*</label>
                        </span>
                    </div>
                </div>

                <div class="section-three no-hover">

                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <span className="p-float-label">
                            <InputText id="num_facture_lamy" type="text" value={factures.num_facture_lamy} onChange={(e) => setFactures({ ...factures, num_facture_lamy: e.target.value })} />
                            <label htmlFor="inputgroup">N° de facture Lamy*</label>
                        </span>
                    </div>
                </div>
                <div class="section-three no-hover">
                    {result && result.date.value ?
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-calendar"></i>
                            </span>
                            <span className="p-float-label">

                                <InputText id="date_facture" type="text" value={result.date.value} onChange={(e) => setResult({ ...result, date: { value: e.target.value } })} />
                                <label htmlFor="inputgroup">Date de facture*</label>
                            </span>
                        </div>
                        :

                        <span className="p-float-label">

                            <Calendar id="date_facture" value={factures.date_facture} onChange={(e) => setFactures({ ...factures, date_facture: e.value })} dateFormat="dd/mm/yy" showIcon />
                            <label htmlFor="inputgroup">Date de facture*</label>
                        </span>

                    }
                </div>
                <div class="section-three no-hover">
                    {result && result.dueDate.value ?
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-calendar"></i>
                            </span>
                            <span className="p-float-label">

                                <InputText id="date_facture" type="text" value={result.dueDate.value} onChange={(e) => setResult({ ...result, dueDate: { value: e.target.value } })} />
                                <label htmlFor="inputgroup">Date de facture*</label>
                            </span>
                        </div>
                        :

                        <span className="p-float-label">

                            <Calendar id="date_facture" value={factures.due_date} onChange={(e) => setFactures({ ...factures, due_date: e.value })} dateFormat="dd/mm/yy" showIcon minDate={factures.date_facture} />
                            <label htmlFor="inputgroup">Date limite de paiement </label>
                        </span>

                    }
                </div>


                <div class="section-three no-hover">

                    {result && result.totalAmount.value ?
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-euro"></i>
                            </span>
                            <span className="p-float-label">

                                <InputText id="montant" type="text" value={result.totalAmount.value} onChange={(e) => setResult({ ...result, totalAmount: { value: e.target.value } })} />
                                <label htmlFor="inputgroup">Montant de la facture*</label>
                            </span>
                        </div>
                        :
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-euro"></i>
                            </span>

                            <span className="p-float-label">
                                <InputText id="montant" type="text" value={factures.montant_facture} onChange={(e) => setFactures({ ...factures, montant_facture: e.target.value })} />
                                <label htmlFor="inputgroup">Montant de la facture* </label>
                            </span>

                        </div>

                    }
                </div>

                <div class="facture-section" style={{ marginTop: '1em' }}>
                    <div class="section-three no-hover">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i class="fa-solid fa-file-invoice"></i>
                            </span>
                            <span className="p-float-label">
                                <Dropdown id="libelle" value={factures.libelle} options={libelleList} onChange={(e) => setFactures({ ...factures, libelle: e.value })} placeholder="Choisir parmis les libéllés" filter showClear />
                                <label htmlFor="inputgroup">Libellé*</label>
                            </span>
                            <Button onClick={(e) => onClick('displayLibelles', 'center', e)} icon="pi pi-plus" className="p-button-success" />
                            <Dialog header="Ajout d'un libéllé" className="libelleDialog" visible={displayLibelles} footer={renderFooter} onHide={() => onHide('displayLibelles')}>

                                <Button onClick={(e) => onClick('displayLibellesList', 'center', e)} className="p-button-info" tooltip="Liste des libéllés existants" tooltipOptions={{ position: 'right' }} badge={libelleList.length}>
                                    Liste des libélles existants
                                </Button>
                                <Toast ref={toastAddon} />

                                <div class="section-three no-hover">

                                    <div className="p-inputgroup" >
                                        <span className="p-inputgroup-addon">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </span>
                                        <span className="p-float-label">

                                            <InputText id="libelle" type="text" value={libelles.title} onChange={(e) => setLibelles({ ...libelles, title: e.target.value })} />
                                            <label htmlFor="libelle">Titre du libéllé*</label>
                                        </span>
                                        {/* Button to see a list of libelle */}
                                        <Dialog header="Liste des libéllés" className="libelleListDialog" visible={displayLibellesList} style={{ width: '90%' }} footer={renderFooter} onHide={() => onHide('displayLibellesList')} maximizable filter={true} filterPlaceholder="Chercher par objet" filterBy="label"
                                        >
                                            <Toast ref={toastAddon} />
                                            <DataTable value={libelleList} paginator rows={5} rowsPerPageOptions={[5, 10, 20]} responsive maximizable filter={true} filterPlaceholder="Chercher par libéllé" filterBy="label" editMode="row" onRowEditComplete={onRowEditComplete}>
                                                <Column field="label" header="Libéllés" sortable filter filterPlaceholder="Rechercher" editor={(options) => textEditor(options)} />
                                                {/* colonne avec le bouton de modifier  */}

                                                <Column className="editButton" rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} data-pr-tooltip="Modifier" data-pr-position="top"></Column>


                                            </DataTable>
                                            {/* si l'utilisateur appuie sur modifier de la className editbutton, alors on affiche un message d'attention  */}



                                        </Dialog>


                                    </div>
                                </div>

                            </Dialog>
                        </div>
                    </div>

                    <div class="section-three no-hover">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-file"></i>
                            </span>
                            <span className="p-float-label" >
                                <Dropdown id="decompte" value={decompte.decompte} options={decompteList} onChange={(e) => setDecompte({ ...decompte, decompte: e.value })} placeholder="Choisir un décomptes" filter showClear />
                                <label htmlFor="inputgroup">Décompte*</label>
                            </span>
                            <Button onClick={(e) => onClick('displayDecompte', 'center', e)} icon="pi pi-plus" className="p-button-success" style={{minWidth:'fit-content'}} />

                            <Dialog header="Ajout d'un décompte" className="decompteDialog" visible={displayDecompte} footer={renderFooter} onHide={() => onHide('displayDecompte')}>
                                <Toast ref={toastAddon} />
                                <Button onClick={(e) => onClick('displayDecompteList', 'center', e)} className="p-button-info" tooltip="Liste des décomptes existants" tooltipOptions={{ position: 'right' }} badge={decompteList.length}>
                                    List des décomptes existants
                                </Button>
                                <div class="facture-section" style={{ marginTop: '1em' }}>
                                    <div class="section-three no-hover">

                                        <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                            <span className="p-inputgroup-addon">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <span className="p-float-label">
                                                <InputText id="decompte" type="text" value={decompte.num_decompte} onChange={(e) => setDecompte({ ...decompte, num_decompte: e.target.value })} />
                                                <label htmlFor="decompte">N° du décompte*</label>
                                            </span>
                                            <span className="p-inputgroup-addon">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </span>
                                        </div>
                                        <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                            <span className="p-inputgroup-addon">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <span className="p-float-label">
                                                <InputText id="decompte" type="text" value={decompte.type} onChange={(e) => setDecompte({ ...decompte, type: e.target.value })} />
                                                <label htmlFor="decompte">Titre du décompte*</label>
                                            </span>
                                            <span className="p-inputgroup-addon">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </span>
                                        </div>
                                        <div class="section-three no-hover">




                                            {/* Button to see a list of libelle */}

                                            <Dialog header="Liste des décomptes" className="decompteListDialog" visible={displayDecompteList} style={{ width: '90%' }} footer={renderFooter} onHide={() => onHide('displayDecompteList')}>


                                                <DataTable value={decompteList} paginator rows={5} rowsPerPageOptions={[5, 10, 20]} responsive maximizable filter={true} filterPlaceholder="Chercher par décompte" filterBy="label" editMode="row" onRowEditComplete={onRowEditComplete}>
                                                    <Column field="label" header="Décompte" sortable filter filterPlaceholder="Rechercher" editor={(options) => textEditor(options)} />
                                                    <Column field="type" header="Type" sortable filter filterPlaceholder="Rechercher" editor={(options) => textEditor(options)} />
                                                    {/* colonne avec le bouton de modifier  */}
                                                    <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} className="editButton" data-pr-tooltip="No notifications" data-pr-position="right"></Column>

                                                </DataTable>
                                                {/* check if the className editButton is changed */}
                                                {/* si le bouton modifier est cliqué, on indique un message en rouge pour indiqué que ce changement sera effectué sur tous les facturiers existants */}


                                            </Dialog>

                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                        </div>
                    </div>

                    <div class="section-three no-hover">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i class="fa-solid fa-file-invoice"></i>
                            </span>
                            <span className="p-float-label">
                                <Dropdown id="objet" value={factures.objet} options={objetList} onChange={(e) => setFactures({ ...factures, objet: e.value })} placeholder="Choisir parmis les objets" filter showClear />
                                <label htmlFor="inputgroup">Objet de la facture*</label>
                            </span>
                            <Button onClick={(e) => onClick('displayObjets', 'center', e)} icon="pi pi-plus" className="p-button-success" />

                            <Dialog header="Ajout d'un objet" className="objetDialog" visible={displayObjets} footer={renderFooter} onHide={() => onHide('displayObjets')} style={{ width: '90%' }}>
                                <Toast ref={toastAddon} />
                                <Button onClick={(e) => onClick('displayObjetList', 'center', e)} className="p-button-info" tooltip="Liste des objets existants" tooltipOptions={{ position: 'right' }} badge={objetList.length}>
                                    List des objets existants
                                </Button>
                                <div class="section-three no-hover">

                                    <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                        <span className="p-inputgroup-addon">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </span>
                                        <span className="p-float-label">
                                            <InputText id="objet" type="text" value={objet.title} onChange={(e) => setObjet({ ...objet, title: e.target.value })} />
                                            <label htmlFor="objet">Objet*</label>
                                        </span>
                                        {/* Button to see a list of objet */}

                                        <Dialog header="Liste des objets" className="objetListDialog" visible={displayObjetList} style={{ width: '90%' }} footer={renderFooter} onHide={() => onHide('displayObjetList')} >
                                            <DataTable value={objetList} paginator rows={5} rowsPerPageOptions={[5, 10, 20]} responsive stripedRows resizableColumns columnResizeMode="expand" editMode="row" onRowEditComplete={onRowEditComplete}>
                                                <Column field="label" header="Objets" sortable filter filterPlaceholder="Rechercher" editor={(options) => textEditor(options)} />
                                                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} className="editButton" data-pr-tooltip="No notifications" data-pr-position="right" />
                                            </DataTable>
                                        </Dialog>
                                    </div>
                                </div>
                            </Dialog>
                        </div>
                    </div>

                </div>



            </div>
            <div class="facture-section">
                <h3 class="style-section-title" style={{ marginTop: "1em" }}>Clients et fournisseurs</h3>
                <div class="facture-section">
                    <div class="section-three no-hover">


                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i class="fa-solid fa-file-invoice"></i>
                            </span>
                            {result && checkFournisseur(result.supplierName.value) === true ?
                                <span className="p-float-label">
                                    <InputText id="Fournisseur" type="text" value={result.supplierName.value} onChange={(e) => setResult({ ...result, supplierName: e.target.value })} />
                                    <label htmlFor="Fournisseur">Fournisseur*</label>
                                </span>
                                :
                                <span className="p-float-label">
                                    <Dropdown id="fournisseur" value={fournisseur.fournisseur} options={fournisseurList} onChange={(e) => setFournisseur({ ...fournisseur, fournisseur: e.value })} placeholder="Séléctionner un fournisseur" filter showClear />
                                    <label htmlFor="fournisseur">Fournisseur*</label>
                                </span>
                            }




                            <Button onClick={(e) => onClick('displayFournisseur', 'center', e)} icon="pi pi-plus" className="p-button-success" />

                            <Dialog header="Ajout d'un nouveau fournisseur" className="fournisseurDialog" visible={displayFournisseur} style={{ width: '90%' }} footer={renderFooter} onHide={() => onHide('displayFournisseur')}>
                                <Toast ref={toastAddon} />

                                {/* Button for the list of fournisseur */}
                                <Button onClick={(e) => onClick('displayFournisseurList', 'center', e)} className="p-button-info" tooltip="Liste des fournisseurs existants" tooltipOptions={{ position: 'right' }} badge={fournisseurList.length}>
                                    Liste des fournisseurs existants
                                </Button>
                                <Dialog header="Liste des fournisseurs" className="fournisseurListDialog" visible={displayFournisseurList} style={{ width: '70%' }} footer={renderFooter} onHide={() => onHide('displayFournisseurList')}>
                                    <DataTable value={fournisseurList} paginator rows={5} rowsPerPageOptions={[5, 10, 20]} stripedRows columnResizeMode="expand" filter={true} filterPlaceholder="Chercher par fournisseur" filterBy="label" scrollable scrollHeight="flex" editMode="row" onRowEditComplete={onRowEditComplete}>
                                        <Column field="label" header="Fournisseurs" sortable filter filterPlaceholder="Rechercher" style={{ minWidth: '200px' }} editor={(options) => textEditor(options)} />
                                        <Column field="numCompteFournisseur" header="Numéro de compte fournisseur" sortable filter filterPlaceholder="Rechercher" style={{ minWidth: '200px' }} editor={(options) => textEditor(options)} />
                                        <Column field="adresse_fournisseur" header="Adresse du fournisseur" sortable filter filterPlaceholder="Rechercher" style={{ minWidth: '200px' }} editMode="row" editor={(options) => textEditor(options)} />
                                        <Column field="telephone_fournisseur" header="Téléphone du fournisseur" sortable filter filterPlaceholder="Rechercher" style={{ minWidth: '200px' }} editor={(options) => textEditor(options)} />
                                        <Column field="email_fournisseur" header="Email du fournisseur" sortable filter filterPlaceholder="Rechercher" style={{ minWidth: '200px' }} editor={(options) => textEditor(options)} />
                                        <Column field="num_compte_banque" header="N° de compte en banque du fournisseur" sortable filter filterPlaceholder="Rechercher" style={{ minWidth: '200px' }} editor={(options) => textEditor(options)} />
                                        <Column field="description" header="Description" sortable filter filterPlaceholder="Rechercher" style={{ minWidth: '200px' }} editor={(options) => textEditor(options)} />
                                        <Column className="editButton" rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} data-pr-tooltip="Modifier" data-pr-position="top"></Column>

                                    </DataTable>
                                </Dialog>

                                <div class="facture-section">
                                    <div class="section-three no-hover">
                                        <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                            <span className="p-inputgroup-addon">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <span className="p-float-label">
                                                <InputText id="name" type="text" value={fournisseur.name} onChange={(e) => setFournisseur({ ...fournisseur, name: e.target.value })} />
                                                <label htmlFor="name">Nom*</label>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="section-three no-hover">
                                        <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                            <span className="p-inputgroup-addon">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <span className="p-float-label">
                                                <InputText id="num_fournisseur" type="text" value={fournisseur.num_fournisseur} onChange={(e) => setFournisseur({ ...fournisseur, num_fournisseur: e.target.value })} />
                                                <label htmlFor="num_fournisseur">Numéro du fournisseur*</label>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="section-three no-hover">
                                        <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                            <span className="p-inputgroup-addon">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <span className="p-float-label">
                                                <InputText id="adresse_fournisseur" type="text" value={fournisseur.adresse_fournisseur} onChange={(e) => setFournisseur({ ...fournisseur, adresse_fournisseur: e.target.value })} />
                                                <label htmlFor="adresse_fournisseur">Adresse du fournisseur*</label>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="facture-section">
                                        <div class="section-three no-hover">
                                            <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                                <span className="p-inputgroup-addon">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </span>
                                                <span className="p-float-label">
                                                    <InputText id="tel_fournisseur" type="text" value={fournisseur.telephone_fournisseur} onChange={(e) => setFournisseur({ ...fournisseur, telephone_fournisseur: e.target.value })} />
                                                    <label htmlFor="tel_fournisseur">téléphone du fournisseur*</label>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="section-three no-hover">
                                            <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                                <span className="p-inputgroup-addon">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </span>
                                                <span className="p-float-label">
                                                    <InputText id="email_fournisseur" type="text" value={fournisseur.email_fournisseur} onChange={(e) => setFournisseur({ ...fournisseur, email_fournisseur: e.target.value })} />
                                                    <label htmlFor="email_fournisseur">Email du fournisseur*</label>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="section-three no-hover">
                                            <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                                <span className="p-inputgroup-addon">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </span>
                                                <span className="p-float-label">
                                                    <InputText id="num_compte" type="text" value={compteFournisseur.numCompteFournisseur} onChange={(e) => setCompteFournisseur({ ...compteFournisseur, numCompteFournisseur: e.target.value })} />
                                                    <label htmlFor="num_compte">Numéro de compte*</label>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="section-three no-hover">
                                            <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                                <span className="p-inputgroup-addon">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </span>
                                                <span className="p-float-label">
                                                    <InputText id="banque" type="text" value={compteFournisseur.num_compte_banque} onChange={(e) => setCompteFournisseur({ ...compteFournisseur, num_compte_banque: e.target.value })} />
                                                    <label htmlFor="banque">N° de compte de banque*</label>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="section-three no-hover">
                                            <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                                <span className="p-inputgroup-addon">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </span>
                                                <span className="p-float-label">
                                                    <InputText id="banque" type="text" value={fournisseur.description} onChange={(e) => setFournisseur({ ...fournisseur, description: e.target.value })} />
                                                    <label htmlFor="banque">Description du fournisseur</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Dialog>

                        </div>
                        {result &&
                            checkFournisseur(result.supplierName.value) !== true && !fournisseur.fournisseur ?
                            <p style={{ color: 'red', fontSize: '0.8em', marginTop: '0.5em' }}>Le fournisseur de la facture scanné n'a pas été trouvé, veuillez le rajouter manuellement</p>
                            :
                            <p></p>
                        }
                    </div>
                    <div class="section-three no-hover">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i class="fa-solid fa-file-invoice"></i>
                            </span>
                            {result && checkClient(result.customerName.value) === true ?
                                <span className="p-float-label">
                                    <InputText id="client" type="text" value={result.customerName.value} onChange={(e) => setResult({ ...result, customerName: e.target.value })} />
                                    <label htmlFor="client">Client*</label>
                                </span>
                                :
                                <span className="p-float-label">
                                    <Dropdown id="client" value={client.client} options={clientList} onChange={(e) => setClient({ ...client, client: e.value })} placeholder="Select a client" filter showClear />
                                    <label htmlFor="client">Client*</label>
                                </span>
                            }


                            <Button onClick={(e) => onClick('displayClient', 'center', e)} icon="pi pi-plus" className="p-button-success" />

                            <Dialog header="Ajout d'un nouveau client" className="clientDialog" visible={displayClient} style={{ width: '50vw' }} footer={renderFooter} onHide={() => onHide('displayClient')}>
                                <Toast ref={toastAddon} />

                                {/* Button for the list of fournisseur */}
                                <Button onClick={(e) => onClick('displayClientList', 'center', e)} className="p-button-info" tooltip="Liste des clients existants" tooltipOptions={{ position: 'right' }} badge={clientList.length}>
                                    Liste des clients existants
                                </Button>
                                <Dialog header="Liste des clients" className="clientListDialog" visible={displayClientList} style={{ width: '80%' }} footer={renderFooter} onHide={() => onHide('displayClientList')}>
                                    <DataTable value={clientList} paginator rows={5} rowsPerPageOptions={[5, 10, 20]} stripedRows columnResizeMode="expand" filter={true} filterPlaceholder="Chercher par client" filterBy="label" scrollable scrollHeight="flex" editMode="row" onRowEditComplete={onRowEditComplete}>
                                        <Column field="name" header="Nom du client" sortable filter filterPlaceholder="Chercher par client" filterMatchMode="contains" style={{ width: '250px' }} editor={(options) => textEditor(options)} />
                                        <Column field="firstname" header="Prénom du client" sortable filter filterPlaceholder="Chercher par prénom" filterMatchMode="contains" style={{ width: '250px' }} editor={(options) => textEditor(options)} />
                                        <Column field="adresse_client" header="Adresse du client" sortable filter filterPlaceholder="Chercher par adresse" filterMatchMode="contains" style={{ width: '250px' }} editor={(options) => textEditor(options)} />
                                        <Column field="telephone_client" header="Téléphone du client" sortable filter filterPlaceholder="Chercher par téléphone" filterMatchMode="contains" style={{ width: '250px' }} editor={(options) => textEditor(options)} />
                                        <Column field="email_client" header="Email du client" sortable filter filterPlaceholder="Chercher par email" filterMatchMode="contains" style={{ width: '250px' }} editor={(options) => textEditor(options)} />
                                        <Column field="numCompteClient" header="Numéro de compte" sortable filter filterPlaceholder="Chercher par numéro de compte" filterMatchMode="contains" style={{ width: '250px' }} editor={(options) => textEditor(options)} />
                                        <Column field="num_compte_banque" header="N° de compte de banque" sortable filter filterPlaceholder="Chercher par numéro de compte de banque" filterMatchMode="contains" style={{ width: '250px' }} editor={(options) => textEditor(options)} />
                                        <Column field="description" header="Description du client" sortable filter filterPlaceholder="Chercher par description" filterMatchMode="contains" style={{ width: '250px' }} editor={(options) => textEditor(options)} />
                                        <Column className="editButton" rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} data-pr-tooltip="Modifier" data-pr-position="top"></Column>

                                    </DataTable>
                                </Dialog>
                                <div class="facture-section">
                                    <div class="section-three no-hover">
                                        <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                            <span className="p-inputgroup-addon">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <span className="p-float-label">
                                                <InputText id="name" type="text" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
                                                <label htmlFor="prenom_client">Nom du client*</label>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="section-three no-hover">
                                        <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                            <span className="p-inputgroup-addon">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <span className="p-float-label">
                                                <InputText id="prenom_client" type="text" value={client.firstname} onChange={(e) => setClient({ ...client, firstname: e.target.value })} />
                                                <label htmlFor="adresse_client">Prénom du client*</label>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="section-three no-hover">
                                        <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                            <span className="p-inputgroup-addon">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <span className="p-float-label">
                                                <InputText id="adresse_client" type="text" value={client.adresse_client} onChange={(e) => setClient({ ...client, adresse_client: e.target.value })} />
                                                <label htmlFor="tel_client">Adresse du client*</label>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="facture-section">
                                        <div class="section-three no-hover">
                                            <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                                <span className="p-inputgroup-addon">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </span>
                                                <span className="p-float-label">
                                                    <InputText id="tel_client" type="text" value={client.telephone_client} onChange={(e) => setClient({ ...client, telephone_client: e.target.value })} />
                                                    <label htmlFor="N° de téléphone du client">Téléphone du client*</label>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="section-three no-hover">
                                            <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                                <span className="p-inputgroup-addon">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </span>
                                                <span className="p-float-label">
                                                    <InputText id="email_client" type="text" value={client.email_client} onChange={(e) => setClient({ ...client, email_client: e.target.value })} />
                                                    <label htmlFor="Email du client">Email du client*</label>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="section-three no-hover">
                                            <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                                <span className="p-inputgroup-addon">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </span>
                                                <span className="p-float-label">
                                                    <InputText id="numCompteClient" type="text" value={compteClient.numCompteClient} onChange={(e) => setCompteClient({ ...compteClient, numCompteClient: e.target.value })} />
                                                    <label htmlFor="Email du client">N° du compte client*</label>
                                                </span>
                                            </div>
                                        </div>                                        <div class="section-three no-hover">
                                            <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                                <span className="p-inputgroup-addon">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </span>
                                                <span className="p-float-label">
                                                    <InputText id="banque" type="text" value={compteClient.num_compte_banque} onChange={(e) => setCompteClient({ ...compteClient, num_compte_banque: e.target.value })} />
                                                    <label htmlFor="banque">N° de compte de banque du client*</label>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="section-three no-hover">
                                            <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                                <span className="p-inputgroup-addon">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </span>
                                                <span className="p-float-label">
                                                    <InputText id="description" type="text" value={client.description} onChange={(e) => setClient({ ...client, description: e.target.value })} />
                                                    <label htmlFor="description">Description</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Dialog>

                        </div>
                        {result && checkClient(result.customerName) !== true && !client.client ?
                            <p className="p-error" style={{ textAlign: "center" }}>Le client n'existe pas. Veuillez le créer avant de continuer</p>
                            : null}
                    </div>

                </div>
            </div>
            <div class="facture-section" style={{ marginBottom: "1em" }}>
                <h3 class="style-section-title" style={{ marginTop: "1em" }}>Extraits de compte et TVA</h3>
                <div class="facture-section">
                    <div class="section-three no-hover">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i class="fa-solid fa-file-invoice"></i>
                            </span>
                            <span className="p-float-label">
                                <Dropdown id="extrait" value={extrait.extrait} options={extraitList} onChange={(e) => setExtrait({ ...extrait, extrait: e.value })} placeholder="Choisir un extrait" tooltip="Ce champs n'est pas obligatoire. Si vous décidez de ne pas le remplir, la facture sera indiquée comme non payée" tooltipOptions={{ position: 'top' }} filter showClear />
                                <label htmlFor="inputgroup">Extrait de la facture</label>
                            </span>
                            <Button onClick={(e) => onClick('displayExtrait', 'center', e)} icon="pi pi-plus" className="p-button-success" />
                            <Dialog header="Ajouter un extrait" visible={displayExtrait} style={{ width: '50vw' }} footer={renderFooter} onHide={() => onHide('displayExtrait')} className="extraitDialog">
                                <Toast ref={toastAddon} />
                                <Button onClick={(e) => onClick('displayExtraitList', 'center', e)} className="p-button-info" badge={extraitList.length} tooltip="Liste des extraits" tooltipOptions={{ position: 'right' }}>
                                    Liste des extraits
                                </Button>
                                <Dialog header="Liste des extraits" visible={displayExtraitList} style={{ width: '50vw' }} footer={renderFooter} onHide={() => onHide('displayExtraitList')} className="extraitListDialog">
                                    <DataTable value={extraitList} paginator rows={10} rowsPerPageOptions={[5, 10, 20]} responsive editMode="row" onRowEditComplete={onRowEditComplete}>
                                        <Column field="label" header="N° de l'extrait" editor={(options) => textEditor(options)} />
                                        <Column field="date" header="Date de l'extrait" editor={(options) => textEditor(options)} />
                                        <Column field="montant" header="Montant de l'extrait" editor={(options) => textEditor(options)} />
                                        <Column className="editButton" rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} data-pr-tooltip="Modifier" data-pr-position="top"></Column>

                                    </DataTable>
                                </Dialog>
                                <div class="section-three no-hover">

                                    <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                        <span className="p-inputgroup-addon">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </span>
                                        <span className="p-float-label">
                                            <InputText id="num_extrait" type="text" value={extrait.num_extrait} onChange={(e) => setExtrait({ ...extrait, num_extrait: e.target.value })} />
                                            <label htmlFor="extrait">N° de l'extrait</label>
                                        </span>
                                    </div>
                                </div>
                                <div class="section-three no-hover">
                                    <div className="p-inputgroup" style={{ marginTop: '2em', width: '97%', marginLeft: '1.5%' }}>
                                        <span className="p-inputgroup-addon">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </span>
                                        <span className="p-float-label">
                                            <Calendar id="date_extrait" type="text" value={extrait.date_extrait} onChange={(e) => setExtrait({ ...extrait, date_extrait: e.target.value })} dateFormat="dd/mm/yy" />
                                            <label htmlFor="date_extrait">Date d'extrait</label>
                                        </span>
                                    </div>
                                </div>
                                <div class="section-three no-hover">
                                    <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                        <span className="p-inputgroup-addon">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </span>
                                        <span className="p-float-label">
                                            <InputText id="montant_extrait" type="text" value={extrait.montant} onChange={(e) => setExtrait({ ...extrait, montant: e.target.value })} />
                                            <label htmlFor="montant_extrait">Montant d'extrait</label>
                                        </span>
                                    </div>
                                </div>
                            </Dialog>
                        </div>
                    </div>
                    <div class="section-three no-hover">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i class="fa-solid fa-file-invoice"></i>
                            </span>
                            {result && result.taxes && result.taxes.length > 0 ?
                                <span className="p-float-label">
                                    <InputText id="tva" type="text" value={result.taxes[0].rate} onChange={(e) => setResult({ ...result, taxes: [{ rate: e.target.value }] })} tooltip={`tvas existantes : ` + tvaList.map((tva) => tva.label + '%')} tooltipOptions={{ position: 'top' }} />
                                    {/* Si on clique sur le bouton, on affiche le dropdown */}

                                </span>
                                :
                                <span className="p-float-label">
                                    <Dropdown id="tva" value={factures.tva} options={tvaList} onChange={(e) => setFactures({ ...factures, tva: e.value })} placeholder="Select a tva" filter showClear />
                                    <label htmlFor="inputgroup">TVA</label>

                                </span>


                            }



                            <Button onClick={(e) => onClick('displayTva', 'center', e)} icon="pi pi-plus" className="p-button-success" />
                            <Dialog header="Ajouter une TVA" visible={displayTva} footer={renderFooter} onHide={() => onHide('displayTva')} className="tvaDialog">
                                <Toast ref={toastAddon} />

                                <Button onClick={(e) => onClick('displayTvaList', 'center', e)} className="p-button-info" badge={tvaList.length} tooltip="Liste des TVA's" tooltipOptions={{ position: 'right' }}>
                                    Liste des TVA
                                </Button>
                                <Dialog header="Liste des TVA" visible={displayTvaList}  footer={renderFooter} onHide={() => onHide('displayTvaList')} className="tvaDialog">
                                    <DataTable value={tvaList} paginator rows={10} rowsPerPageOptions={[5, 10, 20]} responsive filter editMode="row" onRowEditComplete={onRowEditComplete}>
                                        <Column field="label" header="Valeur de la TVA" sortable editor={(options) => textEditor(options)} />
                                        <Column field="tva_description" header="Description " sortable editor={(options) => textEditor(options)} />
                                        <Column className="editButton" rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} data-pr-tooltip="Modifier" data-pr-position="top"></Column>


                                    </DataTable>
                                </Dialog>
                                <div class="section-three no-hover">
                                    <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                        <span className="p-inputgroup-addon">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </span>
                                        <span className="p-float-label">
                                            <InputText id="num_tva" type="text" value={tva.tva_value} onChange={(e) => setTva({ ...tva, tva_value: e.target.value })} />
                                            <label htmlFor="inputgroup">Montant de la TVA</label>
                                        </span>
                                    </div>
                                </div>
                                <div class="section-three no-hover">
                                    <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                        <span className="p-inputgroup-addon">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </span>
                                        <span className="p-float-label">
                                            <InputText id="description" type="text" value={tva.tva_description} onChange={(e) => setTva({ ...tva, tva_description: e.target.value })} />
                                            <label htmlFor="inputgroup">Description de la TVA</label>
                                        </span>
                                    </div>
                                </div>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>

            {/* radio button   */}

            {/* checked button  */}
            <p>Les champs ayant (*) sont obligatoires</p>
            <div className="p-field-radiobutton">
                Êtes-vous sûr de vouloir ajouter cette facture ?  (Toutes les informations doivent être correctes) :

                <Checkbox inputId="cb1" value="Yes" onChange={(e) => setChecked1(e.checked)} checked={checked1} style={{ marginLeft: "1em" }} />

            </div>

            <div style={{ marginTop: "1em" }}>

                <Button onClick={saveFacture} name="addFacture" disabled={checked1 ? false : true} style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto", width: "50%" }} className="p-button-success">Ajouter la facture</Button>
            </div>
        </div>
    );
};
export default AddFacturier;


