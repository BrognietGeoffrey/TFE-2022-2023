
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import './Facturiers.css';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Dialog } from 'primereact/dialog';
import {Tooltip} from 'primereact/tooltip';

import {Card} from 'primereact/card';
import {TabView, TabPanel} from 'primereact/tabview';
import FacturierDataService from "../../services/facturierService";
import FactureDataService from "../../services/factureService";
import ExtraitDataService from "../../services/extraitService";
import LogsDataService from "../../services/logsService";
import {Toast} from 'primereact/toast';

const FacturierDatatable = () => {

    const [loading, setLoading] = useState(true)
    const [facturiers, setFacturiers] = useState([]);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [customers, setCustomers] = useState(null);
    const [extraitList, setExtraitList] = useState([]);
    const [displayExtraitList, setDisplayExtraitList] = useState(false);
    const [extrait, setExtrait] = useState({ facture: {} });
    const status = [
        { label: 'payée', value: true },
        { label: 'non payée', value: false }
    ];
    const toast = useRef(null);
    const toastAddon = useRef(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        setUser(currentUser);
        getExtraitList();
    }, []);

    const [position, setPosition] = useState('center');


    const [displayExtrait, setDisplayExtrait] = useState(false);


    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const statuses = ['payée', 'non payée '];

    const dialogFuncMap = {
        'displayExtrait': setDisplayExtrait,
        'displayExtraitList': setDisplayExtraitList,
    };

    const onClick = (name, position, e, rowData) => {
        e.preventDefault();
      
        if (name === 'displayExtrait') {
          setExtrait(rowData);
        }
      
        dialogFuncMap[name](true);
      
        if (position) {
          setPosition(position);
        }
      };

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    };

    const renderFooter = (name) => {
        if (name.className === 'extraitDialog') {
            return (
                <div>
                    <Button label="Ajouter" icon="pi pi-check" onClick={changeStatus} onHide={onHide} />
                </div>
            );
        }
    };
    const getExtraitList = async () => {
        const extraitList = await ExtraitDataService.getAll();
        setExtraitList(extraitList.data.map(extrait => {
            return {
                num_extrait: extrait.num_extrait,
                value: extrait.extrait_id, 
                montant : extrait.montant,
                date : extrait.date_extrait
            };
        }));
    };

    const saveExtrait = (rowData) => {
        console.log(extrait.facture.facture_id)
        console.log(extrait)
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
                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Extrait Added', life: 3000 });
                getExtraitList();
                let extraitId = response.data.extrait_id
                console.log(extraitId);
                const logData = {
                    extrait_id : response.data.extrait_id,
                    description : "Ajout d'un extrait",
                    // user_id : user.id
                }
                LogsDataService.create(logData)
                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Log Added', life: 3000 });
                // ajouter l'extrait de l'id extraitId au facturier
                // ajouter le log
                var data = {
                    extrait_id: extraitId,
                }
                FacturierDataService.update(extrait.facturier_id, data)
                .then(response => {
                    toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Facturier Updated', life: 3000 });
                })
                // mettre à jour le estpaye de la facture
                var data = {
                    estpaye: true,
                }
                FactureDataService.update(extrait.facture.facture_id, data)
                .then(response => {
                    toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Facture Updated', life: 3000 });
                })
                // Recharger les données du tableau
                fetchData();
            })
            .catch(e => {
                console.log(e);
            });
    };



    const changeStatus = (rowData) => {
        saveExtrait();
        // on récupére l'id de l'extrait qui vient de saveExtrait
       
        
    }


    const fetchData = async () => {
        const response = await FacturierDataService.getAll();
        setFacturiers(response.data);
        setLoading(false);
      };
    
      useEffect(() => {
        fetchData();
      }, []);
    
    const formatDate = (value) => {
   
        let date = new Date(value);
        return date.toLocaleDateString()
    }

    const formatCurrency = (value) => {
        return value
        // return value.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR' });
    }

    const numfactureBodyTemplate = (rowData) => {
        return "23/" + rowData.facture.num_facture;

    }
    const numfactureLamyBodyTemplate = (rowData) => {
        console.log(rowData.facture.num_facture_lamy)
        if (rowData.facture.num_facture_lamy === null) {
            return 'Pas de numéro';
        }
        return rowData.facture.num_facture_lamy;

    }
    const numdecompteBodyTemplate = (rowData) => {
        return "N°" + rowData.decompte.num_decompte;

    }

    const dateBodyFactureTemplate = (rowData) => {
        return formatDate(rowData.facture.facture_date);
    }
    const dateBodyExtraitTemplate = (rowData) => {
        if (rowData.extrait === null) {
            return 'Pas d"extrait';
        }
        
        const pathDate = rowData.extrait
        // Invert date
        const date = pathDate.date_extrait.split('-').reverse().join('/');

        return (date);
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }


    const balanceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.facture.montant);
    }

    const tvaBalanceBodyTemplate = (rowData) => {
       
        const tva = rowData.facture.tva 
        const montanttva = rowData.facture.montant + (rowData.facture.montant * tva.tva_value/100);
        
        return formatCurrency(montanttva);
    }
    const balanceFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="EUR" locale="fr-BE" />
    }
    const sortTVA = (value1, value2) => {
        const tva1 = value1.facture.tva.tva_value;
        const tva2 = value2.facture.tva.tva_value;
        return tva1.localeCompare(tva2);
    }


    const statusBodyTemplate = (rowData) => {
        if (loading) {
            return <ProgressBar mode="indeterminate" style={{ height: '6px' }} />
        }
        else {
        if (rowData.facture.estpaye === null) {
            return <p>Il n'y pas de statut pour cette facture</p>
        }
        else if (rowData.facture.estpaye === true) {
            return <Button label="Payée" className="p-button-success" icon="pi pi-check-circle" />;
        }
        else {
            return <Button onClick={(e) => onClick('displayExtrait', 'center', e, rowData)} icon="pi pi-ban" className="p-button-danger" label="Non payée" tooltip='En cliquant sur ce bouton, vous pourrez ajouter l"extrait correspondant à la facture. Cela mettra à jour le statut de la facture en "payée".' tooltipOptions={{ position: 'top' }} />

        }
    }
    }


        //    refer to add extrait on file addfacturier.component



   

    const tvaBodyTemplate = (rowData) => {
        const tva = rowData.facture.montant + rowData.tva.tva_value / 100;
        return formatCurrency(tva) + ' €';
    }
    
    const numextraitBodyTemplate = (rowData) => {
        if (rowData.extrait === null) {
            return 'Pas d"extrait';
        }
        else {
            return rowData.extrait.num_extrait 
        }
    }
      
    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }

    const statusItemTemplate = (option) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    }

    
    <Tooltip target=".extraitDialog" mouseTrack mouseTrackLeft={10}>
        <span>Extrait</span>
    </Tooltip>


    if (loading) {
        return <ProgressBar mode="indeterminate" style={{ height: '6px' }} />;

    }
    else {
        return (
            <div className="datatable-doc-demo">
                <Toast ref={toastAddon} />
                    <DataTable  value={facturiers} paginator className="p-datatable-customers" rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    dataKey="id" rowHover filterDisplay="menu" loading={loading}
                    emptyMessage="Aucunes données trouvées." scrollable 
                    currentPageReportTemplate=" {first} de {last} pour {totalRecords} données" responsiveLayout="scroll" style={{ borderRaduis: '20px' }}>
                    
                    <Column field="facture.num_facture_lamy" header="N° de facture Lamy" sortable filter filterPlaceholder="Rechercher par N°" body={numfactureLamyBodyTemplate} style={{ minWidth: '14rem', backgroundColor: '#f8f9fa' }}  />
                    <Column field='compte_fournisseur.fournisseur.name' header="Fournisseur" sortable filter filterPlaceholder="Rechercher par nom" style={{ minWidth: '14rem' }} />
                         
                    <Column field='compte_fournisseur.fournisseur.num_fournisseur' header="N° de fournisseur" sortable  filter filterPlaceholder='Rechercher par N°' style={{ minWidth: '14rem' }}></Column>
                    <Column field='facture.objet.title' header="Objet" sortable filter filterPlaceholder='Rechercher par objet...' style={{ minWidth: '14rem' }} ></Column>
                    <Column field="facture.facture_date" header="Date de la facture" sortable filterField="date" dataType="date"  body={dateBodyFactureTemplate} filter filterElement={dateFilterTemplate} style={{ minWidth: '14rem' }}/>
                    <Column field="facture.num_facture" header="N° de facture" sortable filter filterPlaceholder="Rechercher par N°" style={{ minWidth: '14rem' }} body={numfactureBodyTemplate}/>
                    <Column field="facture.libelle.title" header="Libellé" sortable filter filterPlaceholder="Rechercher par libellé" style={{ minWidth: '14rem' }} />
                    <Column field="decompte.num_decompte" header="N° de décompte " sortable filter filterPlaceholder="Rechercher par N°" style={{ minWidth: '14rem' }} body={numdecompteBodyTemplate}/>
                    <Column field="facture.montant" header="Montant de la facture" sortable dataType="numeric" style={{ minWidth: '8rem' }} body={balanceBodyTemplate} filter filterElement={balanceFilterTemplate} />
                    <Column header="Montant avec TVA"  sortable dataType="numeric" style={{ minWidth: '8rem' }} body={tvaBalanceBodyTemplate} filter filterElement={balanceFilterTemplate} sortField="facture.montant" />
                    
                    <Column field="facture.estpaye" header="Status" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '10rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate}/>
                    <Column field="extrait.num_extrait" header="N° extrait" sortable filter filterPlaceholder="Rechercher par N°" style={{ minWidth: '14rem' }} body={numextraitBodyTemplate}  />
                    <Column field="extrait.date_extrait" header="Date extrait" sortable filterField="date" dataType="date" style={{ minWidth: '8rem' }} body={dateBodyExtraitTemplate} filter filterElement={dateFilterTemplate} /> 
                </DataTable> 
                <Dialog header="Ajouter un extrait" visible={displayExtrait} style={{ width: '50vw' }} footer={renderFooter} onHide={() => onHide('displayExtrait')} className="extraitDialog">
                                <Button onClick={(e) => onClick('displayExtraitList', 'center', e)}  className="p-button-info" badge={extraitList.length} tooltip="Liste des extraits" tooltipOptions={{ position: 'right' }}>
                                    Liste des extraits
                                </Button>
                                    <Dialog header="Liste des extraits" visible={displayExtraitList} style={{ width: '50vw' }} footer={renderFooter} onHide={() => onHide('displayExtraitList')} className="extraitDialog">
                                        <DataTable value={extraitList} paginator rows={10} rowsPerPageOptions={[5, 10, 20]} responsive scrollable scrollHeight="200px" className="p-datatable-customers" dataKey="id" rowHover filterDisplay="menu" loading={loading} emptyMessage="Aucunes données trouvées." currentPageReportTemplate=" {first} de {last} pour {totalRecords} données" responsiveLayout="scroll" style={{ borderRaduis: '20px' }} 
                                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" search>
                                            {console.log(extraitList)}
                                            <Column field="label" header="N° de l'extrait" />
                                            <Column field="date" header="Date de l'extrait" />
                                            <Column field="montant" header="Montant de l'extrait" />
                                        </DataTable>
                                    </Dialog>
                                <div class="section-three">

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
                                <div class="section-three">
                                    <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                        <span className="p-inputgroup-addon">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </span>
                                        <span className="p-float-label">
                                            <Calendar id="date_extrait" type="text" value={extrait.date_extrait} onChange={(e) => setExtrait({ ...extrait, date_extrait: e.target.value })} />
                                            <label htmlFor="date_extrait">Date d'extrait</label>
                                        </span>
                                    </div>
                                </div>     
                                <div class="section-three">
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
                <Dialog
                    header={`Facture n° ${extrait.facture.num_facture}`}
                    visible={displayExtrait}
                    style={{ width: '50vw' }}
                    onHide={() => onHide('displayExtrait')}
                    footer={renderFooter}
                    className='extraitDialog'
                    tooltipOptions={{ position: 'right' }}
                    tooltip='Liste des extraits'

                    >
                    
                                <Button onClick={(e) => onClick('displayExtraitList', 'center', e)}  className="p-button-info" badge={extraitList.length} tooltip="Liste des extraits" tooltipOptions={{ position: 'right' }}>
                                    Liste des extraits
                                </Button>
                                    <Dialog header="Liste des extraits" visible={displayExtraitList} style={{ width: '50vw' }} footer={renderFooter} onHide={() => onHide('displayExtraitList')} className="extraitDialog">
                                        <DataTable value={extraitList} paginator rows={10} rowsPerPageOptions={[5, 10, 20]} responsive>
                                            <Column field="num_extrait" header="N° de l'extrait" />
                                            <Column field="date" header="Date de l'extrait" />
                                            <Column field="montant" header="Montant de l'extrait" />
                                        </DataTable>
                                    </Dialog>
                                <div class="section-three">
                                    {/* radio button pour indiquer si la facture est payé ou pas */}
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
                                <div class="section-three">
                                    <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                        <span className="p-inputgroup-addon">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </span>
                                        <span className="p-float-label">
                                            <Calendar id="date_extrait" type="text" value={extrait.date_extrait} onChange={(e) => setExtrait({ ...extrait, date_extrait: e.target.value })} />
                                            <label htmlFor="date_extrait">Date d'extrait</label>
                                        </span>
                                    </div>
                                </div>
                                <div class="section-three">
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
        )
    }
}
    export default FacturierDatatable





    

